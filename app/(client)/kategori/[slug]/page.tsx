import React from 'react';
import PostCardContainer from '@/components/shared/categories/post-card-container'
import Breadcrumb from "@/components/shared/breadcrumb";
import HomeSidebar from '@/components/shared/home-sidebar';

const API_URL = process.env.SITE_URL;

async function getCategoryBySlug(slug: string) {
  const response = await fetch(`${API_URL}/categories?slug=${slug}&_embed`);
  if (!response.ok) {
    return { category: null, error: 'Failed to fetch category' };
  }
  const categories = await response.json();
  return { category: categories[0] || null, error: null };
}

async function getPostsByCategory(categoryId: number) {
  const response = await fetch(`${API_URL}/posts?categories=${categoryId}&_embed`);
  if (!response.ok) {
    return { posts: [], error: 'Failed to fetch posts' };
  }
  return { posts: await response.json(), error: null };
}

export default async function Kategori({ params }: { params: { slug: string } }) {
  const { category, error: categoryError } = await getCategoryBySlug(params.slug);
  
  if (categoryError || !category) {
    return <div>Kategori bulunamadı.</div>;
  }

  const { posts, error: postsError } = await getPostsByCategory(category.id);

  const breadcrumbItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Kategoriler", href: "/kategori" },
    { label: category.name, href: `/kategori/${category.slug}` },
  ];

  return (
    <section className='container max-w-7xl mx-auto'>
      <div className="category-wrap md:p-8 p-4 border my-8">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className='font-bold text-3xl mb-2'>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      
      <div className='flex flex-col lg:flex-row lg:gap-x-16'>
        <div className='lg:w-[70%]'>
          {postsError ? (
            <div>Postlar yüklenirken bir hata oluştu: {postsError}</div>
          ) : posts.length > 0 ? (
            <PostCardContainer posts={posts} />
          ) : (
            <div>Bu kategoride henüz post bulunmamaktadır.</div>
          )}
        </div>
        <div className='lg:w-[30%]'>
          <HomeSidebar />
        </div>
      </div>
    </section>
  )
}