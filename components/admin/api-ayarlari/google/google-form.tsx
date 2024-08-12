import { getGoogleForms, updateGoogleForm, addGoogleForm } from "@/actions/api-ayarlari.actions"
import ClientForm from './client-form'
import { googleFormSchema, GoogleFormData } from "@/schemas/apiAyarlariSchema"

interface FormState {
  message: string | null;
  success: boolean | null;
  errors: Partial<Record<keyof GoogleFormData, string[]>>;
}

export default async function GoogleForm() {
  const forms = await getGoogleForms()
  const currentForm = forms.length > 0 ? forms[0] : null

  async function handleSubmit(prevState: FormState, formData: FormData): Promise<FormState> {
    'use server'
    
    const data = {
      googleVerificationCode: formData.get("googleVerificationCode") as string,
      googleAnalyticsCode: formData.get("googleAnalyticsCode") as string,
      captchaSiteKey: formData.get("captchaSiteKey") as string,
      microsoftClarityCode: formData.get("microsoftClarityCode") as string,
    }

    const validationResult = googleFormSchema.safeParse(data)

    if (!validationResult.success) {
      return { 
        success: false, 
        message: "Formda hatalar var. Lütfen kontrol edin.", 
        errors: validationResult.error.flatten().fieldErrors 
      }
    }

    try {
      let result: FormState;
      if (forms.length > 0) {
        await updateGoogleForm(forms[0].id, formData)
        result = { success: true, message: "Form başarıyla güncellendi.", errors: {} }
      } else {
        await addGoogleForm(formData)
        result = { success: true, message: "Form başarıyla eklendi.", errors: {} }
      }
      console.log("Server-side result:", result); // Bu satırı ekleyin
      return result;
    } catch (error) {
      console.error(error)
      return { success: false, message: "İşlem sırasında bir hata oluştu.", errors: {} }
    }
  }

  return <ClientForm currentForm={currentForm} handleSubmit={handleSubmit} />
}