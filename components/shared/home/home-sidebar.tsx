import Image from 'next/image';
import Avatar from './avatar';

export default function HomeSidebar () {
    return (
      <section className='space-y-4'>
        <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Hemen E-Ticaret Sitenizi Açın</h3>
        <div className="flex justify-center mb-4">
          <Image src="/img.webp" alt="E-Ticaret" width={150} height={150} />
        </div>
        <button className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded">
          Mağazanı Oluştur
        </button>
      </div>
      <Avatar
      name="Ayhan KARAMAN"
      imageUrl="/path-to-image.jpg"
      description="Site Destek dijital performans ve reklam ajansı kurucusu. Türkiye'nin en iyi pazarlama blog siteleri listesinde (Power 100) ilk 5 içerisinde yer almakta ve Türkiye'nin en iyi SEO uzmanları arasında ilk 5 içerisinde gösterilmektedir."
    />
      </section>
    );
  };