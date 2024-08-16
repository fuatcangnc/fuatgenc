import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(1, "Proje adı gereklidir"),
  status: z.enum(["Aktif", "Pasif"]),
  startDate: z.union([z.string(), z.date()]).transform(val => 
    val instanceof Date ? val.toISOString() : new Date(val).toISOString()
  ),
  endDate: z.union([z.string(), z.date(), z.null()]).transform(val => 
    val instanceof Date ? val.toISOString() : val ? new Date(val).toISOString() : null
  ),
  image: z.string().nullable(),
})

export type ProjectSchema = z.infer<typeof projectSchema>

export type FormProject = {
  name: string;
  status: "Aktif" | "Pasif";
  startDate: string;
  endDate?: string;
  image: string | null;
}