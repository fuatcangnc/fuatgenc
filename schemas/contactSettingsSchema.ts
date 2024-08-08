import { z } from 'zod';

export const contactSettingsSchema = z.object({
  id: z.number().optional(),
  address: z.string().min(1, 'Adres gereklidir'),
  city: z.string().min(1, 'İl gereklidir'),
  district: z.string().min(1, 'İlçe gereklidir'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  fax: z.string().optional(),
  phone: z.string().min(1, 'Telefon numarası gereklidir'),
});

export type ContactSettings = z.infer<typeof contactSettingsSchema>;