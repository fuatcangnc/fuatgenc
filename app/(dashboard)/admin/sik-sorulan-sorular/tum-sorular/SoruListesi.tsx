'use client'

import { useState } from 'react'
import { deleteSikSorulanSoru } from '@/actions/faq.actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

type Soru = {
  id: number
  soruAdi: string
  icerik: string
  durumu: boolean
}

export default function SoruListesi({ initialSorular }: { initialSorular: Soru[] }) {
  const [sorular, setSorular] = useState(initialSorular)
  const router = useRouter()

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      const result = await deleteSikSorulanSoru(id)
      if (result.success) {
        setSorular(sorular.filter(soru => soru.id !== id))
        router.refresh()
      } else {
        alert('Soru silinirken bir hata oluştu.')
      }
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Soru</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorular.map((soru) => (
          <TableRow key={soru.id}>
            <TableCell>{soru.soruAdi}</TableCell>
            <TableCell>
              <Switch checked={soru.durumu} disabled />
            </TableCell>
            <TableCell>
              <div className="space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/sik-sorulan-sorular/duzenle/${soru.id}`}>
                    Düzenle
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(soru.id)}>
                  Sil
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}