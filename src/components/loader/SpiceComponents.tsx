import React from 'react';

export interface FallingSpiceProps {
  className?: string;
  style?: React.CSSProperties;
}

/** 01. Whole Dried Kashmiri Red Chilli */
export const SpiceChilli: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 100 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M26 14 C22 6, 32 2, 40 4 C42 10, 36 16, 38 22"
      stroke="#5A7247"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M32 20 C36 14, 46 16, 50 22 C46 26, 38 28, 32 20 Z"
      fill="#5A7247"
      stroke="#3C1518"
      strokeWidth="1.6"
    />
    <path
      d="M34 22 C46 34, 70 64, 76 86 C80 102, 72 116, 58 124 C52 127, 46 125, 44 119 C40 106, 48 88, 42 70 C36 54, 26 38, 32 22 Z"
      fill="#C8102E"
      stroke="#3C1518"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M38 32 C46 44, 62 70, 66 90 C68 100, 64 108, 56 114"
      stroke="#E84A5F"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M34 44 C38 54, 46 70, 48 84"
      stroke="#FAF5EE"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

/** 02. Golden Salem Haldi Turmeric Rhizome */
export const SpiceTurmeric: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 110 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M14 42 C12 32, 22 22, 38 20 C54 18, 76 25, 92 34 C102 39, 106 50, 97 58 C86 67, 68 68, 46 63 C28 60, 16 52, 14 42 Z"
      fill="#E8922F"
      stroke="#3C1518"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M42 22 C40 12, 50 6, 60 8 C68 10, 72 16, 68 25"
      fill="#D4A843"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M62 63 C64 71, 72 74, 78 69 C81 65, 82 60, 80 55"
      fill="#E8922F"
      stroke="#3C1518"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M28 26 C30 38, 30 48, 26 55" stroke="#3C1518" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M46 24 C49 36, 48 48, 44 58" stroke="#3C1518" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M66 29 C69 40, 69 50, 64 58" stroke="#3C1518" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M84 37 C86 45, 85 52, 82 57" stroke="#3C1518" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M32 34 C48 30, 72 35, 84 42" stroke="#FAF5EE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

/** 03. Whole Star Anise Pod */
export const SpiceStarAnise: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M-5 -8 C-7 -22, -2 -38, 0 -42 C2 -38, 7 -22, 5 -8 Z"
            fill="#6B4226"
            stroke="#3C1518"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <ellipse cx="0" cy="-26" rx="2.5" ry="4" fill="#D4A843" stroke="#3C1518" strokeWidth="1" />
        </g>
      ))}
      <circle cx="0" cy="0" r="7.5" fill="#4E2E1A" stroke="#3C1518" strokeWidth="1.8" />
    </g>
  </svg>
);

/** 04. Green Cardamom Pod */
export const SpiceCardamom: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 70 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M35 8 C48 22, 56 48, 52 74 C48 88, 38 92, 35 94 C32 92, 22 88, 18 74 C14 48, 22 22, 35 8 Z"
      fill="#7E9A68"
      stroke="#3C1518"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M35 10 C35 36, 35 68, 35 92" stroke="#5A7247" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M26 22 C28 42, 28 66, 26 82" stroke="#9AB882" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M44 22 C42 42, 42 66, 44 82" stroke="#9AB882" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M32 7 C35 3, 38 3, 40 6" stroke="#3C1518" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/** 05. Rolled Cinnamon Stick */
export const SpiceCinnamon: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 100 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g transform="translate(8, 10) rotate(5)">
      <path
        d="M10 8 C32 6, 68 10, 84 8 L81 28 C64 31, 28 27, 8 29 Z"
        fill="#8C5832"
        stroke="#3C1518"
        strokeWidth="2"
      />
      <path
        d="M8 29 C4 29, 2 20, 7 14 C12 7, 18 10, 18 15 C18 22, 13 25, 9 25"
        fill="#6E4222"
        stroke="#3C1518"
        strokeWidth="1.6"
      />
      <line x1="22" y1="15" x2="74" y2="17" stroke="#3C1518" strokeWidth="1.2" opacity="0.5" />
    </g>
  </svg>
);

/** 06. Whole Clove (Laung) */
export const SpiceClove: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 50 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g transform="translate(25, 40)">
      <rect x="-4" y="-10" width="8" height="32" rx="3" fill="#4A2E1B" stroke="#3C1518" strokeWidth="2" />
      <path d="M-10 -10 L10 -10 L6 -16 L-6 -16 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="1.6" />
      <circle cx="0" cy="-17" r="7" fill="#D4A843" stroke="#3C1518" strokeWidth="1.8" />
      <circle cx="0" cy="-17" r="4" fill="#E8922F" />
    </g>
  </svg>
);

/** 07. Whole Coriander Seed Cluster (Dhaniya) */
export const SpiceCorianderCluster: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 80 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g transform="translate(26, 26)">
      <circle cx="0" cy="0" r="13" fill="#D4A843" stroke="#3C1518" strokeWidth="1.8" />
      <path d="M0 -13 C-3 -5, -3 5, 0 13" stroke="#6B4226" strokeWidth="1.2" fill="none" />
      <path d="M0 -13 C3 -5, 3 5, 0 13" stroke="#6B4226" strokeWidth="1.2" fill="none" />
      <path d="M-13 0 C-5 -3, 5 -3, 13 0" stroke="#FAF5EE" strokeWidth="1.2" opacity="0.6" fill="none" />
    </g>
    <g transform="translate(50, 32)">
      <circle cx="0" cy="0" r="11" fill="#E5BD5D" stroke="#3C1518" strokeWidth="1.8" />
      <path d="M0 -11 C-3 -4, -3 4, 0 11" stroke="#6B4226" strokeWidth="1.1" fill="none" />
      <path d="M0 -11 C3 -4, 3 4, 0 11" stroke="#6B4226" strokeWidth="1.1" fill="none" />
    </g>
    <g transform="translate(36, 48)">
      <circle cx="0" cy="0" r="12" fill="#D4A843" stroke="#3C1518" strokeWidth="1.8" />
      <path d="M0 -12 C-3 -4, -3 4, 0 12" stroke="#6B4226" strokeWidth="1.1" fill="none" />
      <path d="M0 -12 C3 -4, 3 4, 0 12" stroke="#6B4226" strokeWidth="1.1" fill="none" />
    </g>
  </svg>
);

/** 08. Cumin Seeds Cluster (Jeera) */
export const SpiceCuminCluster: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 80 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g transform="translate(20, 22) rotate(-20)">
      <path d="M-11 0 C-5 -4.5, 5 -4.5, 11 0 C5 4.5, -5 4.5, -11 0 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="1.4" />
      <line x1="-9" y1="0" x2="9" y2="0" stroke="#D4A843" strokeWidth="0.9" />
    </g>
    <g transform="translate(44, 18) rotate(15)">
      <path d="M-12 0 C-6 -5, 6 -5, 12 0 C6 5, -6 5, -12 0 Z" fill="#52392B" stroke="#3C1518" strokeWidth="1.4" />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#D4A843" strokeWidth="0.9" />
    </g>
    <g transform="translate(34, 38) rotate(38)">
      <path d="M-12 0 C-6 -5, 6 -5, 12 0 C6 5, -6 5, -12 0 Z" fill="#6B4226" stroke="#3C1518" strokeWidth="1.4" />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#D4A843" strokeWidth="0.9" />
    </g>
    <g transform="translate(56, 40) rotate(-35)">
      <path d="M-11 0 C-5 -4.5, 5 -4.5, 11 0 C5 4.5, -5 4.5, -11 0 Z" fill="#8C5832" stroke="#3C1518" strokeWidth="1.4" />
      <line x1="-9" y1="0" x2="9" y2="0" stroke="#D4A843" strokeWidth="0.9" />
    </g>
  </svg>
);

/** 09. Black Peppercorn Cluster (Tellicherry Kali Mirch) */
export const SpicePeppercorns: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <circle cx="26" cy="28" r="10" fill="#2E241E" stroke="#3C1518" strokeWidth="1.8" />
    <path d="M21 23 C24 20, 29 20, 31 24" stroke="#FAF5EE" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
    
    <circle cx="45" cy="24" r="9.5" fill="#3D3028" stroke="#3C1518" strokeWidth="1.8" />
    <path d="M41 20 C44 17, 48 17, 50 20" stroke="#FAF5EE" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />

    <circle cx="35" cy="46" r="11" fill="#261E1A" stroke="#3C1518" strokeWidth="1.8" />
    <path d="M30 40 C33 37, 38 37, 40 41" stroke="#FAF5EE" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />

    <circle cx="52" cy="44" r="8.5" fill="#3D3028" stroke="#3C1518" strokeWidth="1.8" />
  </svg>
);

/** 10. Golden Toor Dal & Red Masoor Pulses */
export const SpicePulsesHeap: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 85 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <circle cx="25" cy="35" r="7.5" fill="#F5C342" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="39" cy="31" r="8" fill="#E8922F" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="54" cy="33" r="7.5" fill="#F5C342" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="66" cy="40" r="7" fill="#E8922F" stroke="#3C1518" strokeWidth="1.4" />
    
    <circle cx="18" cy="45" r="6.5" fill="#C8102E" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="31" cy="44" r="7.5" fill="#E84A5F" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="45" cy="46" r="7.5" fill="#C8102E" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="59" cy="47" r="7" fill="#E84A5F" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="38" cy="55" r="7" fill="#C8102E" stroke="#3C1518" strokeWidth="1.4" />

    <circle cx="32" cy="22" r="7" fill="#F5C342" stroke="#3C1518" strokeWidth="1.4" />
    <circle cx="47" cy="20" r="7" fill="#C8102E" stroke="#3C1518" strokeWidth="1.4" />
  </svg>
);

/** 11. Individual Golden Toor Dal & Masoor Split Seed Duo */
export const SpiceDalSeeds: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 60 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <ellipse cx="22" cy="25" rx="14" ry="11" fill="#F5C342" stroke="#3C1518" strokeWidth="1.8" />
    <path d="M14 22 C18 18, 25 18, 29 23" stroke="#FAF5EE" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />

    <ellipse cx="38" cy="34" rx="13" ry="10" fill="#C8102E" stroke="#3C1518" strokeWidth="1.8" />
    <path d="M30 31 C34 27, 41 27, 45 32" stroke="#E84A5F" strokeWidth="1.2" opacity="0.8" strokeLinecap="round" />
  </svg>
);

/** 12. Fresh Coriander Sprig */
export const SpiceCorianderLeaf: React.FC<FallingSpiceProps> = ({ className = '', style }) => (
  <svg
    viewBox="0 0 85 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="M42 100 C42 75, 44 45, 42 10" stroke="#5A7247" strokeWidth="2.4" strokeLinecap="round" />
    <g transform="translate(42,15)">
      <path d="M0 0 C-9 -6, -13 -15, 0 -17 C13 -15, 9 -6, 0 0 Z" fill="#738F5D" stroke="#3C1518" strokeWidth="1.6" />
    </g>
    <g transform="translate(20,44) rotate(-30)">
      <path d="M0 0 C-8 -5, -11 -13, 0 -14 C11 -13, 8 -5, 0 0 Z" fill="#738F5D" stroke="#3C1518" strokeWidth="1.6" />
    </g>
    <g transform="translate(64,62) rotate(30)">
      <path d="M0 0 C-8 -5, -11 -13, 0 -14 C11 -13, 8 -5, 0 0 Z" fill="#738F5D" stroke="#3C1518" strokeWidth="1.6" />
    </g>
  </svg>
);

export type SpiceType =
  | 'chilli'
  | 'turmeric'
  | 'starAnise'
  | 'cardamom'
  | 'cinnamon'
  | 'clove'
  | 'corianderCluster'
  | 'cuminCluster'
  | 'peppercorns'
  | 'pulsesHeap'
  | 'dalSeeds'
  | 'corianderLeaf';

export const SPICE_COMPONENTS: Record<SpiceType, React.FC<FallingSpiceProps>> = {
  chilli: SpiceChilli,
  turmeric: SpiceTurmeric,
  starAnise: SpiceStarAnise,
  cardamom: SpiceCardamom,
  cinnamon: SpiceCinnamon,
  clove: SpiceClove,
  corianderCluster: SpiceCorianderCluster,
  cuminCluster: SpiceCuminCluster,
  peppercorns: SpicePeppercorns,
  pulsesHeap: SpicePulsesHeap,
  dalSeeds: SpiceDalSeeds,
  corianderLeaf: SpiceCorianderLeaf,
};
