import { MetadataRoute } from 'next'
import { getPropertyIds } from '@/lib/properties'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://utepassvacationrentals.com'
  
  const propertyUrls = getPropertyIds().map((id) => ({
    url: `${baseUrl}/vacation-rentals/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/vacation-rentals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/property-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...propertyUrls,
  ]
}

