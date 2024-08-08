import * as z from 'zod'

export const sikSorulanSorularSchema = z.object({
  id: z.number().optional(),
  soruAdi: z.string().min(2, {
    message: "Soru adı en az 2 karakter olmalıdır.",
  }),
  durumu: z.boolean(),
  icerik: z.string().min(10, {
    message: "İçerik en az 10 karakter olmalıdır.",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type SikSorulanSorular = z.infer<typeof sikSorulanSorularSchema>