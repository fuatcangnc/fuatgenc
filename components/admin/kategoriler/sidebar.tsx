"use client"

import React from 'react'
import { List, File, Plus } from "@phosphor-icons/react"
import { useCategories } from '@/hooks/useCategories'
import Link from 'next/link'

function Sidebar() {
  const { data: categories, isLoading, isError } = useCategories()

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="w-[30%] p-4 bg-white">
      
      {categories.map((category) => (
        <div key={category.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer mb-1">
          <File className="mr-2 text-gray-500" size={16} />
          <span>{category.name}</span>
          <span className="ml-auto text-gray-500">({category.postCount || 0})</span>
        </div>
      ))}
    </div>
  )
}

export default Sidebar