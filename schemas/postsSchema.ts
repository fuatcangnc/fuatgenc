import { z } from 'zod';

export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Başlık gereklidir"),
  slug: z.string().min(1, "Slug gereklidir").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Geçerli bir slug giriniz"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().nullable(),
  isFeatured: z.boolean().default(false),
  publishedAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  metaTitle: z.string().max(255, "Meta başlık 255 karakterden uzun olamaz").optional(),
  metaDescription: z.string().max(160, "Meta açıklama 160 karakterden uzun olamaz").optional(),
});

export type Post = z.infer<typeof postSchema>;

export const createPostSchema = postSchema.omit({ id: true, createdAt: true, updatedAt: true });


export const updatePostSchema = postSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });