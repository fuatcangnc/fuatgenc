import { NextResponse } from 'next/server'

export const revalidate = 36;

export async function GET() {
  const baseUrl = process.env.SITE_URL
  const currentDate = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/post-sitemap.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/page-sitemap.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/category-sitemap.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
    </sitemapindex>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}