"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import 'highlight.js/styles/github.css'; // Veya tercih ettiğiniz stil

interface ClientSideContentProps {
  content: string;
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && contentRef.current) {
      const clean = DOMPurify.sanitize(content);
      contentRef.current.innerHTML = clean;

      import('highlight.js')
        .then((hljs) => {
          const codeBlocks = contentRef.current?.querySelectorAll('pre.ql-syntax');
          codeBlocks?.forEach((block) => {
            if (block instanceof HTMLElement) {
              try {
                hljs.default.highlightElement(block);
              } catch (error) {
                console.error("Error highlighting code block:", error);
                block.classList.add('no-highlight');
              }
            }
          });
        })
        .catch(error => console.error("Error loading highlight.js:", error));
    }
  }, [content]);

  return <div ref={contentRef} className="quill-content" />;
};

export default ClientSideContent;