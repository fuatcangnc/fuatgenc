import { getSikSorulanSorular } from '@/actions/faq.actions'
import SoruListesi from '@/components/admin/sik-sorulan-sorular/soru-listesi'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SikSorulanSorularPage() {

  const result = await getSikSorulanSorular()

  if (!result.success) {
    return <div>Sorular yüklenirken bir hata oluştu: {result.error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <SoruListesi />
    </div>
  )
}