import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Kategori ismi gereklidir").max(255, "Kategori ismi 255 karakterden uzun olamaz"),
  slug: z.string().min(1, "Slug gereklidir").max(255, "Slug 255 karakterden uzun olamaz"),
  description: z.string().optional(),
  isDefault: z.boolean().default(false),
  seoTitle: z.string().max(255, "SEO başlığı 255 karakterden uzun olamaz").optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().optional().nullable(),
  isIndexed: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;