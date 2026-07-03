import type { MetadataRoute } from 'next'

const BASE = 'https://insurancecalculators.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                             lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/auto-insurance`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/home-insurance`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/health-insurance`,       lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/disability`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/renters`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/term-vs-whole`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/deductible`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/privacy`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
