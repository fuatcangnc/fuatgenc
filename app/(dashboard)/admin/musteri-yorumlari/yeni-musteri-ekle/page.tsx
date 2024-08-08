import React from 'react'
import { YeniMusteriForm } from '@/components/admin/musteri-yorumlari/yeni-musteri-form'

export default function YeniMusteriEkle() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Yeni Müşteri Yorumu Ekle</h1>
      <YeniMusteriForm />
    </div>
  )
}