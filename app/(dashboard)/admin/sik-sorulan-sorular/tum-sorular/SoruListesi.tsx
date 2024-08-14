'use client'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CaretUpDown, Pencil, Trash } from "@phosphor-icons/react"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSikSorulanSorular, deleteSikSorulanSoru } from '@/actions/faq.actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/utils/exportUtils'

type Soru = {
  id: number
  soruAdi: string
  icerik: string
  durumu: boolean
  createdAt: string
  updatedAt: string
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-[40px]" />
          <Skeleton className="h-12 w-[200px]" />
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-12 w-[150px]" />
          <Skeleton className="h-12 w-[100px]" />
        </div>
      ))}
    </div>
  )
}

export default function SoruListesi() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: soruData, isLoading, error } = useQuery<{ success: boolean; data: Soru[] }, Error>({
    queryKey: ['sikSorulanSorular'],
    queryFn: async (): Promise<{ success: boolean; data: Soru[] }> => {
      const result = await getSikSorulanSorular()
      if (!result.success) {
        throw new Error(result.error || 'Veri alınamadı')
      }
      return { success: true, data: result.data || [] } // Bu kısımda `data` her zaman tanımlı olacak
    },
  })
  

  const deleteMutation = useMutation({
    mutationFn: deleteSikSorulanSoru,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sikSorulanSorular'] })
    },
  })

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      deleteMutation.mutate(id)
    }
  }

  const columns: ColumnDef<Soru>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Tümünü seç"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Satırı seç"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          ID
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "soruAdi",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          SORU
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          OLUŞTURULMA TARİHİ
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "durumu",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          DURUM
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Switch checked={row.original.durumu} disabled />
      ),
    },
    {
      id: "islemler",
      header: "İŞLEMLER",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/admin/sik-sorulan-sorular/duzenle/${row.original.id}`} passHref>
            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Pencil className="h-4 w-4 mr-1" />
              Düzenle
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleDelete(row.original.id)}>
            <Trash className="h-4 w-4 mr-1" />
            Sil
          </Button>
        </div>
      ),
    },
  ]

  if (error) return <div>Bir hata oluştu: {(error as Error).message}</div>

  return (
    <div className="w-full mx-auto py-10">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Sık Sorulan Sorular</h1>
          <Link href="/admin/sik-sorulan-sorular/yeni-soru-ekle" passHref>
            <Button>Yeni Soru Ekle</Button>
          </Link>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : soruData ? (
          <DataTable 
            columns={columns} 
            data={soruData.data} 
            searchColumn="soruAdi"
            searchPlaceholder="Soru ara..."
            columnTitles={{
              id: "ID",
              soruAdi: "Soru",
              createdAt: "Oluşturulma Tarihi",
              durumu: "Durum",
              islemler: "İşlemler"
            }}
          />
        ) : (
          <div>Veri yüklenemedi.</div>
        )}
      </div>
    </div>
  )
}