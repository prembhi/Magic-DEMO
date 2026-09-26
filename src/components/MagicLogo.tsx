import React from 'react';
import { MAGIC_ASSETS } from '../constants/assets';

interface MagicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withRegistered?: boolean;
  variant?: 'default' | 'white';
}

export const MagicLogo: React.FC<MagicLogoProps> = ({
  className = '',
  size = 'md',
  withRegistered = true,
  variant = 'default',
}) => {
  // Height presets for responsive viewports
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-18',
  }[size];

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src={MAGIC_ASSETS.logo}
        alt="MAGIC Official Logo"
        className={`${heightClass} w-auto object-contain select-none`}
      />
      {withRegistered && (
        <span
          className={`text-[10px] font-bold ml-0.5 -mt-3.5 select-none font-serif ${
            variant === 'white' ? 'text-[#FDF6EC]/85' : 'text-[#3C1518]/70'
          }`}
          aria-hidden="true"
        >
          ®
        </span>
      )}
    </div>
  );
};
