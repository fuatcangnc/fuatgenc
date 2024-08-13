import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import styles from '@/components/shared/post-card/post-card.module.css'

function CategoryPostCard({ post }) {
  const timeAgo = new Date(post.createdAt).toLocaleString()

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden w-full">
      <div className="relative md:w-1/3 min-h-[200px]">
        {post.featuredImage && (
          <Image 
            src={post.featuredImage} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover"
          />
        )}
      </div>
      <div className="flex flex-col md:w-2/3 p-4">
        <CardContent className="p-0 relative">
          {post.categories && post.categories.length > 0 && (
            <Link 
              href={`/kategori/${post.categories[0].slug}`} 
              className={`${styles.categorySpan} text-[11px] font-bold inline-flex items-center`}
            >
              {post.categories[0].name}
            </Link>
          )}
          <Link href={`/${post.slug}`}>
            <h2 className="font-semibold text-[20px] transition-colors cursor-pointer group">
              <span className="bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                {post.title}
              </span>
            </h2>
          </Link>
          <p className="text-gray-600 text-[14px]">{post.excerpt}</p>
        </CardContent>
        <div className="mt-2 text-gray-400 text-xs">
          0 Yorum · {timeAgo}
        </div>
      </div>
    </Card>
  )
}

export default CategoryPostCard