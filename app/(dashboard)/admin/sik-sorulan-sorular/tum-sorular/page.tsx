import { getSikSorulanSorular } from '@/actions/faq.actions'
import SoruListesi from './SoruListesi'

export default async function TumSorularPage() {
  const result = await getSikSorulanSorular()

  if (!result.success) {
    return <div>Sorular yüklenirken bir hata oluştu: {result.error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tüm Sık Sorulan Sorular</h1>
      <SoruListesi initialSorular={result.data} />
    </div>
  )
}