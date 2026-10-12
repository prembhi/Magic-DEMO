import { MAGIC_ASSETS } from '../../constants/assets';

export type SpiceAssetKey = 'chilli' | 'turmeric' | 'cinnamon' | 'cardamom' | 'starAnise' | 'seedCluster';

export interface LargeSpiceItem {
  id: string;
  assetKey: SpiceAssetKey;
  imgSrc: string;
  // Natural aspect ratio (width / height)
  aspectRatio: number;
  // Target dimensions in px
  widthPx: number;
  heightPx: number;
  // Final resting position in % of viewport
  targetXPercent: number; // 0 to 100
  targetYPercent: number; // 0 to 100
  // Start horizontal position %
  startXPercent: number;
  // Rotation
  targetRotateDeg: number;
  initialRotateDeg: number;
  // Timing
  fallDelaySec: number;
  fallDurationSec: number;
  zIndex: number;
}

/**
 * Dimensions and aspect ratios based on tightly cropped PNG assets:
 * chilli: 423 x 815 (~0.52 aspect)
 * turmeric: 593 x 860 (~0.69 aspect)
 * cinnamon: 698 x 807 (~0.86 aspect)
 * cardamom: 751 x 653 (~1.15 aspect)
 * starAnise: 873 x 871 (~1.00 aspect)
 * seedCluster: 713 x 699 (~1.02 aspect)
 */
const SPICE_PROFILES: Record<SpiceAssetKey, { src: string; aspect: number; baseWDesktop: number; baseWMobile: number }> = {
  chilli: { src: MAGIC_ASSETS.loader.chilli, aspect: 423 / 815, baseWDesktop: 160, baseWMobile: 110 },
  turmeric: { src: MAGIC_ASSETS.loader.turmeric, aspect: 593 / 860, baseWDesktop: 220, baseWMobile: 150 },
  cinnamon: { src: MAGIC_ASSETS.loader.cinnamon, aspect: 698 / 807, baseWDesktop: 230, baseWMobile: 155 },
  cardamom: { src: MAGIC_ASSETS.loader.cardamom, aspect: 751 / 653, baseWDesktop: 210, baseWMobile: 140 },
  starAnise: { src: MAGIC_ASSETS.loader.starAnise, aspect: 873 / 871, baseWDesktop: 230, baseWMobile: 150 },
  seedCluster: { src: MAGIC_ASSETS.loader.seedCluster, aspect: 713 / 699, baseWDesktop: 200, baseWMobile: 135 },
};

/**
 * 16 Large Art-Directed Ingredients on Desktop (1280 - 1440px):
 * Sizes: 170px to 310px.
 * Arranged to densely interlock, covering bottom, center, flanks, corners, and top.
 * Staggered fall entry starting from t = 0.25s up to t = 1.95s.
 *
 * 11 Large Ingredients on Mobile (360 - 390px):
 * Sizes: 130px to 210px.
 */
export function generateLargeSpiceComposition(isMobile: boolean): LargeSpiceItem[] {
  if (isMobile) {
    // 11 Mobile Instances
    const mobileSpecs: Array<{
      key: SpiceAssetKey;
      x: number;
      y: number;
      scale: number;
      rot: number;
      delay: number;
      dur: number;
    }> = [
      // Bottom floor
      { key: 'turmeric', x: 22, y: 88, scale: 1.15, rot: -15, delay: 0.25, dur: 0.58 },
      { key: 'starAnise', x: 78, y: 90, scale: 1.20, rot: 25, delay: 0.40, dur: 0.60 },
      { key: 'chilli', x: 50, y: 82, scale: 1.10, rot: 45, delay: 0.55, dur: 0.62 },
      // Mid floor
      { key: 'cinnamon', x: 18, y: 64, scale: 1.10, rot: -30, delay: 0.70, dur: 0.60 },
      { key: 'seedCluster', x: 82, y: 66, scale: 1.15, rot: 15, delay: 0.85, dur: 0.62 },
      { key: 'cardamom', x: 48, y: 55, scale: 1.10, rot: -10, delay: 1.00, dur: 0.60 },
      // Upper body
      { key: 'chilli', x: 85, y: 38, scale: 1.20, rot: -40, delay: 1.15, dur: 0.62 },
      { key: 'turmeric', x: 20, y: 35, scale: 1.10, rot: 35, delay: 1.30, dur: 0.60 },
      { key: 'starAnise', x: 52, y: 30, scale: 1.15, rot: -20, delay: 1.45, dur: 0.62 },
      // Top ceiling
      { key: 'cinnamon', x: 30, y: 10, scale: 1.10, rot: 20, delay: 1.60, dur: 0.60 },
      { key: 'seedCluster', x: 75, y: 12, scale: 1.15, rot: -15, delay: 1.75, dur: 0.62 },
    ];

    return mobileSpecs.map((s, idx) => {
      const prof = SPICE_PROFILES[s.key];
      const widthPx = Math.round(prof.baseWMobile * s.scale);
      const heightPx = Math.round(widthPx / prof.aspect);
      const startXPercent = s.x + (((idx * 17) % 20) - 10);
      return {
        id: `mobile-spice-${idx}-${s.key}`,
        assetKey: s.key,
        imgSrc: prof.src,
        aspectRatio: prof.aspect,
        widthPx,
        heightPx,
        targetXPercent: s.x,
        targetYPercent: s.y,
        startXPercent,
        targetRotateDeg: s.rot,
        initialRotateDeg: s.rot + (((idx * 29) % 90) - 45),
        fallDelaySec: s.delay,
        fallDurationSec: s.dur,
        zIndex: 10 + idx,
      };
    });
  }

  // 16 Desktop Instances (1280 x 720 / 1440 x 900)
  // Perfectly planned to blanket all 4 corners, center, and edges
  const desktopSpecs: Array<{
    key: SpiceAssetKey;
    x: number;
    y: number;
    scale: number;
    rot: number;
    delay: number;
    dur: number;
  }> = [
    // Bottom ground layer (t = 0.25s - 0.75s)
    { key: 'cinnamon', x: 18, y: 92, scale: 1.25, rot: -22, delay: 0.25, dur: 0.58 },
    { key: 'turmeric', x: 50, y: 90, scale: 1.30, rot: 15, delay: 0.38, dur: 0.60 },
    { key: 'starAnise', x: 84, y: 92, scale: 1.35, rot: 30, delay: 0.50, dur: 0.62 },
    { key: 'chilli', x: 32, y: 84, scale: 1.35, rot: 55, delay: 0.65, dur: 0.60 },

    // Mid-lower layer (t = 0.75s - 1.20s)
    { key: 'seedCluster', x: 72, y: 76, scale: 1.30, rot: -15, delay: 0.78, dur: 0.60 },
    { key: 'cardamom', x: 10, y: 70, scale: 1.25, rot: 40, delay: 0.90, dur: 0.62 },
    { key: 'starAnise', x: 42, y: 68, scale: 1.30, rot: -25, delay: 1.02, dur: 0.60 },
    { key: 'cinnamon', x: 92, y: 65, scale: 1.25, rot: 35, delay: 1.15, dur: 0.62 },

    // Mid-upper layer (t = 1.20s - 1.60s)
    { key: 'turmeric', x: 26, y: 50, scale: 1.30, rot: -35, delay: 1.28, dur: 0.60 },
    { key: 'chilli', x: 62, y: 52, scale: 1.40, rot: -50, delay: 1.38, dur: 0.62 },
    { key: 'seedCluster', x: 85, y: 40, scale: 1.25, rot: 20, delay: 1.48, dur: 0.60 },
    { key: 'cardamom', x: 44, y: 38, scale: 1.25, rot: -15, delay: 1.58, dur: 0.62 },

    // Top & corner ceiling layer (t = 1.60s - 1.95s)
    { key: 'chilli', x: 8, y: 28, scale: 1.40, rot: 65, delay: 1.68, dur: 0.60 },
    { key: 'starAnise', x: 30, y: 15, scale: 1.35, rot: 15, delay: 1.76, dur: 0.62 },
    { key: 'cinnamon', x: 68, y: 18, scale: 1.25, rot: -20, delay: 1.85, dur: 0.60 },
    { key: 'turmeric', x: 92, y: 12, scale: 1.30, rot: 25, delay: 1.95, dur: 0.62 },
  ];

  return desktopSpecs.map((s, idx) => {
    const prof = SPICE_PROFILES[s.key];
    const widthPx = Math.round(prof.baseWDesktop * s.scale);
    const heightPx = Math.round(widthPx / prof.aspect);
    const startXPercent = s.x + (((idx * 19) % 24) - 12);
    return {
      id: `desktop-spice-${idx}-${s.key}`,
      assetKey: s.key,
      imgSrc: prof.src,
      aspectRatio: prof.aspect,
      widthPx,
      heightPx,
      targetXPercent: s.x,
      targetYPercent: s.y,
      startXPercent,
      targetRotateDeg: s.rot,
      initialRotateDeg: s.rot + (((idx * 31) % 90) - 45),
      fallDelaySec: s.delay,
      fallDurationSec: s.dur,
      zIndex: 10 + idx,
    };
  });
}
