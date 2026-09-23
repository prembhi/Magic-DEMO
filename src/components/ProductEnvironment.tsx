import React from 'react';
import { MagicProduct } from '../types/product';

interface ProductEnvironmentProps {
  product: MagicProduct;
  isHovered: boolean;
}

export const ProductEnvironment: React.FC<ProductEnvironmentProps> = ({
  product,
  isHovered,
}) => {
  const { environment, id } = product;

  // Render product-specific physical illustrated world
  const renderProductWorld = () => {
    switch (id) {
      /* =========================================================================
       * 01. TOOR DAL: Golden Farmstead Sunburst & Pigeon Pea Botanicals
       * ========================================================================= */
      case 'toor-dal':
        return (
          <>
            {/* Top-Left: Pigeon Pea Blossom Sprigs (Flowering pea stalks with yellow petals) */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-90'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md" viewBox="0 0 160 160" fill="none">
                {/* Curving green branch */}
                <path d="M20 150 C 45 110, 65 75, 135 25" stroke="#4D6B3C" strokeWidth="3" strokeLinecap="round" />
                {/* Delicate pinnate leaflets */}
                <ellipse cx="60" cy="100" rx="14" ry="7" transform="rotate(-30 60 100)" fill="#6B8E4E" opacity="0.9" />
                <ellipse cx="88" cy="74" rx="13" ry="6.5" transform="rotate(-25 88 74)" fill="#6B8E4E" opacity="0.9" />
                <ellipse cx="112" cy="50" rx="12" ry="6" transform="rotate(-20 112 50)" fill="#5A7A40" opacity="0.9" />
                {/* Yellow pigeon pea blossoms */}
                <g transform="translate(68, 88)">
                  <path d="M0 0 C -6 -14, 6 -18, 12 -6 C 14 2, 6 10, 0 0 Z" fill="#F5C342" />
                  <path d="M-2 -3 C -10 -8, -12 4, -4 6 Z" fill="#E8922F" />
                  <circle cx="2" cy="-4" r="2" fill="#C8102E" />
                </g>
                <g transform="translate(122, 36)">
                  <path d="M0 0 C -6 -14, 6 -18, 12 -6 C 14 2, 6 10, 0 0 Z" fill="#F5C342" />
                  <path d="M-2 -3 C -10 -8, -12 4, -4 6 Z" fill="#E8922F" />
                </g>
              </svg>
            </div>

            {/* Top-Right: Golden Farm Stalks & Pod Clusters */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-90'
              }`}
            >
              <svg className="w-36 h-40 sm:w-44 sm:h-48 drop-shadow-md" viewBox="0 0 150 170" fill="none">
                {/* Stalks */}
                <path d="M120 160 C 105 110, 85 60, 40 15" stroke="#C46816" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M135 155 C 115 105, 95 65, 70 25" stroke="#D4A843" strokeWidth="2" strokeDasharray="4 2" />
                {/* Hanging pea pods */}
                {[
                  { cx: 88, cy: 62, rot: 25 },
                  { cx: 70, cy: 92, rot: -20 },
                  { cx: 52, cy: 35, rot: 30 },
                ].map((pod, i) => (
                  <g key={i} transform={`rotate(${pod.rot} ${pod.cx} ${pod.cy})`}>
                    <path
                      d={`M${pod.cx - 16} ${pod.cy - 6} Q ${pod.cx} ${pod.cy + 12} ${pod.cx + 18} ${pod.cy - 4} Q ${pod.cx} ${pod.cy - 12} ${pod.cx - 16} ${pod.cy - 6}`}
                      fill="#D4881E"
                      stroke="#8B4513"
                      strokeWidth="1.2"
                    />
                    <circle cx={pod.cx - 4} cy={pod.cy + 2} r="3" fill="#F5C342" />
                    <circle cx={pod.cx + 6} cy={pod.cy} r="3" fill="#F5C342" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom-Left: Carved Teakwood Grain Scoop with Split Golden Dal */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Wooden scoop handle */}
                <path d="M25 135 L 55 105" stroke="#5C381E" strokeWidth="12" strokeLinecap="round" />
                <path d="M25 135 L 55 105" stroke="#7A4B29" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                {/* Scoop bowl */}
                <ellipse cx="85" cy="80" rx="36" ry="24" transform="rotate(-30 85 80)" fill="#6B4226" />
                <ellipse cx="84" cy="78" rx="32" ry="20" transform="rotate(-30 84 78)" fill="#8A5A36" />
                {/* Golden split pigeon peas inside and overflowing scoop */}
                <ellipse cx="84" cy="76" rx="26" ry="16" transform="rotate(-30 84 76)" fill="#F5C342" />
                {[
                  { cx: 75, cy: 70 },
                  { cx: 86, cy: 74 },
                  { cx: 95, cy: 68 },
                  { cx: 78, cy: 82 },
                  { cx: 90, cy: 80 },
                  { cx: 104, cy: 72 },
                  { cx: 112, cy: 82 },
                ].map((pt, i) => (
                  <ellipse key={i} cx={pt.cx} cy={pt.cy} rx="4" ry="2.8" fill="#E8922F" transform={`rotate(${i * 35} ${pt.cx} ${pt.cy})`} />
                ))}
              </svg>
            </div>

            {/* Bottom-Right: Fresh Curry Leaf Sprig with Berries */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                <path d="M125 135 C 105 105, 80 65, 30 35" stroke="#3A5328" strokeWidth="2.5" strokeLinecap="round" />
                {/* Alternating pointed glossy curry leaves */}
                {[
                  { x: 100, y: 112, rot: -40 },
                  { x: 88, y: 92, rot: 35 },
                  { x: 74, y: 76, rot: -45 },
                  { x: 60, y: 60, rot: 30 },
                  { x: 42, y: 44, rot: -30 },
                ].map((l, i) => (
                  <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
                    <path d="M0 0 C 14 -12, 28 -4, 30 0 C 28 4, 14 12, 0 0 Z" fill="#4B6E32" />
                    <path d="M0 0 L 26 0" stroke="#2B4018" strokeWidth="0.8" />
                  </g>
                ))}
                {/* Deep purple curry berries */}
                <circle cx="112" cy="120" r="3.5" fill="#3C1518" />
                <circle cx="118" cy="114" r="3" fill="#3C1518" />
                <circle cx="106" cy="126" r="3" fill="#5A2E16" />
              </svg>
            </div>
          </>
        );

      /* =========================================================================
       * 02. MASOOR DAL: Warm Terracotta Agricultural Harvest & Red Lentils
       * ========================================================================= */
      case 'masoor-dal':
        return (
          <>
            {/* Top-Left: Warm Lentil Pod Shoots & Delicate Leaves */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md" viewBox="0 0 160 160" fill="none">
                <path d="M30 145 C 50 110, 75 75, 125 30" stroke="#8A4A28" strokeWidth="2.5" strokeLinecap="round" />
                {/* Feathery paired leaflets */}
                {[
                  { cx: 55, cy: 110, rot: -30 },
                  { cx: 75, cy: 88, rot: 25 },
                  { cx: 95, cy: 62, rot: -25 },
                  { cx: 112, cy: 42, rot: 20 },
                ].map((lf, i) => (
                  <ellipse key={i} cx={lf.cx} cy={lf.cy} rx="12" ry="5.5" transform={`rotate(${lf.rot} ${lf.cx} ${lf.cy})`} fill="#A8582C" opacity="0.88" />
                ))}
                {/* Flat rhomboid lentil pods */}
                <g transform="translate(68, 75) rotate(-20)">
                  <path d="M0 0 C 8 -8, 20 -4, 24 2 C 20 8, 8 10, 0 0 Z" fill="#D94833" stroke="#8B2616" strokeWidth="1" />
                  <circle cx="8" cy="1" r="2.5" fill="#F48B29" />
                  <circle cx="16" cy="2" r="2.5" fill="#F48B29" />
                </g>
                <g transform="translate(105, 35) rotate(15)">
                  <path d="M0 0 C 8 -8, 20 -4, 24 2 C 20 8, 8 10, 0 0 Z" fill="#D94833" stroke="#8B2616" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Top-Right: Golden Sunlit Wheatgrass & Stalks */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-40 sm:w-44 sm:h-48 drop-shadow-md" viewBox="0 0 150 170" fill="none">
                <path d="M110 160 C 95 105, 80 60, 50 15" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M125 150 C 110 110, 95 70, 75 30" stroke="#E8922F" strokeWidth="1.8" />
                {/* Slender golden awns */}
                {[
                  { cx: 62, cy: 35, rot: -40 },
                  { cx: 70, cy: 55, rot: 40 },
                  { cx: 78, cy: 75, rot: -35 },
                  { cx: 86, cy: 95, rot: 35 },
                ].map((sp, i) => (
                  <ellipse key={i} cx={sp.cx} cy={sp.cy} rx="9" ry="3.5" transform={`rotate(${sp.rot} ${sp.cx} ${sp.cy})`} fill="#F5C342" />
                ))}
              </svg>
            </div>

            {/* Bottom-Left: Hand-thrown Terracotta Clay Bowl with Split Red Lentils */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-38 sm:w-46 sm:h-46 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Terracotta bowl body */}
                <ellipse cx="80" cy="85" rx="42" ry="14" fill="#C85A32" />
                <path d="M38 85 C 38 120, 55 140, 80 140 C 105 140, 122 120, 122 85 Z" fill="#9C3A18" />
                {/* Bowl engraved banding lines */}
                <path d="M42 98 C 55 106, 105 106, 118 98" stroke="#D96E43" strokeWidth="2" fill="none" />
                <path d="M46 110 C 60 118, 100 118, 114 110" stroke="#782A10" strokeWidth="1.5" fill="none" />
                {/* Mound of split red/orange lentils */}
                <ellipse cx="80" cy="82" rx="34" ry="11" fill="#E85D04" />
                <ellipse cx="80" cy="80" rx="28" ry="8" fill="#F48B29" />
                {/* Cascading individual lentils */}
                {[
                  { cx: 72, cy: 78 },
                  { cx: 82, cy: 80 },
                  { cx: 89, cy: 77 },
                  { cx: 76, cy: 84 },
                  { cx: 85, cy: 83 },
                ].map((l, i) => (
                  <ellipse key={i} cx={l.cx} cy={l.cy} rx="3.5" ry="2.2" fill="#FFA07A" transform={`rotate(${i * 40} ${l.cx} ${l.cy})`} />
                ))}
              </svg>
            </div>

            {/* Bottom-Right: Cascading Split Red Lentil Florets & Clay Diya */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                {/* Subtle earthen saucer with golden spice dust */}
                <ellipse cx="75" cy="95" rx="36" ry="12" fill="#8B3A1C" />
                <ellipse cx="75" cy="93" rx="32" ry="10" fill="#D95C32" />
                <ellipse cx="75" cy="91" rx="26" ry="7" fill="#E85D04" />
                {/* Floating grain scatter */}
                {[
                  { cx: 60, cy: 65, r: 4 },
                  { cx: 72, cy: 50, r: 3.5 },
                  { cx: 90, cy: 60, r: 4.2 },
                  { cx: 82, cy: 75, r: 3.8 },
                  { cx: 105, cy: 80, r: 3.2 },
                ].map((g, i) => (
                  <ellipse key={i} cx={g.cx} cy={g.cy} rx={g.r} ry={g.r * 0.7} fill="#F48B29" transform={`rotate(${i * 50} ${g.cx} ${g.cy})`} />
                ))}
              </svg>
            </div>
          </>
        );

      /* =========================================================================
       * 03. MOONG WHOLE: Verdant Botanical Vines, Pods & Fresh Coriander
       * ========================================================================= */
      case 'moong-whole':
        return (
          <>
            {/* Top-Left: Mung Bean Climbing Vines with Tendrils */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md" viewBox="0 0 160 160" fill="none">
                {/* Arching green vine */}
                <path d="M25 145 C 40 100, 60 70, 130 25" stroke="#3E5C2C" strokeWidth="3" strokeLinecap="round" />
                {/* Spiraling tendril */}
                <path d="M125 30 C 135 20, 145 28, 140 38 C 135 45, 142 50, 148 45" stroke="#5F8846" strokeWidth="1.8" fill="none" />
                {/* Cordate heart-shaped mung leaves */}
                <g transform="translate(60, 95) rotate(-35)">
                  <path d="M0 0 C -12 -16, 4 -24, 16 -12 C 26 0, 12 12, 0 0 Z" fill="#5F8846" />
                  <path d="M0 0 L 14 -12" stroke="#2E4822" strokeWidth="1" />
                </g>
                <g transform="translate(95, 60) rotate(25)">
                  <path d="M0 0 C -12 -16, 4 -24, 16 -12 C 26 0, 12 12, 0 0 Z" fill="#6E9751" />
                  <path d="M0 0 L 14 -12" stroke="#3E5C2C" strokeWidth="1" />
                </g>
                {/* Slender green mung pods */}
                <path d="M70 95 C 75 110, 85 125, 95 135" stroke="#4A6B3D" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M75 92 C 85 105, 98 118, 110 125" stroke="#5F8846" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Top-Right: Fresh Coriander Branches & Fragrant Seed Sprigs */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-40 sm:w-44 sm:h-48 drop-shadow-md" viewBox="0 0 150 170" fill="none">
                <path d="M120 160 C 105 110, 80 60, 45 20" stroke="#3A5328" strokeWidth="2.5" strokeLinecap="round" />
                {/* Serrated coriander leaves */}
                {[
                  { x: 95, y: 110, rot: 35 },
                  { x: 80, y: 80, rot: -30 },
                  { x: 60, y: 50, rot: 25 },
                  { x: 45, y: 22, rot: -15 },
                ].map((l, i) => (
                  <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
                    <path d="M0 0 C 6 -10, 14 -12, 18 -6 C 22 0, 16 8, 8 10 C 2 12, -4 6, 0 0 Z" fill="#5F8846" />
                    <circle cx="12" cy="-2" r="1.5" fill="#A4C639" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom-Left: Hand-thrown Celadon Ceramic Pot with Whole Green Gram */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-38 sm:w-46 sm:h-46 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Ceramic pot */}
                <ellipse cx="80" cy="85" rx="38" ry="12" fill="#3E5330" />
                <path d="M42 85 C 42 120, 58 138, 80 138 C 102 138, 118 120, 118 85 Z" fill="#2E4822" />
                <ellipse cx="80" cy="84" rx="34" ry="10" fill="#4D6B3C" />
                {/* Pile of whole green gram with tiny white hilum eyes */}
                <ellipse cx="80" cy="82" rx="28" ry="8" fill="#5A7247" />
                {[
                  { cx: 72, cy: 80, rot: 15 },
                  { cx: 82, cy: 83, rot: -20 },
                  { cx: 89, cy: 79, rot: 40 },
                  { cx: 76, cy: 85, rot: -10 },
                  { cx: 85, cy: 85, rot: 25 },
                ].map((m, i) => (
                  <g key={i} transform={`rotate(${m.rot} ${m.cx} ${m.cy})`}>
                    <ellipse cx={m.cx} cy={m.cy} rx="4" ry="2.6" fill="#6B8E4E" />
                    <circle cx={m.cx} cy={m.cy - 0.5} r="0.7" fill="#FDF6EC" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom-Right: Whole Green Gram Grains Scattered */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                {[
                  { cx: 55, cy: 75, r: 4 },
                  { cx: 70, cy: 60, r: 4.2 },
                  { cx: 90, cy: 68, r: 3.8 },
                  { cx: 80, cy: 88, r: 4.5 },
                  { cx: 105, cy: 82, r: 3.5 },
                  { cx: 65, cy: 95, r: 3.8 },
                ].map((g, i) => (
                  <g key={i}>
                    <ellipse cx={g.cx} cy={g.cy} rx={g.r} ry={g.r * 0.72} fill="#5A7247" transform={`rotate(${i * 45} ${g.cx} ${g.cy})`} />
                    <circle cx={g.cx} cy={g.cy} r="0.8" fill="#FDF6EC" />
                  </g>
                ))}
              </svg>
            </div>
          </>
        );

      /* =========================================================================
       * 04. URAD WHOLE: Deep Earthy Botanical, Stone Chakki & Black Matpe Beans
       * ========================================================================= */
      case 'urad-whole':
        return (
          <>
            {/* Top-Left: Wild Bay Leaf & Dark Botanical Branch */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md" viewBox="0 0 160 160" fill="none">
                <path d="M25 145 C 45 105, 65 70, 130 25" stroke="#3C1518" strokeWidth="3" strokeLinecap="round" />
                {/* Thick leathery bay/spice leaves */}
                {[
                  { cx: 55, cy: 105, rot: -35 },
                  { cx: 78, cy: 80, rot: 30 },
                  { cx: 100, cy: 55, rot: -30 },
                  { cx: 118, cy: 35, rot: 25 },
                ].map((lf, i) => (
                  <g key={i} transform={`translate(${lf.cx} ${lf.cy}) rotate(${lf.rot})`}>
                    <path d="M0 0 C 12 -16, 26 -6, 28 0 C 26 6, 12 16, 0 0 Z" fill="#5A2E16" />
                    <path d="M0 0 L 24 0" stroke="#3C1518" strokeWidth="1" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Top-Right: Dark Matpe Pod Clusters */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-40 sm:w-44 sm:h-48 drop-shadow-md" viewBox="0 0 150 170" fill="none">
                <path d="M120 160 C 105 110, 85 60, 40 20" stroke="#4A282D" strokeWidth="2.5" strokeLinecap="round" />
                {/* Cylindrical hairy black matpe pods */}
                {[
                  { cx: 80, cy: 65, rot: 35 },
                  { cx: 65, cy: 95, rot: -30 },
                  { cx: 50, cy: 40, rot: 25 },
                ].map((pod, i) => (
                  <g key={i} transform={`rotate(${pod.rot} ${pod.cx} ${pod.cy})`}>
                    <rect x={pod.cx - 16} y={pod.cy - 4} width="32" height="8" rx="4" fill="#2B1214" stroke="#8B1A4A" strokeWidth="1" />
                    <circle cx={pod.cx - 8} cy={pod.cy} r="2" fill="#D4A843" opacity="0.6" />
                    <circle cx={pod.cx + 8} cy={pod.cy} r="2" fill="#D4A843" opacity="0.6" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom-Left: Traditional Stone Chakki Grinder & Brass Details */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-38 sm:w-46 sm:h-46 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Lower stone plinth */}
                <ellipse cx="80" cy="100" rx="45" ry="18" fill="#3D3A37" />
                <path d="M35 100 C 35 125, 45 135, 80 135 C 115 135, 125 125, 125 100 Z" fill="#262423" />
                {/* Upper revolving stone disk with radial grooving */}
                <ellipse cx="80" cy="88" rx="38" ry="14" fill="#524E4A" />
                <ellipse cx="80" cy="86" rx="34" ry="12" fill="#696560" />
                <circle cx="80" cy="85" r="8" fill="#262423" />
                {/* Brass / wooden handle upright peg */}
                <rect x="100" y="62" width="6" height="24" rx="3" fill="#D4A843" />
                <circle cx="103" cy="62" r="4.5" fill="#F5C342" />
                {/* Glossy black matpe beans clustered around base */}
                {[
                  { cx: 58, cy: 96 },
                  { cx: 68, cy: 104 },
                  { cx: 78, cy: 102 },
                  { cx: 88, cy: 105 },
                  { cx: 98, cy: 98 },
                ].map((b, i) => (
                  <ellipse key={i} cx={b.cx} cy={b.cy} rx="4" ry="2.7" fill="#1C1819" stroke="#696560" strokeWidth="0.6" />
                ))}
              </svg>
            </div>

            {/* Bottom-Right: Whole Glossy Black Matpe Beans Scatter */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                {[
                  { cx: 55, cy: 75 },
                  { cx: 70, cy: 60 },
                  { cx: 90, cy: 70 },
                  { cx: 80, cy: 90 },
                  { cx: 102, cy: 84 },
                  { cx: 62, cy: 98 },
                ].map((b, i) => (
                  <g key={i}>
                    <ellipse cx={b.cx} cy={b.cy} rx="4.5" ry="3" fill="#201C1D" transform={`rotate(${i * 40} ${b.cx} ${b.cy})`} />
                    <line x1={b.cx - 2} y1={b.cy} x2={b.cx + 2} y2={b.cy} stroke="#FDF6EC" strokeWidth="0.8" transform={`rotate(${i * 40} ${b.cx} ${b.cy})`} />
                  </g>
                ))}
              </svg>
            </div>
          </>
        );

      /* =========================================================================
       * 05. HALDI: Golden Salem Turmeric Rhizomes, Brass Khalbatta & Broad Leaves
       * ========================================================================= */
      case 'haldi':
        return (
          <>
            {/* Top-Left: Salem Turmeric Rhizomes (knobby root with concentric rings) */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-lg" viewBox="0 0 170 170" fill="none">
                {/* Main knobby rhizome */}
                <path
                  d="M25 110 C 45 75, 80 70, 110 90 C 125 100, 138 85, 145 70"
                  stroke="#C47A1E"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <path
                  d="M75 75 C 80 45, 105 45, 115 58"
                  stroke="#D4881E"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Highlight core */}
                <path
                  d="M28 108 C 45 78, 80 74, 108 92"
                  stroke="#F5C342"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Concentric growth rings on root */}
                <path d="M48 85 L 54 105" stroke="#6B381E" strokeWidth="2.5" opacity="0.6" />
                <path d="M72 72 L 78 94" stroke="#6B381E" strokeWidth="2.5" opacity="0.6" />
                <path d="M96 78 L 100 100" stroke="#6B381E" strokeWidth="2.5" opacity="0.6" />
                <path d="M88 48 L 96 64" stroke="#6B381E" strokeWidth="2" opacity="0.6" />
                {/* Cut cross-section exposing brilliant saffron interior */}
                <ellipse cx="26" cy="110" rx="11" ry="8" transform="rotate(-30 26 110)" fill="#E8922F" stroke="#F5C342" strokeWidth="2" />
                <ellipse cx="26" cy="110" rx="6" ry="4" transform="rotate(-30 26 110)" fill="#F5C342" />
              </svg>
            </div>

            {/* Top-Right: Broad Arching Lush Turmeric Leaves */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-38 h-42 sm:w-46 sm:h-50 drop-shadow-md" viewBox="0 0 160 180" fill="none">
                {/* Big arching leaf */}
                <path
                  d="M125 160 C 110 100, 85 45, 30 15 C 55 45, 95 85, 125 160 Z"
                  fill="#7E9F63"
                  stroke="#4D6B3C"
                  strokeWidth="2"
                />
                {/* Leaf central vein and parallel ribs */}
                <path d="M125 160 C 95 85, 65 45, 30 15" stroke="#3A5328" strokeWidth="2" fill="none" />
                <path d="M60 48 L 45 40" stroke="#3A5328" strokeWidth="1" />
                <path d="M80 75 L 62 65" stroke="#3A5328" strokeWidth="1" />
                <path d="M100 110 L 80 98" stroke="#3A5328" strokeWidth="1" />
              </svg>
            </div>

            {/* Bottom-Left: Heavy Traditional Brass Khalbatta (Mortar & Pestle) */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-38 sm:w-46 sm:h-46 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Heavy brass mortar base */}
                <ellipse cx="80" cy="115" rx="38" ry="12" fill="#996E24" />
                <path d="M42 115 C 45 135, 115 135, 118 115 Z" fill="#6B4B14" />
                {/* Flared mortar goblet body */}
                <path d="M42 80 L 52 115 L 108 115 L 118 80 Z" fill="#B8860B" />
                <ellipse cx="80" cy="80" rx="38" ry="12" fill="#D4A843" />
                <ellipse cx="80" cy="78" rx="32" ry="9" fill="#F5C342" />
                {/* Brass pestle leaning in mortar */}
                <path d="M50 40 L 78 88" stroke="#DAA520" strokeWidth="14" strokeLinecap="round" />
                <path d="M50 40 L 78 88" stroke="#FFD700" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
                {/* Brilliant golden turmeric dust at the rim */}
                <ellipse cx="80" cy="78" rx="24" ry="6" fill="#FFA500" />
              </svg>
            </div>

            {/* Bottom-Right: Luminous Curcumin Dust Swirl & Whole Spices */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                {/* Curving golden aura dust line */}
                <path
                  d="M30 110 C 60 120, 100 100, 115 65 C 120 50, 110 35, 95 40"
                  stroke="#F5C342"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                />
                {/* Whole green cardamom pod accent */}
                <ellipse cx="75" cy="85" rx="8" ry="14" transform="rotate(25 75 85)" fill="#5A7247" />
                <path d="M72 74 Q 78 85 73 96" stroke="#3A5328" strokeWidth="1" fill="none" />
                {/* Star anise point */}
                <circle cx="105" cy="75" r="4" fill="#6B381E" />
                <circle cx="105" cy="75" r="2" fill="#D4A843" />
              </svg>
            </div>
          </>
        );

      /* =========================================================================
       * 06. JEERA: Delicate Feathery Umbels, Hammered Copper Tadka Pan & Cumin Seeds
       * ========================================================================= */
      case 'jeera':
        return (
          <>
            {/* Top-Left: Dried Spice Stems & Cinnamon Bark */}
            <div
              className={`absolute top-[-14%] left-[-18%] sm:top-[-18%] sm:left-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-12px] translate-y-[-14px] scale-105 rotate-[-4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md" viewBox="0 0 160 160" fill="none">
                {/* Curled cinnamon quill */}
                <rect x="35" y="70" width="65" height="16" rx="8" transform="rotate(-35 67 78)" fill="#6B381E" />
                <rect x="38" y="73" width="58" height="5" rx="2.5" transform="rotate(-35 67 78)" fill="#8A4A28" />
                <ellipse cx="44" cy="98" rx="5" ry="8" transform="rotate(-35 44 98)" fill="#4A2412" />
                {/* Sun-dried spice sprig */}
                <path d="M30 145 C 50 115, 80 85, 120 40" stroke="#8A5A36" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Top-Right: Delicate Cumin Umbel Sprigs (Feathery umbrella flowerheads) */}
            <div
              className={`absolute top-[-15%] right-[-18%] sm:top-[-20%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[12px] translate-y-[-14px] scale-105 rotate-[4deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-42 sm:w-46 sm:h-50 drop-shadow-md" viewBox="0 0 160 180" fill="none">
                {/* Main stem */}
                <path d="M120 165 C 105 110, 85 70, 60 30" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" />
                {/* Radiating umbellifer rays */}
                {[
                  { x2: 25, y2: 12 },
                  { x2: 40, y2: 6 },
                  { x2: 60, y2: 5 },
                  { x2: 80, y2: 10 },
                  { x2: 95, y2: 22 },
                ].map((ray, i) => (
                  <g key={i}>
                    <line x1="60" y1="30" x2={ray.x2} y2={ray.y2} stroke="#B87333" strokeWidth="1.5" />
                    <circle cx={ray.x2} cy={ray.y2} r="2.5" fill="#D4A843" />
                  </g>
                ))}
                {/* Secondary flower cluster */}
                <g transform="translate(85, 75)">
                  <line x1="0" y1="0" x2="25" y2="-15" stroke="#B87333" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="32" y2="-5" stroke="#B87333" strokeWidth="1.5" />
                  <circle cx="25" cy="-15" r="2.2" fill="#D4A843" />
                  <circle cx="32" cy="-5" r="2.2" fill="#D4A843" />
                </g>
              </svg>
            </div>

            {/* Bottom-Left: Hammered Copper Tadka Pan with Sizzling Cumin Seeds */}
            <div
              className={`absolute bottom-[-10%] left-[-20%] sm:bottom-[-14%] sm:left-[-26%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[-10px] translate-y-[10px] scale-105 rotate-[-3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-95'
              }`}
            >
              <svg className="w-38 h-38 sm:w-46 sm:h-46 drop-shadow-xl" viewBox="0 0 160 160" fill="none">
                {/* Long cast brass handle */}
                <path d="M22 138 L 52 108" stroke="#8B5A2B" strokeWidth="9" strokeLinecap="round" />
                <circle cx="22" cy="138" r="4.5" fill="#D4A843" />
                {/* Hammered copper pan bowl */}
                <ellipse cx="80" cy="85" rx="38" ry="16" fill="#B87333" />
                <path d="M42 85 C 42 115, 60 130, 80 130 C 100 130, 118 115, 118 85 Z" fill="#8B4513" />
                {/* Pan interior with golden ghee shimmer */}
                <ellipse cx="80" cy="83" rx="32" ry="12" fill="#C47A3E" />
                <ellipse cx="80" cy="82" rx="26" ry="8" fill="#D49B43" opacity="0.9" />
                {/* Slender ridged cumin seeds sizzling in the pan */}
                {[
                  { cx: 72, cy: 80, rot: -25 },
                  { cx: 80, cy: 84, rot: 30 },
                  { cx: 88, cy: 81, rot: -40 },
                  { cx: 76, cy: 85, rot: 15 },
                  { cx: 85, cy: 82, rot: -10 },
                ].map((s, i) => (
                  <ellipse key={i} cx={s.cx} cy={s.cy} rx="5" ry="1.8" fill="#5C381E" stroke="#D4A843" strokeWidth="0.6" transform={`rotate(${s.rot} ${s.cx} ${s.cy})`} />
                ))}
              </svg>
            </div>

            {/* Bottom-Right: Flurry of Whole Ridged Cumin Seeds */}
            <div
              className={`absolute bottom-[-10%] right-[-18%] sm:bottom-[-14%] sm:right-[-24%] transition-all duration-700 ease-out pointer-events-none z-0 ${
                isHovered
                  ? 'translate-x-[10px] translate-y-[10px] scale-105 rotate-[3deg] opacity-100'
                  : 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-92'
              }`}
            >
              <svg className="w-36 h-36 sm:w-42 sm:h-42 drop-shadow-lg" viewBox="0 0 150 150" fill="none">
                {[
                  { cx: 50, cy: 75, rot: 25 },
                  { cx: 68, cy: 60, rot: -45 },
                  { cx: 90, cy: 70, rot: 15 },
                  { cx: 78, cy: 90, rot: -20 },
                  { cx: 104, cy: 82, rot: 40 },
                  { cx: 62, cy: 98, rot: 60 },
                ].map((s, i) => (
                  <g key={i} transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}>
                    <ellipse cx={s.cx} cy={s.cy} rx="6" ry="2" fill="#6B4226" />
                    <line x1={s.cx - 5} y1={s.cy} x2={s.cx + 5} y2={s.cy} stroke="#D4A843" strokeWidth="0.8" />
                  </g>
                ))}
              </svg>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
      {/* LAYER 1: ATMOSPHERIC WARM TERROIR GLOW */}
      <div
        className={`absolute rounded-full w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] transition-all duration-700 ease-out blur-3xl pointer-events-none ${
          isHovered ? 'scale-115 opacity-90' : 'scale-100 opacity-60'
        }`}
        style={{
          background: `radial-gradient(circle, ${environment.glowColor} 0%, rgba(253, 246, 236, 0.1) 65%, transparent 75%)`,
        }}
      />

      {/* LAYER 2: WOODBLOCK ENGRAVED RADIATING ARCS & MANDALA LINES */}
      <svg
        className={`absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] transition-all duration-700 ease-out pointer-events-none ${
          isHovered ? 'scale-105 opacity-65 rotate-15' : 'scale-100 opacity-45 rotate-0'
        }`}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke={environment.accentColor}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.6"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke={environment.themeColor}
          strokeWidth="0.8"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.5"
        />
        {/* Subtle rays */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="16"
            x2="100"
            y2="30"
            stroke={environment.themeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${i * 22.5} 100 100)`}
            opacity="0.45"
          />
        ))}
      </svg>

      {/* LAYER 3: PHYSICAL PRODUCT-SPECIFIC ILLUSTRATED ENVIRONMENT */}
      <div className="relative w-[300px] sm:w-[340px] md:w-[380px] aspect-[1/1.45] flex items-center justify-center">
        {renderProductWorld()}
      </div>

      {/* LAYER 4: INFORMATIVE TERROIR BADGE (ELEGANT EDITORIAL PILL) */}
      <div
        className={`absolute bottom-[-22px] sm:bottom-[-30px] inset-x-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out z-20 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-80'
        }`}
      >
        <div className="bg-[#3C1518]/95 text-[#FDF6EC] px-4 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-2 border border-[#D4A843]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
          <span className="font-display font-bold text-xs tracking-wider text-[#D4A843]">
            {environment.environmentTitle}
          </span>
          <span className="text-white/30 text-xs hidden sm:inline">·</span>
          <span className="text-[11px] text-[#FDF6EC]/85 font-medium hidden sm:inline">
            {environment.environmentSubtitle}
          </span>
        </div>
      </div>
    </div>
  );
};
