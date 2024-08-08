import { GeneralSettingsForm } from '@/components/admin/genel-ayarlar/general-settings'

export default function GenelAyarlarPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Genel Ayarlar</h1>
      <GeneralSettingsForm />
    </div>
  )
}