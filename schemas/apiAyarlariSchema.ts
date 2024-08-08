
import { z } from 'zod'

export const whatsAppFormSchema = z.object({
  id: z.number().optional(),
  whatsappMessage: z.string(),
  customerMessage: z.string(),
  personelName: z.string(),
  whatsappNumber: z.string(),
  status: z.boolean(),
})

export type WhatsAppFormData = z.infer<typeof whatsAppFormSchema>
export type NewWhatsAppForm = Omit<WhatsAppFormData, 'id'>
export type WhatsAppForm = Required<WhatsAppFormData>