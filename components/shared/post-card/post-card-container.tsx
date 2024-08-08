import React from 'react'
import { PostCard } from '../post-card'
import { getPosts } from '@/actions/posts.actions'

async function PostCardContainer() {
  const posts = await getPosts(4); // İlk 4 postu getir

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post?.id}
          imageUrl={post?.featuredImage || '/default-image.jpg'}
          // @ts-ignore: 'category' does not exist on type '{ id?: number; title?: string; ... }'
          category={post?.category || 'Genel'}
          title={post?.title}
          excerpt={post?.excerpt || ''}
          createdAt={post?.createdAt}
          slug={post?.slug}
        />
      ))}
    </div>
  )
}

export default PostCardContainer
