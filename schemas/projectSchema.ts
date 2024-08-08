import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(1, "Proje adı gereklidir"),
  status: z.string().min(1, "Durum gereklidir"),
  startDate: z.string().min(1, "Başlangıç tarihi gereklidir"),
  endDate: z.string().optional(),
  image: z.union([z.string(), z.instanceof(File)]).refine((val) => val !== "", "Proje resmi gereklidir"),
})

export type Project = z.infer<typeof projectSchema>