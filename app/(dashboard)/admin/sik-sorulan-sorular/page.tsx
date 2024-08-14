import SoruListesi from '@/app/(dashboard)/admin/sik-sorulan-sorular/tum-sorular/SoruListesi'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function SikSorulanSorularPage() {
  return (
    <div className="container mx-auto p-4">
      <SoruListesi />
    </div>
  )
}