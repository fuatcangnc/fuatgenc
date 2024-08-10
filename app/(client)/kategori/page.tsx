import Link from 'next/link';
import { getCategories } from '@/actions/category.actions';

export default async function KategoriListesi() {
  const categories = await getCategories();

  return (
    <section className='container max-w-7xl mx-auto my-8'>
      <h1 className='text-3xl font-bold mb-6'>Tüm Kategoriler</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/kategori/${category.slug}`}
            className='p-4 border rounded-lg hover:bg-gray-100 transition-colors'
          >
            <h2 className='text-xl font-semibold'>{category.name}</h2>
            <p className='text-gray-600 mt-2'>Post Sayısı: {category.postCount}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}