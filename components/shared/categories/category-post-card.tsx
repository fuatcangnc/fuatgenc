import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function CategoryPostCard({ post }) {
  return (
    <div className='border rounded-lg overflow-hidden'>
      {post.featuredImage && (
        <Image src={post.featuredImage} alt={post.title} width={400} height={200} className='w-full h-48 object-cover' />
      )}
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className='text-gray-600'>{post.excerpt}</p>
        <div className='mt-4'>
          <Link href={`/${post.slug}`} className='text-blue-600 hover:underline'>
            Devamını Oku
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CategoryPostCard