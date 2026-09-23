import React, { useState } from 'react';
import { MagicProduct } from '../types/product';

interface PackagingPouchProps {
  product: MagicProduct;
  isCenter: boolean;
  isHovered: boolean;
}

export const PackagingPouch: React.FC<PackagingPouchProps> = ({
  product,
  isCenter,
  isHovered,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`relative w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] select-none transition-all duration-500 ease-out ${
        isCenter ? 'cursor-pointer' : 'pointer-events-none'
      }`}
    >
      {/* REALISTIC CONTACT DROP SHADOW UNDER THE ISOLATED STAND-UP POUCH */}
      <div
        className="absolute -bottom-6 inset-x-8 h-8 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: isCenter
            ? 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.45) 0%, rgba(60, 21, 24, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.22) 0%, transparent 65%)',
          transform: isCenter && isHovered ? 'scale(1.15) translateY(4px)' : 'scale(1)',
          filter: 'blur(6px)',
        }}
      />

      {/* POUCH CONTAINER - ZERO BACKGROUND, ZERO BORDER, ZERO RECTANGULAR BOX */}
      <div
        className="relative w-full aspect-[1/1.42] transition-transform duration-500 flex items-center justify-center"
        style={{
          transform: isCenter && isHovered ? 'translateY(-6px)' : 'none',
        }}
      >
        {/* THE AUTHORITATIVE AUTHENTIC TRANSPARENT PNG PACKAGING ASSET */}
        <img
          src={product.image}
          alt={`MAGIC ${product.name} Authentic Packaging Pouch`}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-700 select-none pointer-events-none ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            filter: isCenter
              ? isHovered
                ? 'drop-shadow(0 28px 36px rgba(60, 21, 24, 0.35)) drop-shadow(0 8px 14px rgba(200, 16, 46, 0.18)) brightness(1.02)'
                : 'drop-shadow(0 18px 24px rgba(60, 21, 24, 0.25)) drop-shadow(0 4px 8px rgba(60, 21, 24, 0.12))'
              : 'drop-shadow(0 10px 14px rgba(60, 21, 24, 0.18)) brightness(0.96)',
          }}
        />

        {/* SUBTLE SPECULAR HIGHLIGHT OVER POUCH */}
        {isCenter && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.20 : 0.06,
              background:
                'linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.4) 45%, transparent 60%)',
            }}
          />
        )}
      </div>
    </div>
  );
};
