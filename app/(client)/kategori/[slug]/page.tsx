import PostCardContainer from '@/components/shared/categories/post-card-container'
import Breadcrumb from "@/components/shared/breadcrumb";
import HomeSidebar from '@/components/shared/home-sidebar';
import { getCategoryBySlug, getPostsByCategory } from '@/actions/category.actions';

export default async function Kategori({ params }: { params: { slug: string } }) {
  const { category, error: categoryError } = await getCategoryBySlug(params.slug);
  const { posts, error: postsError } = await getPostsByCategory(params.slug);

  if (categoryError || !category) {
    return <div>Kategori bulunamadı.</div>;
  }

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