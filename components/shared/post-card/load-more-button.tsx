"use client";

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/actions/posts.actions'
import { PostCard } from '../post-card'

const POSTS_PER_PAGE = 4;

function LoadMoreButton({ initialPostCount }: { initialPostCount: number }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPostCount === POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;
    const newPosts = await getPosts(nextPage * POSTS_PER_PAGE);
    
    // Sadece yeni postları ekleyin
    const actualNewPosts = newPosts.slice(posts.length + initialPostCount);
    
    if (actualNewPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...actualNewPosts]);
      setPage(nextPage);
      setHasMore(newPosts.length === nextPage * POSTS_PER_PAGE);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      {posts.map((post) => (
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
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={loadMorePosts}
            disabled={isLoading || !hasMore}
            className="w-full"
          >
            {isLoading ? 'Yükleniyor...' : 'Daha Fazla Yazı'}
          </Button>
        </div>
      )}
    </>
  )
}

export default LoadMoreButton