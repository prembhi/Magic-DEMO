import { SpiceType } from './SpiceComponents';

export interface FallingSpiceItem {
  id: string;
  type: SpiceType;
  // Final resting position in % of viewport
  targetXPercent: number; // 0 to 100
  targetYPercent: number; // 0 to 100
  
  // Starting horizontal position %
  startXPercent: number;
  
  // Natural physical dimensions in pixels (calibrated to 50px - 140px on desktop)
  widthPx: number;
  heightPx: number;
  
  // Rotation
  targetRotateDeg: number;
  initialRotateDeg: number;
  
  // Progressive fall timing
  fallDelaySec: number;     // 0.25s to 2.15s
  fallDurationSec: number;  // 0.55s to 0.75s
  
  zIndex: number;
}

/**
 * Art-directed spice accumulation layout:
 * - 40 visible ingredient instances on Desktop (1280 - 1440px)
 * - 24 visible ingredient instances on Mobile (360 - 390px)
 *
 * Each item has calibrated dimensions (50-130px visible bounds),
 * progressive staggered entry (starts with 3-4 items, then a continuous cascade),
 * and settles into an organic, interlocking field covering bottom, center, edges, and corners.
 */
export function generateArtDirectedSpiceCascade(isMobile: boolean): FallingSpiceItem[] {
  const items: FallingSpiceItem[] = [];

  const SPICE_TYPES: SpiceType[] = [
    'chilli',
    'turmeric',
    'starAnise',
    'cardamom',
    'cinnamon',
    'clove',
    'corianderCluster',
    'cuminCluster',
    'peppercorns',
    'pulsesHeap',
    'dalSeeds',
    'corianderLeaf',
  ];

  // Specific baseline dimensions per ingredient type (visible bounding box)
  const BASE_DIMENSIONS: Record<SpiceType, { w: number; h: number }> = {
    chilli: { w: isMobile ? 65 : 95, h: isMobile ? 85 : 125 },
    turmeric: { w: isMobile ? 75 : 110, h: isMobile ? 55 : 80 },
    starAnise: { w: isMobile ? 60 : 88, h: isMobile ? 60 : 88 },
    cardamom: { w: isMobile ? 48 : 68, h: isMobile ? 68 : 98 },
    cinnamon: { w: isMobile ? 70 : 105, h: isMobile ? 48 : 70 },
    clove: { w: isMobile ? 40 : 55, h: isMobile ? 60 : 85 },
    corianderCluster: { w: isMobile ? 52 : 75, h: isMobile ? 46 : 66 },
    cuminCluster: { w: isMobile ? 55 : 78, h: isMobile ? 45 : 64 },
    peppercorns: { w: isMobile ? 50 : 72, h: isMobile ? 50 : 72 },
    pulsesHeap: { w: isMobile ? 60 : 85, h: isMobile ? 50 : 70 },
    dalSeeds: { w: isMobile ? 45 : 62, h: isMobile ? 40 : 56 },
    corianderLeaf: { w: isMobile ? 55 : 80, h: isMobile ? 70 : 100 },
  };

  // Structured layout:
  // Layer 1: Bottom Ground Settling (y: 75% to 92%) - 12 items (Desktop), 7 (Mobile)
  // Layer 2: Mid-Lower Floor (y: 50% to 75%) - 11 items (Desktop), 6 (Mobile)
  // Layer 3: Mid-Upper Center & Flanks (y: 28% to 52%) - 10 items (Desktop), 6 (Mobile)
  // Layer 4: Top Cover & Corner Accents (y: 6% to 30%) - 9 items (Desktop), 5 (Mobile)
  // Total: 42 items (Desktop), 24 items (Mobile)
  
  const layers = isMobile
    ? [
        { name: 'bottom', count: 7, minY: 72, maxY: 92, minDelay: 0.25, maxDelay: 0.85 },
        { name: 'midLower', count: 6, minY: 48, maxY: 72, minDelay: 0.65, maxDelay: 1.30 },
        { name: 'midUpper', count: 6, minY: 26, maxY: 50, minDelay: 1.05, maxDelay: 1.68 },
        { name: 'top', count: 5, minY: 6, maxY: 28, minDelay: 1.35, maxDelay: 1.95 },
      ]
    : [
        { name: 'bottom', count: 12, minY: 74, maxY: 94, minDelay: 0.25, maxDelay: 0.90 },
        { name: 'midLower', count: 11, minY: 50, maxY: 74, minDelay: 0.60, maxDelay: 1.35 },
        { name: 'midUpper', count: 10, minY: 28, maxY: 52, minDelay: 1.00, maxDelay: 1.70 },
        { name: 'top', count: 9, minY: 6, maxY: 30, minDelay: 1.30, maxDelay: 2.05 },
      ];

  let itemIdx = 0;

  layers.forEach((layer, layerIdx) => {
    const stepX = 100 / layer.count;

    for (let i = 0; i < layer.count; i++) {
      // Staggered horizontal distribution with edge coverage
      const baseX = (i + 0.5) * stepX;
      const jitterX = ((itemIdx * 23) % 15) - 7; // -7% to +7%
      const targetX = Math.max(3, Math.min(97, baseX + jitterX));

      const yRange = layer.maxY - layer.minY;
      const jitterY = ((itemIdx * 31) % 100) / 100;
      const targetY = layer.minY + jitterY * yRange;

      // Spice selection: round-robin through diverse spices
      const type = SPICE_TYPES[(itemIdx + layerIdx * 3) % SPICE_TYPES.length];
      const baseDim = BASE_DIMENSIONS[type];

      // Subtle scale factor between 0.88 and 1.15 for organic realism
      const scaleVariation = 0.90 + ((itemIdx * 17) % 25) / 100;
      const widthPx = Math.round(baseDim.w * scaleVariation);
      const heightPx = Math.round(baseDim.h * scaleVariation);

      // Trajectory and rotation
      const startXPercent = targetX + (((itemIdx * 19) % 24) - 12);
      const targetRotateDeg = ((itemIdx * 43) % 150) - 75; // -75 to +75 deg
      const initialRotateDeg = targetRotateDeg + (((itemIdx * 37) % 120) - 60);

      // Delay within the layer's time window
      const delayFraction = i / layer.count;
      const fallDelaySec = +(
        layer.minDelay +
        delayFraction * (layer.maxDelay - layer.minDelay) +
        (((itemIdx * 29) % 20) / 100 - 0.1)
      ).toFixed(2);

      // Gravity fall duration
      const fallDurationSec = +(0.58 + ((itemIdx * 13) % 18) / 100).toFixed(2);

      items.push({
        id: `spice-${itemIdx}-${type}`,
        type,
        targetXPercent: +targetX.toFixed(1),
        targetYPercent: +targetY.toFixed(1),
        startXPercent: +startXPercent.toFixed(1),
        widthPx,
        heightPx,
        targetRotateDeg,
        initialRotateDeg,
        fallDelaySec: Math.max(0.2, fallDelaySec),
        fallDurationSec,
        zIndex: 10 + layerIdx * 4 + (itemIdx % 3),
      });

      itemIdx++;
    }
  });

  return items;
}
