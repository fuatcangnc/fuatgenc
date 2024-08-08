import { getGoogleForms, updateGoogleForm, addGoogleForm } from "@/actions/api-ayarlari.actions"
import { Toaster } from "@/components/ui/toaster"
import ClientForm from './client-form'

export default async function GoogleForm() {
  const forms = await getGoogleForms()
  const currentForm = forms.length > 0 ? forms[0] : null

  async function handleSubmit(prevState, formData) {
    'use server'
    
    try {
      if (currentForm) {
        await updateGoogleForm(currentForm.id, formData)
        return { success: true, message: "Form başarıyla güncellendi." }
      } else {
        await addGoogleForm(formData)
        return { success: true, message: "Form başarıyla eklendi." }
      }
    } catch (error) {
      console.error(error)
      return { success: false, message: "İşlem sırasında bir hata oluştu." }
    }
  }

  return (
    <>
      <ClientForm currentForm={currentForm} handleSubmit={handleSubmit} />
      <Toaster />
    </>
  )
}