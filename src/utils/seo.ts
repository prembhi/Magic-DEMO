/**
 * SEO & Metadata Utility for MAGIC UAE
 * Dynamically synchronizes document title, meta tags, and JSON-LD structured data per route.
 */

interface MetadataConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const PRODUCTION_ORIGIN = 'https://prembhi.github.io';
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export function updatePageMetadata(config: MetadataConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = config.title;

  // 2. Meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', config.description);

  // 3. Canonical URL
  const canonicalUrl = `${PRODUCTION_ORIGIN}${BASE_PATH}${config.canonicalPath || ''}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 4. Open Graph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute('content', config.ogType || 'website');

  if (config.ogImage) {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', config.ogImage);
  }

  // 5. Dynamic Structured Data (JSON-LD)
  const existingScript = document.getElementById('route-structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  if (config.jsonLd) {
    const script = document.createElement('script');
    script.id = 'route-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(config.jsonLd);
    document.head.appendChild(script);
  }
}
