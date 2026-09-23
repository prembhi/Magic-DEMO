export interface ProductEnvironmentData {
  themeColor: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  environmentTitle: string;
  environmentSubtitle: string;
  elements: {
    type: 'botanical-branch' | 'spice-root' | 'harvest-stalk' | 'vessel' | 'spice-burst' | 'leaf-cluster';
    name: string;
    position: 'top-left' | 'top-right' | 'mid-left' | 'mid-right' | 'bottom-left' | 'bottom-right' | 'center-back';
    delay: number;
  }[];
}

export interface MagicProduct {
  id: string;
  slug: string;
  number: string;
  name: string;
  titleDisplay: string;
  ribbonText: 'DAL' | 'WHOLE' | 'POWDER' | 'SEEDS';
  arabicName: string;
  englishSub: string;
  origin: string;
  weight: string;
  weightArabic: string;
  spiceCategory: 'Whole Pulses' | 'Pure Spices' | 'Heritage Lentils';
  culinaryProfile: string;
  pouchColor: string;
  pouchAccent: string;
  windowGrainType: 'red-lentil' | 'green-mung' | 'yellow-turmeric' | 'cumin-seed' | 'yellow-toor' | 'black-urad';
  image: string;
  environment: ProductEnvironmentData;
}
