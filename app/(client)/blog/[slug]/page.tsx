import { getPostBySlug } from '@/actions/posts.actions';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, XLogo, PinterestLogo, LinkedinLogo, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/shared/breadcrumb";
import SocialShare from "@/components/shared/single-post/social-share";
import HomeSidebar from '@/components/shared/home-sidebar';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const ClientSideContent = dynamic(() => import('./ClientSideContent'), { ssr: false });
const DisqusComments = dynamic(() => import('@/components/shared/single-post/disqus-comments'), { ssr: false });

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
    { label: "Ana Sayfa", href: "/" },
    { label: post.title, href: `/${post.slug}` },
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
      "name": "Shana"
    }
  };

  const shareUrl = `${process.env.SITE_URL}/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

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
            
            <span className="text-xs font-semibold text-gray-600 mb-2">
              Paylaş
            </span>
            <div className="w-full h-px bg-gray-300"></div>

            <Link 
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center"
              title="Facebook'ta Paylaş"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                <FacebookLogo weight="fill" className="w-6 h-6 text-blue-600" />
              </div>
            </Link>
            <Link 
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center"
              title="X'te Paylaş"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                <XLogo className="w-6 h-6 text-black" />
              </div>
            </Link>
            <Link 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center"
              title="LinkedIn'de Paylaş"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                <LinkedinLogo weight="fill" className="w-6 h-6 text-[#0077B5]" />
              </div>
            </Link>
            <Link 
              href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${post.featuredImage}&description=${shareText}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center"
              title="Pinterest'te Paylaş"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                <PinterestLogo weight="fill" className="w-6 h-6 text-red-600" />
              </div>
            </Link>
          </div>

          <div className="lg:w-[calc(70%-40px)]">
            <article className="single-post">
              <div className="single-post-meta space-y-3 mb-[32px]">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-gray-600">{post.excerpt}</p>
                <time
                  className="text-sm text-gray-500 block"
                  dateTime={post.publishedAt?.toString()}
                >
                  Yayınlanma: {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                <SocialShare />
              </div>
              <div className="single-post-content">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-auto mb-6 object-cover"
                  fetchPriority='high'
                />
                <ClientSideContent content={post.content} />
              </div>
              {/* Disqus yorumları */}
              <div className="mt-8">
                <DisqusComments post={{ slug: post.slug || '', title: post.title || '' }} />
              </div>
              <div className="flex space-x-4 mt-6 lg:hidden">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  title="Facebook'ta Paylaş"
                >
                  <FacebookLogo weight="fill" className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-sm font-semibold">Paylaş</span>
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  title="X'te Paylaş"
                >
                  <XLogo weight="fill" className="w-5 h-5 mr-2 text-black" />
                  <span className="text-sm font-semibold">Paylaş</span>
                </Link>
                <Link
                  href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${post.featuredImage}&description=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  title="Pinterest'te Paylaş"
                >
                  <PinterestLogo weight="fill" className="w-5 h-5 mr-2 text-red-600" />
                  <span className="text-sm font-semibold">Paylaş</span>
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  title="LinkedIn'de Paylaş"
                >
                  <LinkedinLogo weight="fill" className="w-5 h-5 mr-2 text-blue-700" />
                  <span className="text-sm font-semibold">Paylaş</span>
                </Link>
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