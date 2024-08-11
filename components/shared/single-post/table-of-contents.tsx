import React from 'react';
import Link from 'next/link';
import slugify from 'slugify';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <nav className="table-of-contents mb-6">
      <h2 className="text-xl font-bold mb-3">İçindekiler</h2>
      <ul className="list-none pl-0">
        {items.map((item) => {
          const slug = slugify(item.text, { lower: true, strict: true });
          return (
            <li key={item.id} className={`mb-2 pl-${(item.level - 1) * 4}`}>
              <Link href={`#${slug}`} className="text-blue-600 hover:underline">
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;