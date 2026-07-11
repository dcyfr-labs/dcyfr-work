import type { MetadataRoute } from 'next';

const BASE_URL = 'https://dcyfr.work';

export default function sitemap(): MetadataRoute.Sitemap {
  // Each real page exactly once — no #fragment URLs, which crawlers ignore.
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/cli`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/extensions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/profiles`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/health`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
