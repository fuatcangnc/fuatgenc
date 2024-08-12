import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function getPages(dir: string): string[] {
  const pagesDir = path.join(process.cwd(), 'app', dir)
  const entries = fs.readdirSync(pagesDir, { withFileTypes: true })
  
  let pages: string[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Klasör adı özel karakterle başlıyorsa (örn. (auth)) veya dinamik route ise ([slug]), atla
      if (entry.name.startsWith('(') || entry.name.startsWith('[')) continue
      
      // Alt klasörleri recursive olarak tara
      const subPages = getPages(path.join(dir, entry.name))
      pages = [...pages, ...subPages]
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      // page.tsx veya page.ts dosyası bulundu, bu bir sayfa demektir
      const pagePath = dir === '(client)' ? '/' : `/${dir.slice('(client)/'.length)}`
      // Eğer sayfa yolu '[' içermiyorsa (dinamik route değilse) ekle
      if (!pagePath.includes('[')) {
        pages.push(pagePath)
      }
    }
  }

  return pages
}

export async function GET() {
  const baseUrl = process.env.SITE_URL
  const pages = getPages('(client)')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}