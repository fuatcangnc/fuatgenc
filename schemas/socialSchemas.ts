import { z } from 'zod';

export const socialMediaSchema = z.object({
  id: z.number(),
  icon: z.string().min(1, "Icon is required"),
  social_link: z.string().url("Invalid URL").min(1, "Social link is required"),
});

export type SocialMedia = z.infer<typeof socialMediaSchema>;
export type NewSocialMedia = Omit<SocialMedia, 'id'>;