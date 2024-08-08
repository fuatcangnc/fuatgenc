import PostCardContainer from '@/components/shared/post-card/post-card-container'
import Breadcrumb from "@/components/shared/breadcrumb";

import React from 'react'
import HomeSidebar from '@/components/shared/home-sidebar';

function Kategori() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Phones", href: "/phones" },
        {
          label: "Tecno Spark 10 Launched With Up To 16GB RAM, 32MP Selfie Camera",
          href: "#",
        },
      ];
  return (
    <section className='container max-w-7xl mx auto`'>
        <div className="category-wrap md:p-8 p-4 border my-8 ">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className='font-bold text-3xl mb-2'>WordPress</h1>
        <p>WordPress eklentileri, güncellemeleri ve yenilikleri bu kategoride sizlerle buluşuyor.</p>
        </div>
        <div className='flex flex-col lg:flex-row lg:gap-x-16'>
        <div className='lg:w-[70%]'>
        <PostCardContainer/>

        </div>
            <div className='lg:w-[30%]'>
        <HomeSidebar/>

            </div>
        </div>
    </section>
  )
}

export default Kategori