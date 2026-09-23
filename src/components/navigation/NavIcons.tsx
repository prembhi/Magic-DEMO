import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Polished custom vector icon: Indian Red Chilli / Whole Spice
 */
export const ChilliIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Chilli body */}
    <path
      d="M17.5 5.5C15 4 10.5 5 8 8C5.5 11 5 15.5 6 18C6.5 19.5 7.5 20.5 8.5 20.5C9.5 20.5 9 19 9.5 17C10.5 13 14 10 17 8.5C18.5 7.8 19 6.5 17.5 5.5Z"
      fill="#C8102E"
    />
    <path
      d="M16 6.5C13.5 5.5 10 7 8.5 9.5C7.2 11.8 7 14.8 7.5 16.5C7.3 15 7.6 12.8 8.8 10.8C10.2 8.8 13.2 7.4 15.5 6.8L16 6.5Z"
      fill="#E8922F"
      opacity="0.85"
    />
    {/* Stem & Calyx */}
    <path
      d="M17 5.5C17.5 4 18.5 3 20 2.5C20.5 2.3 20.8 2.8 20.5 3.2C19.5 4.5 18.8 5.2 18 5.8"
      stroke="#5A7247"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M16 5.5C16.8 5.8 17.8 6 18.5 6.8C19 6.2 18.5 5.2 17.8 4.8C17 4.5 16.2 5 16 5.5Z"
      fill="#5A7247"
    />
  </svg>
);

/**
 * Polished custom vector icon: Curated Kitchen Bundle / Gift Box
 */
export const BundleBoxIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Box body */}
    <rect x="3.5" y="8" width="17" height="12.5" rx="1.5" fill="#FAF1E0" stroke="#D4A843" strokeWidth="1.5" />
    {/* Box Lid */}
    <rect x="2.5" y="5.5" width="19" height="3.5" rx="1" fill="#D4A843" />
    {/* Ribbon Vertical */}
    <rect x="10.5" y="5.5" width="3" height="15" fill="#C8102E" />
    {/* Bow on Top */}
    <path
      d="M9 4C7.5 2.5 6.5 4 8 5L11 5.5C10 4 9.5 4 9 4Z"
      fill="#C8102E"
    />
    <path
      d="M15 4C16.5 2.5 17.5 4 16 5L13 5.5C14 4 14.5 4 15 4Z"
      fill="#C8102E"
    />
    <circle cx="12" cy="5" r="1.25" fill="#FAF1E0" />
  </svg>
);

/**
 * Polished custom vector icon: Traditional Indian Cooking Handi / Pot with aromatic steam
 */
export const RecipePotIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Steam Curls */}
    <path
      d="M9 3C9 4 8.5 4.5 8.5 5.5"
      stroke="#D4A843"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 2C12 3.5 11.5 4 11.5 5.5"
      stroke="#E8922F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 3C15 4 14.5 4.5 14.5 5.5"
      stroke="#D4A843"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Pot Rim */}
    <rect x="4" y="6.5" width="16" height="2.5" rx="1.25" fill="#3C1518" />
    {/* Handi Belly */}
    <path
      d="M4.5 8.5C4.5 8.5 3 13 4 16C5 19 8 20.5 12 20.5C16 20.5 19 19 20 16C21 13 19.5 8.5 19.5 8.5H4.5Z"
      fill="#C8102E"
      stroke="#3C1518"
      strokeWidth="1.2"
    />
    {/* Brass Highlight Band */}
    <path
      d="M5 12.5C7.5 14 16.5 14 19 12.5"
      stroke="#D4A843"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Handles */}
    <path
      d="M3 10C2 10.5 2 12.5 3 13"
      stroke="#3C1518"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 10C22 10.5 22 12.5 21 13"
      stroke="#3C1518"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Polished custom vector icon: Agricultural Seedling / Botanical Sprout (Impact)
 */
export const ImpactSproutIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soil Mound */}
    <path
      d="M4 19.5C6 18 10 17.5 12 17.5C14 17.5 18 18 20 19.5"
      stroke="#6B4226"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    {/* Main Stem */}
    <path
      d="M12 18V8.5"
      stroke="#5A7247"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    {/* Left Leaf */}
    <path
      d="M12 12.5C9.5 12.5 7.5 10.5 7.5 7.5C10 7.5 12 9.5 12 12.5Z"
      fill="#5A7247"
    />
    {/* Right Leaf (Sprout Tip) */}
    <path
      d="M12 9.5C14.5 9.5 16.5 7.5 16.5 4.5C14 4.5 12 6.5 12 9.5Z"
      fill="#D4A843"
    />
  </svg>
);

/**
 * Polished custom vector icon: Kitchen Letter / Envelope (Newsletter)
 */
export const NewsletterLetterIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Envelope Body */}
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" fill="#FAF1E0" stroke="#3C1518" strokeWidth="1.3" />
    {/* Flap lines */}
    <path
      d="M3.5 6.5L11.2 12.3C11.7 12.7 12.3 12.7 12.8 12.3L20.5 6.5"
      stroke="#3C1518"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Wax Spice Seal in center */}
    <circle cx="12" cy="13" r="2.5" fill="#C8102E" />
    <circle cx="12" cy="13" r="1.2" fill="#D4A843" />
  </svg>
);

/**
 * Polished custom vector icon: Golden Lentil / Pulse Grain
 */
export const GrainIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="8" cy="14" rx="4" ry="5.5" transform="rotate(-25 8 14)" fill="#E8922F" />
    <ellipse cx="14.5" cy="9.5" rx="3.5" ry="5" transform="rotate(35 14.5 9.5)" fill="#D4A843" />
    <ellipse cx="16" cy="16" rx="3" ry="4" transform="rotate(-10 16 16)" fill="#F5C342" />
  </svg>
);
