import React from 'react'
import { PostCard } from '../post-card'
import { getPosts } from '@/actions/posts.actions'
import LoadMoreButton from './load-more-button'

const POSTS_PER_PAGE = 4;

async function PostCardContainer() {
  const initialPosts = await getPosts(POSTS_PER_PAGE);

  return (
    <div className="space-y-4">
      {initialPosts.map((post) => (
        <PostCard
          key={post.id}
          imageUrl={post.featuredImage || '/default-image.jpg'}
          category={post.categories || []}
          categorySlug={post.categorySlug || ''}
          title={post.title}
          excerpt={post.excerpt || ''}
          createdAt={post.createdAt}
          slug={post.slug}
        />
      ))}
      <LoadMoreButton initialPostCount={initialPosts.length} />
    </div>
  )
}

export default PostCardContainer