import { z } from 'zod';

export const mediaFileSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  size: z.number().int().positive(),
  url: z.string().max(255),
  createdAt: z.date(),
  alternativeText: z.string().max(255).optional(),
  title: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
});

export const newMediaFileSchema = mediaFileSchema.omit({ id: true, createdAt: true });

export const uploadMediaFileSchema = z.object({
  file: z.instanceof(File),
  alternativeText: z.string().max(255).optional(),
  title: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
});

export type MediaFile = z.infer<typeof mediaFileSchema>;
export type NewMediaFile = z.infer<typeof newMediaFileSchema>;
export type UploadMediaFile = z.infer<typeof uploadMediaFileSchema>;
