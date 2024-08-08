import { z } from 'zod';

export const mediaFileSchema = z.object({
  id: z.number(),
  name: z.string(),
  size: z.number(),
  url: z.string(),
  createdAt: z.date(),
  alternativeText: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const newMediaFileSchema = mediaFileSchema.omit({ id: true, createdAt: true });

export const uploadMediaFileSchema = z.object({
  file: z.instanceof(File),
  alternativeText: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export type MediaFile = z.infer<typeof mediaFileSchema>;
export type NewMediaFile = z.infer<typeof newMediaFileSchema>;
export type UploadMediaFile = z.infer<typeof uploadMediaFileSchema>;