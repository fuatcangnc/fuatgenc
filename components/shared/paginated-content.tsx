// components/shared/PaginatedContent.tsx
"use client"

import React, { useState } from 'react';
import PaginationComponent from './pagination';
import HomeCard from './home/home-card';

interface HomeCardData {
  title: string;
  description: string;
  category: string;
  imagePath: string;
  bgColor: string;
}

interface PaginatedContentProps {
  items: HomeCardData[];
  itemsPerPage: number;
}

const PaginatedContent: React.FC<PaginatedContentProps> = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {displayedItems.map((item, index) => (
        <HomeCard
          key={index}
          title={item.title}
          description={item.description}
          category={item.category}
          imagePath={item.imagePath}
          bgColor={item.bgColor}
        />
      ))}
      <PaginationComponent 
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default PaginatedContent;