import { z } from 'zod';

export const generalSettingsSchema = z.object({
  id: z.number().optional(),
  siteTitle: z.string().min(1, 'Site title is required').max(255, 'Site title must be 255 characters or less'),
  tagline: z.string().max(255, 'Tagline must be 255 characters or less').optional(),
  siteIcon: z.string().max(255, 'Site icon path must be 255 characters or less').optional().nullable(),
});

export type GeneralSettings = z.infer<typeof generalSettingsSchema>;