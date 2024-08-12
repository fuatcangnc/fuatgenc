import { MetadataRoute } from 'next'
import { getPosts } from '@/actions/posts.actions'

export default async function postSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://fuatgenc.vercel.app'
  const posts = await getPosts()

  return posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
  }))
}