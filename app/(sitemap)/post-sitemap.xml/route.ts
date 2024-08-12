import { NextResponse } from 'next/server'
import { getPosts } from '@/actions/posts.actions'

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'https://fuatgenc.vercel.app'
  
  try {
    const posts = await getPosts()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts.map(post => `
          <url>
            <loc>${baseUrl}/blog/${post.slug}</loc>
            <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
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
    console.error('Error generating post sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}