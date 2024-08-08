import * as z from "zod";

export const musteriYorumuSchema = z.object({
  musteriAdi: z.string().min(2, "Müşteri adı en az 2 karakter olmalıdır."),
  musteriAciklamasi: z.string().min(2, "Açıklama en az 10 karakter olmalıdır."),
  musteriResmi: z.string().optional(),
  durum: z.boolean().default(true),
});

export type MusteriYorumuFormValues = z.infer<typeof musteriYorumuSchema>;