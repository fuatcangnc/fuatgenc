import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://fuatgenc.vercel.app'
  const currentDate = new Date().toISOString()

  return [
    {
      url: `${baseUrl}/post-sitemap.xml`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/page-sitemap.xml`,
      lastModified: currentDate,
    },
  ]
}