// components/shared/Accordion.tsx

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion() {
  const faqItems: FAQItem[] = [
    {
      question: "Ayhan KARAMAN Kimdir?",
      answer: "Site Destek dijital performans ajansı kurucusudur. Aynı zamanda Türkiye'nin en iyi pazarlama blog siteleri listesinde (Power 100) ilk 5 içerisinde yer alan ayhankaraman.com web sitesinin sahibidir. Bulunduğu sektörü büyütmek için gece gündüz çalışan genç (39 yaşında) :) bir girişimcidir."
    },
    {
      question: "Ne Tür İçerikler Üretirsiniz?",
      answer: "Bu sorunun cevabı buraya gelecek."
    },
    {
      question: "SEO ile İlgilenenlere Neler Söylemek İstersiniz?",
      answer: "Bu sorunun cevabı buraya gelecek."
    },
    {
      question: "Bireysel Olarak mı Çalışıyorsunuz?",
      answer: "Bu sorunun cevabı buraya gelecek."
    },
    {
      question: "İçeriklerinizi Siz mi Üretiyorsunuz?",
      answer: "Bu sorunun cevabı buraya gelecek."
    }
  ];

  return (
    <div className='border p-8'>
        <h3 className='font-bold mb-4 text-lg'>Sık Sorulan Sorular</h3>
        <Accordion type="single" collapsible className="w-full">
      {faqItems.map(function(item, index) {
        return (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="before:content-[''] before:block before:w-1  before:bg-red-500 before:absolute before:left-0">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
    </div>
  );
}

export default FAQAccordion;