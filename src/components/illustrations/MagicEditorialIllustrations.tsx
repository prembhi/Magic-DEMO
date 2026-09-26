import React from 'react';

/* ========================================================================== */
/* CANONICAL MAGIC EDITORIAL ILLUSTRATION SYSTEM                              */
/* Hand-drawn Indian culinary & agricultural motifs                           */
/* Palette: Magic Red #C8102E, Deep Maroon #3C1518, Spice Gold #D4A843,      */
/* Saffron #E8922F, Coriander #5A7247, Cumin Brown #6B4226, Warm Ivory #FDF6EC*/
/* Outlines: #3C1518 / #6B4226 (1.5–2.5px), Flat color blocking + gouache    */
/* ========================================================================== */

interface IllustrationProps {
  className?: string;
  size?: number | string;
}

/** 01. Single Red Kashmiri Chilli with Curved Green Calyx */
export const EditorialChilli: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stem & Calyx */}
    <path
      d="M32 18 C28 8, 38 2, 46 4 C48 10, 42 16, 44 24"
      stroke="#5A7247"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M38 22 C42 16, 52 18, 56 24 C52 28, 44 30, 38 22 Z"
      fill="#5A7247"
      stroke="#3C1518"
      strokeWidth="1.5"
    />
    <path
      d="M30 25 C34 20, 40 22, 42 28 C36 30, 32 29, 30 25 Z"
      fill="#4A6338"
    />

    {/* Main Chilli Body */}
    <path
      d="M40 26 C52 38, 76 68, 82 92 C86 108, 78 122, 64 130 C58 133, 52 131, 50 125 C46 112, 54 94, 48 76 C42 60, 32 44, 38 26 Z"
      fill="#C8102E"
      stroke="#3C1518"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Gouache Texture Highlights */}
    <path
      d="M44 38 C52 50, 68 76, 72 96 C74 106, 70 114, 62 120"
      stroke="#E84A5F"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M40 48 C44 58, 52 74, 54 88"
      stroke="#FAF5EE"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    <circle cx="53" cy="126" r="2" fill="#8B1424" />
  </svg>
);

/** 02. Golden Turmeric Root (Salem Haldi Rhizome) */
export const EditorialTurmericRoot: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Main Rhizome Body */}
    <path
      d="M18 55 C15 42, 28 28, 48 26 C68 24, 95 32, 115 42 C128 48, 132 62, 122 72 C110 82, 85 84, 58 78 C35 74, 20 68, 18 55 Z"
      fill="#E8922F"
      stroke="#3C1518"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Secondary Knobby Branch */}
    <path
      d="M52 26 C50 14, 62 8, 74 10 C84 12, 88 20, 84 30"
      fill="#D4A843"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Small Lower Nodule */}
    <path
      d="M78 78 C80 88, 92 92, 98 86 C102 82, 104 76, 102 70"
      fill="#E8922F"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Growth Rings & Gouache Highlights */}
    <path d="M35 34 C38 48, 38 62, 34 70" stroke="#3C1518" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M56 32 C60 48, 60 62, 55 74" stroke="#3C1518" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M80 38 C84 50, 84 64, 78 74" stroke="#3C1518" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M102 46 C105 56, 104 64, 100 70" stroke="#3C1518" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    
    {/* Bright Golden Core Highlight */}
    <path d="M42 42 C60 38, 90 44, 105 52" stroke="#FAF5EE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="28" cy="45" r="3" fill="#D4A843" />
  </svg>
);

/** 03. Whole Star Anise (8-Pointed Pod) */
export const EditorialStarAnise: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M-5 -8 C-7 -22, -2 -38, 0 -42 C2 -38, 7 -22, 5 -8 Z"
            fill="#6B4226"
            stroke="#3C1518"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <ellipse cx="0" cy="-26" rx="2.5" ry="4" fill="#D4A843" stroke="#3C1518" strokeWidth="0.8" />
        </g>
      ))}
      <circle cx="0" cy="0" r="7" fill="#4E2E1A" stroke="#3C1518" strokeWidth="1.5" />
    </g>
  </svg>
);

/** 04. Leafy Fresh Coriander Sprig */
export const EditorialCorianderSprig: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Main Curving Stem */}
    <path
      d="M60 145 C60 110, 62 70, 60 15"
      stroke="#5A7247"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* Top Cluster Leaf */}
    <g transform="translate(60,20)">
      <path
        d="M0 0 C-12 -8, -16 -20, 0 -22 C16 -20, 12 -8, 0 0 Z"
        fill="#738F5D"
        stroke="#3C1518"
        strokeWidth="1.5"
      />
      <path d="M-6 -10 C-10 -15, -4 -18, 0 -15 C4 -18, 10 -15, 6 -10" stroke="#3C1518" strokeWidth="1" fill="none" />
    </g>

    {/* Left Branch & Leaf */}
    <path d="M60 65 C48 55, 30 52, 18 56" stroke="#5A7247" strokeWidth="2" strokeLinecap="round" />
    <g transform="translate(18,56) rotate(-35)">
      <path
        d="M0 0 C-10 -6, -14 -16, 0 -18 C14 -16, 10 -6, 0 0 Z"
        fill="#738F5D"
        stroke="#3C1518"
        strokeWidth="1.5"
      />
      <path d="M-5 -8 C-8 -12, -3 -15, 0 -12 C3 -15, 8 -12, 5 -8" stroke="#3C1518" strokeWidth="1" fill="none" />
    </g>

    {/* Right Branch & Leaf */}
    <path d="M60 95 C75 85, 92 85, 104 90" stroke="#5A7247" strokeWidth="2" strokeLinecap="round" />
    <g transform="translate(104,90) rotate(35)">
      <path
        d="M0 0 C-10 -6, -14 -16, 0 -18 C14 -16, 10 -6, 0 0 Z"
        fill="#738F5D"
        stroke="#3C1518"
        strokeWidth="1.5"
      />
      <path d="M-5 -8 C-8 -12, -3 -15, 0 -12 C3 -15, 8 -12, 5 -8" stroke="#3C1518" strokeWidth="1" fill="none" />
    </g>
  </svg>
);

/** 05. Brass Spice Bowl (Katori) with Cumin & Mustard Seeds */
export const EditorialBrassBowl: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Brass Rim & Base */}
    <ellipse cx="80" cy="45" rx="65" ry="24" fill="#E5BD5D" stroke="#3C1518" strokeWidth="2" />
    <path
      d="M15 45 C15 72, 45 92, 80 92 C115 92, 145 72, 145 45"
      fill="#D4A843"
      stroke="#3C1518"
      strokeWidth="2"
    />
    <path
      d="M30 82 C50 92, 110 92, 130 82"
      stroke="#B88A28"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Spice Heap inside Bowl */}
    <ellipse cx="80" cy="42" rx="52" ry="17" fill="#D4A843" />
    <path
      d="M45 42 C60 30, 100 30, 115 42 C105 48, 55 48, 45 42 Z"
      fill="#C8102E"
      opacity="0.85"
    />

    {/* Scattered Cumin Seeds */}
    <path d="M35 32 C38 30, 42 32, 44 36 C42 38, 38 36, 35 32 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="0.8" />
    <path d="M125 34 C128 32, 132 35, 134 39 C131 40, 127 38, 125 34 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="0.8" />
    <path d="M72 26 C75 24, 80 26, 82 29 C79 31, 74 29, 72 26 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="0.8" />
    <circle cx="28" cy="48" r="2.2" fill="#3C1518" />
    <circle cx="132" cy="50" r="2" fill="#3C1518" />
    <circle cx="80" cy="22" r="2" fill="#3C1518" />
    <circle cx="95" cy="28" r="1.8" fill="#C8102E" />
  </svg>
);

/** 06. Brass Tadka Spoon */
export const EditorialTadkaSpoon: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Long Brass Handle */}
    <path
      d="M150 40 L55 40"
      stroke="#D4A843"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M150 40 L55 40"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Handle Grip Notch */}
    <circle cx="145" cy="40" r="3.5" fill="#FAF5EE" stroke="#3C1518" strokeWidth="1.2" />

    {/* Small Deep Tadka Cup Bowl */}
    <ellipse cx="38" cy="40" rx="26" ry="18" fill="#E5BD5D" stroke="#3C1518" strokeWidth="2" />
    {/* Inner tempered spices */}
    <ellipse cx="38" cy="40" rx="18" ry="11" fill="#C8102E" opacity="0.9" />
    <circle cx="34" cy="38" r="1.8" fill="#3C1518" />
    <circle cx="42" cy="42" r="1.5" fill="#3C1518" />
    <path d="M38 34 C40 32, 43 34, 43 37" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** 07. Carved Wooden Spice Spoon */
export const EditorialWoodenSpoon: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Wooden Handle */}
    <path
      d="M130 35 C100 34, 70 33, 45 35"
      stroke="#8C5832"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M130 35 C100 34, 70 33, 45 35"
      stroke="#3C1518"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Spoon Oval Head */}
    <ellipse cx="28" cy="35" rx="20" ry="14" fill="#A86C3E" stroke="#3C1518" strokeWidth="2" />
    <ellipse cx="26" cy="35" rx="13" ry="8" fill="#C98A53" />
  </svg>
);

/** 08. Small Glass Pantry Jar with Brass Lid */
export const EditorialPantryJar: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Brass Lid */}
    <rect x="25" y="12" width="50" height="12" rx="4" fill="#D4A843" stroke="#3C1518" strokeWidth="2" />
    <line x1="28" y1="18" x2="72" y2="18" stroke="#3C1518" strokeWidth="1.2" />

    {/* Glass Neck & Jar Body */}
    <path
      d="M30 24 L20 38 C18 42, 16 50, 16 65 L16 105 C16 116, 24 122, 35 122 L65 122 C76 122, 84 116, 84 105 L84 65 C84 50, 82 42, 80 38 L70 24 Z"
      fill="#FAF5EE"
      stroke="#3C1518"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Golden Ground Haldi Layer Inside */}
    <path
      d="M18 75 C18 75, 35 72, 50 75 C65 78, 82 75, 82 75 L82 105 C82 114, 75 120, 65 120 L35 120 C25 120, 18 114, 18 105 Z"
      fill="#E8922F"
      stroke="#3C1518"
      strokeWidth="1.5"
    />
    <path d="M25 85 C40 82, 60 88, 75 84" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    {/* Glass Reflection Highlight */}
    <path d="M24 45 L24 68" stroke="#FAF5EE" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** 09. Heirloom Grain Stalk (Wheat / Dal Pods) */
export const EditorialGrainStalk: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central Stem */}
    <path d="M50 155 C50 120, 48 60, 50 10" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" />

    {/* Grain Heads radiating in pairs */}
    {[25, 45, 65, 85, 105].map((y, i) => (
      <g key={i}>
        {/* Left grain */}
        <g transform={`translate(48, ${y}) rotate(-30)`}>
          <ellipse cx="-12" cy="0" rx="10" ry="5" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.4" />
          <line x1="-22" y1="0" x2="-32" y2="-6" stroke="#3C1518" strokeWidth="1" strokeLinecap="round" />
        </g>
        {/* Right grain */}
        <g transform={`translate(52, ${y - 8}) rotate(30)`}>
          <ellipse cx="12" cy="0" rx="10" ry="5" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.4" />
          <line x1="22" y1="0" x2="32" y2="-6" stroke="#3C1518" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>
    ))}
    {/* Top terminal grain */}
    <ellipse cx="50" cy="12" rx="5" ry="9" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.4" />
    <line x1="50" y1="3" x2="50" y2="-8" stroke="#3C1518" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/** 10. Tiny Woven Harvest Basket */
export const EditorialHarvestBasket: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Basket Rim */}
    <ellipse cx="70" cy="35" rx="55" ry="18" fill="#E5BD5D" stroke="#3C1518" strokeWidth="2" />
    {/* Woven Basket Base */}
    <path
      d="M15 35 C20 70, 40 88, 70 88 C100 88, 120 70, 125 35"
      fill="#D4A843"
      stroke="#3C1518"
      strokeWidth="2"
    />
    {/* Woven Cross-hatch Texture */}
    <path d="M35 48 C45 78, 95 78, 105 48" stroke="#B88A28" strokeWidth="2" fill="none" />
    <path d="M45 40 L95 82" stroke="#3C1518" strokeWidth="1.2" opacity="0.4" />
    <path d="M95 40 L45 82" stroke="#3C1518" strokeWidth="1.2" opacity="0.4" />

    {/* Harvest Pile: Red chillies & Turmeric inside */}
    <ellipse cx="70" cy="32" rx="42" ry="12" fill="#C8102E" />
    <circle cx="55" cy="28" r="6" fill="#E8922F" stroke="#3C1518" strokeWidth="1" />
    <circle cx="85" cy="28" r="5" fill="#D4A843" stroke="#3C1518" strokeWidth="1" />
  </svg>
);

/** 11. Traditional Stone Mortar & Pestle (Sil Batta / Kharal) */
export const EditorialMortarPestle: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stone Pestle resting at an angle */}
    <g transform="translate(75, 45) rotate(28)">
      <rect x="-10" y="-45" width="20" height="60" rx="9" fill="#7A685D" stroke="#3C1518" strokeWidth="2" />
      <path d="M-6 -38 L-6 5" stroke="#FAF5EE" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
    </g>

    {/* Stone Mortar Rim & Basin */}
    <ellipse cx="70" cy="65" rx="55" ry="22" fill="#8C786D" stroke="#3C1518" strokeWidth="2" />
    <path
      d="M15 65 C15 95, 40 112, 70 112 C100 112, 125 95, 125 65"
      fill="#6B594E"
      stroke="#3C1518"
      strokeWidth="2"
    />
    <path d="M30 102 C50 110, 90 110, 110 102" stroke="#52433B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Crushed Spices in Basin */}
    <ellipse cx="70" cy="65" rx="40" ry="14" fill="#D4A843" />
    <circle cx="60" cy="62" r="3" fill="#C8102E" />
    <circle cx="80" cy="66" r="2.5" fill="#3C1518" />
  </svg>
);

/** 12. Traditional Brass Masala Dabba (7-Compartment Spice Box) */
export const EditorialMasalaDabba: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Circular Outer Brass Tin */}
    <circle cx="75" cy="75" r="68" fill="#E5BD5D" stroke="#3C1518" strokeWidth="2.5" />
    <circle cx="75" cy="75" r="64" fill="#D4A843" stroke="#3C1518" strokeWidth="1.5" />

    {/* Center Spice Katori */}
    <circle cx="75" cy="75" r="18" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="75" cy="75" r="14" fill="#E8922F" /> {/* Haldi */}

    {/* 6 Surrounding Katoris with distinct spice colors */}
    {/* 1. Haldi / Turmeric */}
    <circle cx="75" cy="35" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="75" cy="35" r="12.5" fill="#D4A843" />

    {/* 2. Red Chilli / Lal Mirch */}
    <circle cx="110" cy="55" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="110" cy="55" r="12.5" fill="#C8102E" />

    {/* 3. Cumin / Jeera */}
    <circle cx="110" cy="95" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="110" cy="95" r="12.5" fill="#6B4226" />

    {/* 4. Mustard Seeds / Rai */}
    <circle cx="75" cy="115" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="75" cy="115" r="12.5" fill="#3C1518" />

    {/* 5. Coriander / Dhaniya */}
    <circle cx="40" cy="95" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="40" cy="95" r="12.5" fill="#738F5D" />

    {/* 6. Whole Garam Masala / Cloves */}
    <circle cx="40" cy="55" r="16" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
    <circle cx="40" cy="55" r="12.5" fill="#52392B" />
  </svg>
);

/** 13. Minimal Farmer's Hand with Harvest / Spice Dish */
export const EditorialFarmerHandPantry: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Small Brass Spice Dish at bottom */}
    <ellipse cx="80" cy="100" rx="50" ry="18" fill="#E5BD5D" stroke="#3C1518" strokeWidth="2" />
    <path
      d="M30 100 C30 120, 52 130, 80 130 C108 130, 130 120, 130 100"
      fill="#D4A843"
      stroke="#3C1518"
      strokeWidth="2"
    />
    <ellipse cx="80" cy="98" rx="38" ry="12" fill="#D4A843" />
    <circle cx="72" cy="96" r="2.5" fill="#3C1518" />
    <circle cx="88" cy="98" r="2" fill="#6B4226" />

    {/* Gentle Hand Sprinkling Pure Haldi / Seeds from Above */}
    {/* Arm / Wrist */}
    <path
      d="M80 10 C82 25, 88 40, 94 52"
      stroke="#C98A53"
      strokeWidth="14"
      strokeLinecap="round"
    />
    <path
      d="M80 10 C82 25, 88 40, 94 52"
      stroke="#3C1518"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />

    {/* Fingers & Thumb gently pinching */}
    <path
      d="M94 52 C98 58, 92 68, 85 70 C78 72, 74 65, 78 58 C80 54, 86 50, 94 52 Z"
      fill="#D49B6A"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M85 70 C88 74, 94 72, 96 66"
      stroke="#3C1518"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Golden Spices falling in graceful arc */}
    <circle cx="82" cy="78" r="2.5" fill="#D4A843" />
    <circle cx="78" cy="84" r="2" fill="#E8922F" />
    <circle cx="84" cy="88" r="2.2" fill="#D4A843" />
    <circle cx="80" cy="92" r="1.8" fill="#C8102E" />
  </svg>
);

/** 14. Green Cardamom Pod */
export const EditorialCardamomPod: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 70 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M35 10 C48 24, 56 50, 52 75 C48 88, 38 92, 35 94 C32 92, 22 88, 18 75 C14 50, 22 24, 35 10 Z"
      fill="#7E9A68"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M35 12 C35 38, 35 68, 35 92" stroke="#5A7247" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M26 24 C28 44, 28 66, 26 82" stroke="#9AB882" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M44 24 C42 44, 42 66, 44 82" stroke="#9AB882" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M32 8 C35 4, 38 4, 40 7" stroke="#3C1518" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** 15. Botanical Turmeric Leaf with Blooming Spice Bud */
export const EditorialTurmericLeaf: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M70 175 C68 135, 72 90, 74 15" stroke="#5A7247" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M72 30 C95 45, 125 75, 120 115 C115 145, 85 158, 70 160 C55 158, 25 145, 20 115 C15 75, 45 45, 72 30 Z"
      fill="#738F5D"
      stroke="#3C1518"
      strokeWidth="2"
      strokeLinejoin="round"
      opacity="0.9"
    />
    <path d="M72 35 C72 80, 70 120, 70 155" stroke="#3C1518" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <path d="M72 60 C85 70, 102 82, 112 95" stroke="#FAF5EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M71 78 C58 88, 42 100, 30 112" stroke="#FAF5EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M71 102 C84 112, 98 122, 105 132" stroke="#FAF5EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M70 120 C58 130, 46 138, 38 144" stroke="#FAF5EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <ellipse cx="74" cy="20" rx="9" ry="14" fill="#D4A843" stroke="#3C1518" strokeWidth="1.5" />
    <path d="M74 10 C78 16, 78 24, 74 30" stroke="#FAF5EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

/** 16. Cinnamon Bark Quill with Aromatic Clove Accent */
export const EditorialCinnamonClove: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 130 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Cinnamon Rolled Quill */}
    <g transform="translate(15, 20) rotate(10)">
      <path
        d="M10 10 C35 8, 75 12, 95 10 L92 35 C72 38, 32 34, 8 36 Z"
        fill="#8C5832"
        stroke="#3C1518"
        strokeWidth="2"
      />
      {/* Outer curl */}
      <path
        d="M8 36 C4 36, 2 24, 8 16 C14 8, 20 12, 20 18 C20 26, 14 30, 10 30"
        fill="#6E4222"
        stroke="#3C1518"
        strokeWidth="1.5"
      />
      <line x1="25" y1="20" x2="85" y2="22" stroke="#3C1518" strokeWidth="1.2" opacity="0.5" />
    </g>

    {/* Aromatic Clove (Laung) */}
    <g transform="translate(95, 45) rotate(-25)">
      {/* Clove Stem */}
      <rect x="-3" y="0" width="6" height="20" rx="2" fill="#4A2E1B" stroke="#3C1518" strokeWidth="1.5" />
      {/* 4 Calyx Teeth */}
      <path d="M-8 -2 L8 -2 L4 -6 L-4 -6 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="1.2" />
      {/* Clove Head Crown */}
      <circle cx="0" cy="-6" r="5" fill="#D4A843" stroke="#3C1518" strokeWidth="1.2" />
    </g>
  </svg>
);
