"use client";

import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import 'highlight.js/styles/github.css';
import TableOfContents from '@/components/shared/single-post/table-of-contents';
import slugify from 'slugify';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ClientSideContentProps {
  content: string;
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && contentRef.current) {
      const clean = DOMPurify.sanitize(content);
      contentRef.current.innerHTML = clean;

      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const items: TOCItem[] = Array.from(headings).map((heading) => {
        const text = heading.textContent || '';
        const slug = slugify(text, { lower: true, strict: true });
        heading.id = slug;
        return {
          id: slug,
          text: text,
          level: parseInt(heading.tagName[1])
        };
      });
      setTocItems(items);

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

  return (
    <>
      <TableOfContents items={tocItems} />
      <div ref={contentRef} className="quill-content" />
    </>
  );
};

export default ClientSideContent;