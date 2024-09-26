"use client";

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PostCard } from '../post-card'

const POSTS_PER_PAGE = 4;
const API_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function getWordPressPosts(perPage: number, offset: number = 0) {
  const response = await fetch(`${API_URL}/posts?per_page=${perPage}&offset=${offset}&_embed`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

function LoadMoreButton({ initialPostCount }: { initialPostCount: number }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPostCount === POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const offset = page * POSTS_PER_PAGE;
    try {
      const newPosts = await getWordPressPosts(POSTS_PER_PAGE, offset);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(newPosts.length === POSTS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {posts.map((post) => (
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