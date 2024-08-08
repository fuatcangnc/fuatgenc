'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import QuillMarkdown from 'quilljs-markdown';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const calculateContentScore = (content: string, title: string): number => {
  let score = 50; // Başlangıç skoru

  // Kelime sayısı kontrolü
  const wordCount = content.split(/\s+/).length;
  if (wordCount >= 300) score += 10;
  if (wordCount >= 600) score += 5;
  if (wordCount >= 1000) score += 5;

  // Başlık uzunluğu kontrolü
  if (title.length >= 40 && title.length <= 60) score += 5;

  // Alt başlık sayısı kontrolü
  const subheadingCount = (content.match(/<h[2-6]/g) || []).length;
  if (subheadingCount >= 2) score += 5;
  if (subheadingCount >= 4) score += 5;

  // Paragraf sayısı kontrolü
  const paragraphCount = (content.match(/<p/g) || []).length;
  if (paragraphCount >= 5) score += 5;

  // Görsel sayısı kontrolü
  const imageCount = (content.match(/<img/g) || []).length;
  if (imageCount >= 1) score += 5;
  if (imageCount >= 3) score += 5;

  // Anahtar kelime yoğunluğu kontrolü
  const keywordDensity = calculateKeywordDensity(content, title);
  if (keywordDensity >= 1 && keywordDensity <= 2.5) score += 10;

  return Math.min(100, score); // Maksimum skor 100
};

const calculateKeywordDensity = (content: string, title: string): number => {
  const keyword = title.toLowerCase().split(' ')[0]; // Basit bir yaklaşım: başlığın ilk kelimesini anahtar kelime olarak kabul ediyoruz
  const wordCount = content.split(/\s+/).length;
  const keywordCount = (content.toLowerCase().match(new RegExp(`\\b${keyword}\\b`, 'g')) || []).length;
  return (keywordCount / wordCount) * 100;
};

function ContentGeneratorForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [quill, setQuill] = useState<any>(null);
  const [contentStats, setContentStats] = useState({
    words: 0,
    headings: 0,
    paragraphs: 0,
    images: 0,
  });
  const [contentScore, setContentScore] = useState(50);

  useEffect(() => {
    if (quill) {
      const markdownOptions = {
        // Markdown seçenekleri
      };
      new QuillMarkdown(quill, markdownOptions);
    }
  }, [quill]);

  useEffect(() => {
    if (content) {
      const words = content.split(/\s+/).length;
      const headings = (content.match(/<h[1-6]/g) || []).length;
      const paragraphs = (content.match(/<p/g) || []).length;
      const images = (content.match(/<img/g) || []).length;
      setContentStats({ words, headings, paragraphs, images });

      // İçerik skoru hesaplama
      const score = calculateContentScore(content, title);
      setContentScore(score);
    }
  }, [content, title]);

  const generateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/content-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('İçerik oluşturulamadı');
      }

      const data = await response.json();
      const formattedContent = formatMarkdown(data.content);
      setContent(formattedContent);
    } catch (error) {
      console.error('Hata:', error);
      setContent('İçerik oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const optimizeContent = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/optimize-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title, currentScore: contentScore }),
      });
  
      if (!response.ok) {
        throw new Error('Optimizasyon hatası');
      }
  
      const data = await response.json();
      
      // Optimize edilmiş içeriği ve başlığı doğrudan uygula
      setContent(data.content);
      setTitle(data.title);
  
      // Yeni skoru hesapla
      const newScore = calculateContentScore(data.content, data.title);
      setContentScore(newScore);
  
    } catch (error) {
      console.error('Optimizasyon hatası:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const formatMarkdown = (text: string) => {
    // Başlıkları formatla
    text = text.replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>');
    
    // Paragrafları formatla
    text = text.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    
    // Kalın metinleri formatla
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return text;
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  return (
    <main className="container mx-auto p-4 flex">
      <div className="w-3/4 pr-4">
        <h1 className="text-2xl font-bold mb-4">AI İçerik Oluşturucu</h1>
        <form onSubmit={generateContent} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bir başlık girin"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Oluşturuluyor...' : 'İçerik Oluştur'}
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Oluşturulan İçerik:</h2>
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-96 mb-12"
            ref={(el) => {
              if (el) {
                setQuill(el.getEditor());
              }
            }}
          />
        </div>
      </div>
      <div className="w-1/4 pl-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">İçerik Puanı</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    {contentScore}/100
                  </span>
                </div>
              </div>
              <div className="flex h-2 mb-4 overflow-hidden bg-teal-200 rounded">
                <div 
                  style={{ width: `${contentScore}%` }} 
                  className="flex flex-col justify-center overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap transition duration-500 ease-in-out"
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                Ort ⬇ 74 En Yüksek ⬆ 80
              </div>
            </div>
          </div>
          <button 
            className={`w-full ${isOptimizing ? 'bg-gray-400' : 'bg-yellow-400'} text-white py-2 px-4 rounded mb-4`}
            onClick={optimizeContent}
            disabled={isOptimizing}
          >
            {isOptimizing ? 'Optimize ediliyor...' : '✨ Otomatik Optimize Et'}
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded mb-4 flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            İç bağlantılar ekle
          </button>
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              İçerik Yapısı
              <button className="text-sm text-blue-500">Düzenle</button>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">KELİMELER</p>
                <p className="text-xl">{contentStats.words} <span className="text-green-500 text-sm">↑</span></p>
                <p className="text-xs text-gray-500">3,761-6,625</p>
              </div>
              <div>
                <p className="text-sm font-semibold">BAŞLIKLAR</p>
                <p className="text-xl">{contentStats.headings} <span className="text-green-500 text-sm">↑</span></p>
                <p className="text-xs text-gray-500">42-120</p>
              </div>
              <div>
                <p className="text-sm font-semibold">PARAGRAFLAR</p>
                <p className="text-xl">{contentStats.paragraphs} <span className="text-green-500 text-sm">↑</span></p>
                <p className="text-xs text-gray-500">en az 225</p>
              </div>
              <div>
                <p className="text-sm font-semibold">GÖRSELLER</p>
                <p className="text-xl">{contentStats.images} <span className="text-green-500 text-sm">↑</span></p>
                <p className="text-xs text-gray-500">44-93</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContentGeneratorForm;