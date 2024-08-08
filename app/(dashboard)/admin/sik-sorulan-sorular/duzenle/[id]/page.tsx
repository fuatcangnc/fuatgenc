import { getSikSorulanSorular, updateSikSorulanSoru } from '@/actions/faq.actions'
import SoruDuzenleForm from './SoruDuzenleForm'

export default async function DuzenlePage({ params }: { params: { id: string } }) {
  const result = await getSikSorulanSorular()
  
  if (!result.success) {
    return <div>Soru yüklenirken bir hata oluştu: {result.error}</div>
  }

  const soru = result.data.find(s => s.id === parseInt(params.id))

  if (!soru) {
    return <div>Soru bulunamadı</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Soru Düzenle</h1>
      <SoruDuzenleForm soru={soru} updateSoru={updateSikSorulanSoru} />
    </div>
  )
}