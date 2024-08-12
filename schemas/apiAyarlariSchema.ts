import { z } from 'zod'

export const googleFormSchema = z.object({
  id: z.number().optional(),
  googleVerificationCode: z.string().optional(),
  googleAnalyticsCode: z.string().optional(),
  captchaSiteKey: z.string().optional(),
  microsoftClarityCode: z.string().optional().refine(
    (val) => !val || val.length === 10,
    {
      message: "Microsoft Clarity Kodu tam olarak 10 karakter uzunluğunda olmalıdır.",
    }
  ),
})

export type GoogleFormData = z.infer<typeof googleFormSchema>
export type NewGoogleForm = Omit<GoogleFormData, 'id'>
export type GoogleForm = Required<GoogleFormData>