import * as z from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  isFeatured: z.boolean().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  categories: z.array(z.string()).optional(),
  categorySlug: z.string().optional()
});

export type Post = z.infer<typeof postSchema>;

export const createPostSchema = postSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updatePostSchema = postSchema.partial().omit({ id: true, createdAt: true });