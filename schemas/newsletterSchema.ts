import * as z from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .min(5, 'E-posta adresi çok kısa.')
    .max(255, 'E-posta adresi çok uzun.'),
});

export const newsletterUnsubscribeSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .min(5, 'E-posta adresi çok kısa.')
    .max(255, 'E-posta adresi çok uzun.'),
});

export const newsletterSchema = z.object({
  id: z.number().optional(),
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .min(5, 'E-posta adresi çok kısa.')
    .max(255, 'E-posta adresi çok uzun.'),
  isSubscribed: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type NewsletterSubscribe = z.infer<typeof newsletterSubscribeSchema>;
export type NewsletterUnsubscribe = z.infer<typeof newsletterUnsubscribeSchema>;
export type Newsletter = z.infer<typeof newsletterSchema>;