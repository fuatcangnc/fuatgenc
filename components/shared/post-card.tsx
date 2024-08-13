import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import styles from '@/components/shared/post-card/post-card.module.css';

interface PostCardProps {
  imageUrl: string;
  category: string | string[];
  categorySlug: string;
  title: string;
  excerpt: string;
  createdAt: Date;
  slug: string;
  headingLevel?: 'h2' | 'h3';
}

export function PostCard({
  imageUrl,
  category,
  categorySlug,
  title,
  excerpt,
  createdAt,
  slug,
  headingLevel = 'h2',
}: PostCardProps) {
  const timeAgo = new Date(createdAt).toLocaleString();
  const HeadingTag = headingLevel;
  const categoryDisplay = Array.isArray(category) ? category.join(', ') : category;

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden">
      <div className="relative md:w-1/3 min-h-[200px]">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col md:w-2/3 p-4 ">
        <CardContent className="p-0 relative">
          <Link href={`/kategori/${categorySlug}`} className={`${styles.categorySpan} text-[11px] font-bold inline-flex items-center`}>
            {categoryDisplay}
          </Link>
          <Link href={`/${slug}`}>
            <HeadingTag className="font-semibold text-[20px] transition-colors cursor-pointer group">
              <span className="bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                {title}
              </span>
            </HeadingTag>
          </Link>
          <p className="text-gray-600 text-[14px]">{excerpt}</p>
        </CardContent>
        <div className="mt-2 text-gray-400 text-xs">
          0 Yorum · {timeAgo}
        </div>
      </div>
    </Card>
  );
}