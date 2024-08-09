import { create } from 'zustand'
import slugify from 'slugify'

interface PostState {
  title: string
  content: string
  slug: string
  excerpt: string
  featuredImage: string | null
  isFeatured: boolean
  metaTitle: string
  metaDescription: string
  categoryIds: number[]
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setSlug: (slug: string) => void
  setExcerpt: (excerpt: string) => void
  setFeaturedImage: (featuredImage: string | null) => void
  setIsFeatured: (isFeatured: boolean) => void
  setMetaTitle: (metaTitle: string) => void
  setMetaDescription: (metaDescription: string) => void
  setCategoryIds: (categoryIds: number[]) => void
  resetPost: () => void
}

export const usePostStore = create<PostState>((set) => ({
  title: '',
  content: '',
  slug: '',
  excerpt: '',
  featuredImage: null,
  isFeatured: false,
  metaTitle: '',
  metaDescription: '',
  categoryIds: [],
  setTitle: (title) => set((state) => {
    const newSlug = slugify(title, { lower: true, strict: true })
    return { title, slug: newSlug }
  }),
  setContent: (content) => set({ content }),
  setSlug: (slug) => set({ slug }),
  setExcerpt: (excerpt) => set({ excerpt }),
  setFeaturedImage: (featuredImage) => set({ featuredImage }),
  setIsFeatured: (isFeatured) => set({ isFeatured }),
  setMetaTitle: (metaTitle) => set({ metaTitle }),
  setMetaDescription: (metaDescription) => set({ metaDescription }),
  setCategoryIds: (categoryIds) => set({ categoryIds }),
  resetPost: () => set({
    title: '',
    content: '',
    slug: '',
    excerpt: '',
    featuredImage: null,
    isFeatured: false,
    metaTitle: '',
    metaDescription: '',
    categoryIds: [],
  }),
}))