import React, { createContext, useContext, useState, useMemo } from 'react';
import { ShopProduct } from '../data/shopProducts';

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

interface ShopCartContextType {
  items: CartItem[];
  addItem: (product: ShopProduct) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  getItemQuantity: (productId: string) => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const ShopCartContext = createContext<ShopCartContextType | undefined>(undefined);

export const ShopCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addItem = (product: ShopProduct) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`Added ${product.name} to kitchen bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string): number => {
    const found = items.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  return (
    <ShopCartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        getItemQuantity,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toastMessage,
        dismissToast: () => setToastMessage(null),
      }}
    >
      {children}
    </ShopCartContext.Provider>
  );
};

export const useShopCart = (): ShopCartContextType => {
  const context = useContext(ShopCartContext);
  if (!context) {
    throw new Error('useShopCart must be used within a ShopCartProvider');
  }
  return context;
};
