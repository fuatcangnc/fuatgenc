"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface ClientSideContentProps {
  content: string;
}

let hljs: any;
let hljsStylesLoaded = false;

export default function ClientSideContent({ content }: ClientSideContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (contentRef.current) {
        const clean = DOMPurify.sanitize(content);
        contentRef.current.innerHTML = clean;
  
        if (!hljsStylesLoaded) {
          import('highlight.js/styles/github.css').then(() => {
            hljsStylesLoaded = true;
          });
        }
  
        if (!hljs) {
          import('highlight.js').then((mod) => {
            hljs = mod.default;
            highlightCode();
          });
        } else {
          highlightCode();
        }
      }
    }
  }, [content]);
  

  const highlightCode = () => {
    if (hljs && contentRef.current) {
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
  };

  return <div ref={contentRef} className="quill-content" />;
}