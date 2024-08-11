"use client";

import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface ClientSideContentProps {
  content: string;
}

export default function ClientSideContent({ content }: ClientSideContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [sanitizedContent, setSanitizedContent] = useState(content);

  useEffect(() => {
    import('dompurify').then((DOMPurify) => {
      setSanitizedContent(DOMPurify.default.sanitize(content));

      if (contentRef.current) {
        const codeBlocks = contentRef.current.querySelectorAll('pre.ql-syntax');
        codeBlocks.forEach((block) => {
          if (block instanceof HTMLElement) {
            const codeText = block.textContent || '';
            try {
              const result = hljs.highlightAuto(codeText);
              block.innerHTML = DOMPurify.default.sanitize(result.value);
              block.classList.add(`language-${result.language}`);
            } catch (error) {
              console.error('Error highlighting code:', error);
            }
          }
        });
      }
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      className="quill-content"
    />
  );
}