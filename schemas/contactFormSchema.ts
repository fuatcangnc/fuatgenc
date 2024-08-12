import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "İsim alanı boş bırakılamaz" }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;