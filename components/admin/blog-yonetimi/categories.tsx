"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/actions/category.actions'
import { usePostStore } from '@/store/usePostStore'

interface Category {
  id: number;
  name: string;
  slug: string;
  checked: boolean;
  postCount: number;
}

interface CategoriesProps {
  onCategoriesChange: (selectedCategories: number[]) => void;
  initialSelectedCategories?: number[];
}

export function Categories({ onCategoriesChange, initialSelectedCategories = [] }: CategoriesProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const { categoryIds, setCategoryIds } = usePostStore()

  const { data: categories, isLoading, error } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const handleCategoryChange = useCallback((id: number) => {
    const newCategoryIds = categoryIds.includes(id)
      ? categoryIds.filter(catId => catId !== id)
      : [...categoryIds, id];
    setCategoryIds(newCategoryIds);
    onCategoriesChange(newCategoryIds);
  }, [categoryIds, setCategoryIds, onCategoriesChange]);

  useEffect(() => {
    if (categories && initialSelectedCategories.length === 0 && categoryIds.length === 0) {
      const defaultCategories = categories.filter(cat => cat.checked).map(cat => cat.id);
      if (defaultCategories.length > 0) {
        setCategoryIds(defaultCategories);
        onCategoriesChange(defaultCategories);
      }
    }
  }, [categories, initialSelectedCategories, categoryIds, setCategoryIds, onCategoriesChange]);

  if (isLoading) return <div>Kategoriler yükleniyor...</div>
  if (error) return <div>Hata: {error.message}</div>
  if (!categories || categories.length === 0) return <div>Kategori bulunamadı.</div>

  return (
    <div>
      <Label className="text-base font-semibold dark:text-gray-300">Kategoriler</Label>
      <div className="mt-2 space-y-2">
        {categories.slice(0, showAllCategories ? categories.length : 3).map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={categoryIds.includes(category.id)}
              onCheckedChange={() => handleCategoryChange(category.id)}
              className="shadow-sm"
            />
            <label
              htmlFor={`category-${category.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
            >
              {category.name}
            </label>
          </div>
        ))}
        {!showAllCategories && categories.length > 3 && (
          <Button
            variant="link"
            onClick={() => setShowAllCategories(true)}
            className="mt-2 p-0 h-auto text-sm text-blue-500 dark:text-blue-400"
          >
            Daha fazla göster...
          </Button>
        )}
      </div>
    </div>
  )
}