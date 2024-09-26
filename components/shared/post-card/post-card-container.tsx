import React from 'react'
import { PostCard } from '../post-card'
import LoadMoreButton from './load-more-button'

const POSTS_PER_PAGE = 4;
const API_URL = 'https://api.fuatgenc.com/wp-json/wp/v2';

async function getWordPressPosts(perPage: number, offset: number = 0) {
  const response = await fetch(`${API_URL}/posts?per_page=${perPage}&offset=${offset}&_embed`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

async function PostCardContainer() {
  const initialPosts = await getWordPressPosts(POSTS_PER_PAGE);

  return (
    <div className="space-y-4">
      {initialPosts.map((post) => (
        <PostCard
          key={post.id}
          imageUrl={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
          category={post._embedded?.['wp:term']?.[0]?.map((term) => term.name) || []}
          categorySlug={post._embedded?.['wp:term']?.[0]?.[0]?.slug || ''}
          title={post.title.rendered}
          excerpt={post.excerpt.rendered}
          createdAt={post.date}
          slug={post.slug}
        />
      ))}
      <LoadMoreButton initialPostCount={initialPosts.length} />
    </div>
  )
}

export default PostCardContainer