import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, enTranslations, arTranslations } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'magic_uae_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English as specified
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    }
    return 'en';
  });

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  // Apply document language and direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
      if (isRTL) {
        document.documentElement.classList.add('rtl');
        document.body.classList.add('font-arabic-base');
      } else {
        document.documentElement.classList.remove('rtl');
        document.body.classList.remove('font-arabic-base');
      }
    }
  }, [language, dir, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (
    key: string,
    fallback?: string,
    params?: Record<string, string | number>
  ): string => {
    const dict = language === 'ar' ? arTranslations : enTranslations;
    let translation = dict[key];

    // If missing in Arabic dictionary, try English dictionary first
    if (!translation && language === 'ar') {
      translation = enTranslations[key];
    }

    // If still missing, use explicit fallback parameter if provided
    if (!translation && fallback) {
      translation = fallback;
    }

    // Safe fallback: never expose raw dot keys (e.g. 'nav.home', 'nav.shop') to users
    if (!translation) {
      if (key.includes('.')) {
        const lastPart = key.split('.').pop() || key;
        // Transform camelCase like 'shopAll' -> 'Shop All', 'ourImpact' -> 'Our Impact'
        translation = lastPart
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .trim();
      } else {
        translation = key;
      }
    }

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(
          new RegExp(`\\{${paramKey}\\}`, 'g'),
          String(paramValue)
        );
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        isRTL,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
