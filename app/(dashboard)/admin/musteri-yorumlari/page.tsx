"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MusteriYorumlariTable } from '@/components/admin/musteri-yorumlari/musteri-yorumlari-table'
import { getTestimonials, deleteTestimonial } from '@/actions/testimonial.actions'
import { MusteriYorumu } from '@/lib/schema'
import { UserPlus, Pencil, Trash2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

export default function MusteriYorumlari() {
  const [testimonials, setTestimonials] = useState<MusteriYorumu[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Müşteri yorumları yüklenirken hata oluştu:', error)
      toast({
        title: "Hata",
        description: "Müşteri yorumları yüklenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu müşteri yorumunu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteTestimonial(id)
        toast({
          title: "Başarılı",
          description: "Müşteri yorumu başarıyla silindi.",
        })
        fetchTestimonials() // Tabloyu güncelle
      } catch (error) {
        console.error('Müşteri yorumu silinirken hata oluştu:', error)
        toast({
          title: "Hata",
          description: "Müşteri yorumu silinirken bir hata oluştu.",
          variant: "destructive",
        })
      }
    }
  }

  const columns = [
    {
      accessorKey: 'musteriAdi',
      header: 'Müşteri Adı',
      cell: ({ row }) => {
        const testimonial = row.original as MusteriYorumu
        return (
          <Link href={`/admin/musteri-yorumlari/duzenle/${testimonial.id}`} className="text-blue-500 hover:underline">
            {testimonial.musteriAdi}
          </Link>
        )
      },
    },
    {
      accessorKey: 'musteriAciklamasi',
      header: 'Açıklama',
      cell: ({ row }) => {
        const aciklama = row.getValue('musteriAciklamasi') as string
        return <div className="max-w-[300px]">{aciklama.length > 20 ? `${aciklama.substring(0, 20)}...` : aciklama}</div>
      },
    },
    {
      accessorKey: 'musteriResmi',
      header: 'Resim',
      cell: ({ row }) => {
        const resimUrl = row.getValue('musteriResmi') as string
        return resimUrl ? (
          <Image src={resimUrl} alt="Müşteri Resmi" width={40} height={40} className="rounded-full object-cover" />
        ) : null
      },
    },
    {
      accessorKey: 'durum',
      header: 'Durum',
      cell: ({ row }) => {
        const durum = row.getValue('durum') as boolean
        return <Switch checked={durum} disabled />
      },
    },
    {
      id: 'actions',
      header: 'İşlemler',
      cell: ({ row }) => {
        const testimonial = row.original as MusteriYorumu
        return (
          <div className="flex space-x-2">
            <Link href={`/admin/musteri-yorumlari/duzenle/${testimonial.id}`} passHref>
              <Button variant="outline" size="sm" className="flex items-center">
                <Pencil className="h-4 w-4 mr-2" />
                Düzenle
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDelete(testimonial.id)}
              className="flex items-center text-red-500 border-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Sil
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Müşteri Yorumları</h1>
        <Link href="/admin/musteri-yorumlari/yeni-musteri-ekle" passHref>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Yeni Müşteri Yorumu Ekle
          </Button>
        </Link>
      </div>
      <MusteriYorumlariTable columns={columns} data={testimonials} isLoading={isLoading} />
    </div>
  )
}