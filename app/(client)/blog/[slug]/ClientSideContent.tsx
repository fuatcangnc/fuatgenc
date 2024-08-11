"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface ClientSideContentProps {
  content: string;
}

export default function ClientSideContent({ content }: ClientSideContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const clean = DOMPurify.sanitize(content);
      contentRef.current.innerHTML = clean;

      // Kod bloklarını işle ve renklendirmeyi uygula
      const codeBlocks = contentRef.current.querySelectorAll('pre.ql-syntax');
      codeBlocks.forEach((block) => {
        if (block instanceof HTMLElement) {
          const codeText = block.textContent || '';
          try {
            const result = hljs.highlightAuto(codeText);
            block.innerHTML = result.value;
            block.classList.add(`language-${result.language}`);
          } catch (error) {
            console.error('Error highlighting code:', error);
          }
        }
      });
    }
  }, [content]);

  return <div ref={contentRef} className="quill-content" />;
}