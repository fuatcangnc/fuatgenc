import React from 'react'
import CategoryPostCard from './category-post-card'

function PostCardContainer({ posts }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {posts.map((post) => (
        <CategoryPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostCardContainer