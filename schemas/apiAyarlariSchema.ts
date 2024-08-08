import { z } from 'zod'

export const whatsAppFormSchema = z.object({
  id: z.number().optional(),
  whatsappMessage: z.string().min(1),
  customerMessage: z.string().min(1),
  personelName: z.string().min(1),
  whatsappNumber: z.string().min(1),
  status: z.boolean(),
})

export type WhatsAppFormData = z.infer<typeof whatsAppFormSchema>
export type NewWhatsAppForm = Omit<Required<WhatsAppFormData>, 'id'>
export type WhatsAppForm = Required<WhatsAppFormData>
