import { NextResponse } from 'next/server'
import { getCategories } from '@/actions/category.actions'

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'https://fuatgenc.vercel.app'
  
  try {
    const categories = await getCategories()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${categories.map(category => `
          <url>
            <loc>${baseUrl}/kategori/${category.slug}</loc>
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
  } catch (error) {
    console.error('Error generating category sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}