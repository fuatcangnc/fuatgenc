// app/blog/[slug]/page.tsx
import { getPostBySlug } from '@/actions/posts.actions';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo, FacebookLogo, XLogo,ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/shared/breadcrumb";
import SocialShare from "@/components/shared/single-post/social-share";
import PostFooter from "@/components/shared/footer";
import HomeSidebar from '@/components/shared/home-sidebar';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `#` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": "Shana" // Statik isim "John Doe"
    }
  };
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
            <div className="flex flex-col items-center">
              <Link href="#comments" className="flex flex-col items-center">
                <span className="text-xs font-semibold text-gray-600">Yorum</span>
                <ChatCircleText weight="light" className="w-6 h-6 text-red-600" />
                <div className="bg-red-600 rounded-full w-full px-2 py-0.5 mt-1 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">1</span>
                </div>
              </Link>
            </div>
            <div className="w-full h-px bg-gray-300"></div>
            <span className="text-xs font-semibold text-gray-600 mb-2">
              Paylaş
            </span>
            <Link href="#" className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full  bg-white shadow-md  flex items-center justify-center">
                <WhatsappLogo weight="fill" className="w-6 h-6 text-green-600" />
              </div>
            </Link>
            <Link href="#" className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white shadow-md  flex items-center justify-center">
                <FacebookLogo weight="fill" className="w-6 h-6 text-blue-600" />
              </div>
            </Link>
            <Link href="#" className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full  bg-white shadow-md flex items-center justify-center">
                <XLogo className="w-6 h-6 text-blue-500" />
              </div>
            </Link>
          </div>

          <div className="lg:w-[calc(70%-40px)]">
            <article className="single-post">
              <div className="single-post-meta space-y-3 mb-[32px]">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold">{post?.title}</h1>
                <p className="text-gray-600">{post?.excerpt}</p>
                <time
                  className="text-sm text-gray-500 block"
                  dateTime={post?.publishedAt?.toString()}
                >
                  Published: {new Date(post?.publishedAt).toLocaleString()}
                </time>
                <SocialShare />
              </div>
              <div className="single-post-content">
                <Image
                  src={post?.featuredImage}
                  alt={post?.title}
                  width={800}
                  height={450}
                  className="w-full h-[476px] mb-6 object-cover"
                  fetchPriority='high'
                />
                <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                <div className="flex space-x-4 mt-6 lg:hidden">
                  <Link
                    href="#"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <WhatsappLogo weight="fill" className="w-5 h-5 mr-2 text-green-500" />
                    <span className="text-sm font-semibold">Share</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <FacebookLogo weight="fill" className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-semibold">Share</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <XLogo weight="fill" className="w-5 h-5 mr-2 text-black" />
                    <span className="text-sm font-semibold">Share</span>
                  </Link>
                </div>
              </div>
              <div className="single-post-footer">
                <PostFooter />
              </div>
            </article>
          </div>

          <div className="lg:w-[30%] mt-8 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
            <HomeSidebar/>
          </div>
        </div>
      </div>
    </>
  );
}