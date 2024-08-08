'use client';

import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import QuillMarkdown from 'quilljs-markdown';
import { ReactQuillProps } from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Extend ReactQuillProps to include the onQuillMount prop
interface QuillWrapperProps extends ReactQuillProps {
  onQuillMount?: (editor: any) => void;
}

const QuillWrapper = forwardRef(
  (props: QuillWrapperProps, ref) => {
    // @ts-ignore: 'ReactQuill' refers to a value, but is being used as a type here.
    const [quillRef, setQuillRef] = useState<ReactQuill | null>(null);

    // @ts-ignore: TypeScript may not correctly infer the type for `ref` or `quillRef`
    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef?.getEditor(),
    }));

    return (
      <ReactQuill
        {...props}
        // @ts-ignore: TypeScript might complain about the `ref` assignment here
        ref={(el) => {
          setQuillRef(el);
          if (el && props.onQuillMount) {
            props.onQuillMount(el.getEditor());
          }
        }}
      />
    );
  }
);

QuillWrapper.displayName = 'QuillWrapper';


function calculateContentScore(stats: { words: number; headings: number; paragraphs: number; images: number }) {
  let score = 50;

  if (stats.words > 300) score += 10;
  if (stats.words > 600) score += 10;
  if (stats.words > 1000) score += 10;

  if (stats.headings > 0) score += 5;
  if (stats.headings > 2) score += 5;

  if (stats.paragraphs > 3) score += 5;
  if (stats.paragraphs > 5) score += 5;

  if (stats.images > 0) score += 5;
  if (stats.images > 2) score += 5;

  return Math.min(score, 100);
}

function calculateKeywordDensity(content: string, keyword: string) {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word === keyword.toLowerCase()).length;
  return (keywordCount / words.length) * 100;
}

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
        ignoreTags: ['pre', 'strikethrough'],
        tags: {
          blockquote: {
            pattern: /^(\|){1,6}\s/g,
          },
          bold: {
            pattern: /\*\*(\S[\s\S]*?)\*\*/g,
            result: (text) => `<strong>${text}</strong>`,
          },
          italic: {
            pattern: /__(\S[\s\S]*?)__/g,
            result: (text) => `<em>${text}</em>`,
          },
        },
      };
      new QuillMarkdown(quill, markdownOptions);
    }
  }, [quill]);

  useEffect(() => {
    const text = quill?.getText() || '';
    const words = text.trim().split(/\s+/).length;
    const headings = (content.match(/<h[1-6]>/g) || []).length;
    const paragraphs = (content.match(/<p>/g) || []).length;
    const images = (content.match(/<img/g) || []).length;

    const newStats = { words, headings, paragraphs, images };
    setContentStats(newStats);
    setContentScore(calculateContentScore(newStats));
  }, [content, quill]);

  const generateContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error('İçerik oluşturma hatası:', error);
    }
    setIsLoading(false);
  };

  const optimizeContent = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setContent(data.optimizedContent);
    } catch (error) {
      console.error('İçerik optimizasyon hatası:', error);
    }
    setIsOptimizing(false);
  };

  const formatMarkdown = async () => {
    if (quill) {
      const markdownContent = await fetch('/api/markdownToHtml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: quill.getText() }),
      }).then(res => res.json());

      quill.setText('');
      quill.clipboard.dangerouslyPasteHTML(markdownContent.html);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  return (
    <main className="container mx-auto p-4 flex">
      <div className="w-2/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">İçerik Oluşturucu</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık girin"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={generateContent}
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          {isLoading ? 'Oluşturuluyor...' : 'İçerik Oluştur'}
        </button>
        <button
          onClick={optimizeContent}
          disabled={isOptimizing}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          {isOptimizing ? 'Optimize Ediliyor...' : 'İçeriği Optimize Et'}
        </button>
        <button
          onClick={formatMarkdown}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Markdown'ı Formatla
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Oluşturulan İçerik:</h2>
          <QuillWrapper
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-96 mb-12"
            onQuillMount={(quill) => setQuill(quill)}
          />
        </div>
      </div>
      <div className="w-1/3 pl-4">
        <h2 className="text-xl font-semibold mb-4">İçerik İstatistikleri</h2>
        <ul className="list-disc pl-5">
          <li>Kelime Sayısı: {contentStats.words}</li>
          <li>Başlık Sayısı: {contentStats.headings}</li>
          <li>Paragraf Sayısı: {contentStats.paragraphs}</li>
          <li>Görsel Sayısı: {contentStats.images}</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4 mb-2">İçerik Puanı</h2>
        <div className="bg-gray-200 h-4 rounded-full">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${contentScore}%` }}
          ></div>
        </div>
        <p className="mt-2">{contentScore}/100</p>
      </div>
    </main>
  );
}

export default ContentGeneratorForm;
