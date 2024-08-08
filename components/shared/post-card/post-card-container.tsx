// components/shared/post-card/post-card-container.tsx
import React from 'react'
import { PostCard } from '../post-card'
import { getPosts } from '@/actions/posts.actions'

async function PostCardContainer() {
  const posts = await getPosts(4); // İlk 4 postu getir

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          imageUrl={post.featuredImage || '/default-image.jpg'}
          category={post.category || 'Genel'}
          title={post.title}
          excerpt={post.excerpt || ''}
          createdAt={post.createdAt}
          slug={post.slug}
        />
      ))}
    </div>
  )
}

export default PostCardContainer