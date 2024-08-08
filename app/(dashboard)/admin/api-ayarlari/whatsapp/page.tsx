import { getAllWhatsAppForms } from '@/actions/api-ayarlari.actions'
import WhatsAppClientForm from '@/components/admin/api-ayarlari/whatsapp/client-form'
import { Toaster } from "@/components/ui/toaster"

export default async function WhatsAppFormPage() {
  const forms = await getAllWhatsAppForms()
  const latestForm = forms.length > 0 ? forms[forms.length - 1] : null

  return (
    <div>
      <h1>WhatsApp Form</h1>
      <WhatsAppClientForm initialData={latestForm} />
      <Toaster />
    </div>
  )
}