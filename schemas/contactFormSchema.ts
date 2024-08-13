import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "İsim alanı boş bırakılamaz" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır" }),
  status: z.boolean().default(false), // false = Okunmadı, true = Okundu
});

export type ContactFormData = z.infer<typeof contactFormSchema>;