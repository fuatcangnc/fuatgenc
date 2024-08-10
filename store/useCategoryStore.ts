import { create } from 'zustand'
import slugify from 'slugify'

interface CategoryState {
  name: string
  slug: string
  isEditingSlug: boolean
  tempSlug: string
  seoImage: string | null
  description: string
  isDefault: boolean
  seoTitle: string
  seoDescription: string
  isIndexed: boolean
  setName: (name: string) => void
  setSlug: (slug: string) => void
  setIsEditingSlug: (isEditing: boolean) => void
  setTempSlug: (slug: string) => void
  setSeoImage: (image: string | null) => void
  setDescription: (description: string) => void
  setIsDefault: (isDefault: boolean) => void
  setSeoTitle: (title: string) => void
  setSeoDescription: (description: string) => void
  setIsIndexed: (isIndexed: boolean) => void
  updateSlug: (newSlug: string, isManual: boolean) => void
  resetForm: () => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  name: '',
  slug: '',
  isEditingSlug: false,
  tempSlug: '',
  seoImage: null,
  description: '',
  isDefault: false,
  seoTitle: '',
  seoDescription: '',
  isIndexed: true,
  setName: (name) => set((state) => {
    const newSlug = slugify(name, { lower: true, strict: true })
    return { name, slug: newSlug, tempSlug: newSlug }
  }),
  setSlug: (slug) => set({ slug }),
  setIsEditingSlug: (isEditing) => set({ isEditingSlug: isEditing }),
  setTempSlug: (slug) => set({ tempSlug: slug }),
  setSeoImage: (image) => set({ seoImage: image }),
  setDescription: (description) => set({ description }),
  setIsDefault: (isDefault) => set({ isDefault }),
  setSeoTitle: (title) => set({ seoTitle: title }),
  setSeoDescription: (description) => set({ seoDescription: description }),
  setIsIndexed: (isIndexed) => set({ isIndexed }),
  updateSlug: (newSlug, isManual) => set((state) => ({ 
    slug: isManual ? newSlug : state.slug, 
    tempSlug: newSlug, 
    isEditingSlug: false 
  })),
  resetForm: () => set({
    name: '',
    slug: '',
    isEditingSlug: false,
    tempSlug: '',
    seoImage: null,
    description: '',
    isDefault: false,
    seoTitle: '',
    seoDescription: '',
    isIndexed: true,
  }),
}))