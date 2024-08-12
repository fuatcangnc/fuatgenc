import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getPages(dir: string, baseUrl: string, urlPrefix: string = ''): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursive call for subdirectories
      entries.push(...getPages(filePath, baseUrl, path.join(urlPrefix, file)))
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      // Check if it's a page file
      if (file === 'page.tsx' || file === 'page.ts' || file === 'page.js') {
        const urlPath = urlPrefix.replace(/\/index$/, '') // Remove 'index' from the end of the path
        entries.push({
          url: `${baseUrl}${urlPath}`,
          lastModified: new Date(stat.mtime).toISOString(),
        })
      }
    }
  }

  return entries
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://fuatgenc.vercel.app'
  const pagesDir = path.join(process.cwd(), 'app')

  const staticPages = getPages(pagesDir, baseUrl)

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...staticPages,
  ]
}