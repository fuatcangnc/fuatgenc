import React from 'react';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, XLogo, PinterestLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/shared/breadcrumb";
import SocialShare from "@/components/shared/single-post/social-share";
import HomeSidebar from '@/components/shared/home-sidebar';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const ClientSideContent = dynamic(() => import('./ClientSideContent'), { ssr: false });
const DisqusComments = dynamic(() => import('@/components/shared/single-post/disqus-comments'), { ssr: false });

const API_URL = process.env.SITE_URL;

async function getPostBySlug(slug: string) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
  if (!response.ok) {
    return null;
  }
  const posts = await response.json();
  return posts[0] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.yoast_head_json?.title || post.title.rendered,
    description: post.yoast_head_json?.description || post.excerpt.rendered,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: post.title.rendered, href: `/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title.rendered,
    "description": post.excerpt.rendered,
    "image": post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    "datePublished": post.date,
    "dateModified": post.modified,
    "author": {
      "@type": "Person",
      "name": post._embedded?.['author']?.[0]?.name || "Yazar"
    }
  };

  const shareUrl = `${process.env.SHARE_URL}/${post.slug}`;
  const shareText = encodeURIComponent(post.title.rendered);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 mt-8">
          <div className="hidden lg:flex flex-col items-center space-y-4 sticky top-4 self-start">
            {/* Sosyal medya paylaşım butonları */}
            {/* ... (mevcut kodunuzdaki gibi) */}
          </div>

          <div className="lg:w-[calc(70%-40px)]">
            <article className="single-post">
              <div className="single-post-meta space-y-3 mb-[32px]">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <time
                  className="text-sm text-gray-500 block"
                  dateTime={post.date}
                >
                  Yayınlanma: {new Date(post.date).toLocaleDateString()}
                </time>
                <SocialShare />
              </div>
              <div className="single-post-content">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    width={800}
                    height={450}
                    className="w-full h-auto mb-6 object-cover"
                    fetchPriority='high'
                  />
                )}
                <ClientSideContent content={post.content.rendered} />
              </div>
              {/* Disqus yorumları */}
              <div className="mt-8">
                <DisqusComments post={{ slug: post.slug || '', title: post.title.rendered || '' }} />
              </div>
              <div className="flex space-x-4 mt-6 lg:hidden">
                {/* Mobil için sosyal medya paylaşım butonları */}
                {/* ... (mevcut kodunuzdaki gibi) */}
              </div>
            </article>
          </div>

          <div className="lg:w-[30%] mt-8 lg:mt-0">
            <div className="sticky top-4">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}