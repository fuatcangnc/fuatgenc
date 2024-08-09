import ContactForm from '@/components/shared/contact/contact-form'
import HomeSidebar from '@/components/shared/home-sidebar'
import FAQAccordion from '@/components/shared/home/faq-accordion'
import React from 'react'

function İletisim() {
  return (
    <section className='container max-w-7xl mx auto mt-8'>
        <div className='flex flex-col lg:flex-row lg:gap-x-16'>
        <div className='lg:w-[70%]'>
        <ContactForm/>

        <FAQAccordion/>

        </div>
            <div className='lg:w-[30%]'>
        <HomeSidebar/>

            </div>
        </div>
    </section>
  )
}

export default İletisim