"use client"

import React from 'react'
import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CaretUpDown, Pencil, Trash } from "@phosphor-icons/react"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from "@/components/ui/skeleton"
import { SocialMedia } from '@/schemas/socialSchemas'
import { getSocialMedia } from '@/actions/social.actions'

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-[40px]" />
          <Skeleton className="h-12 w-[200px]" />
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-12 w-[100px]" />
        </div>
      ))}
    </div>
  )
}

function SocialMediaList() {
  const { data: socialMedia, isLoading, error } = useQuery<SocialMedia[]>({
    queryKey: ['socialMedia'],
    queryFn: () => {
      return getSocialMedia();
    }
  })

  const columns: ColumnDef<SocialMedia>[] = [
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
      accessorKey: "icon",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          İKON
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "social_link",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          SOSYAL MEDYA LİNKİ
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "İŞLEMLER",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/admin/sosyal-medya-yonetimi/duzenle/${row.original.id}`} passHref>
            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Pencil className="h-4 w-4 mr-1" />
              Düzenle
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
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
          <h1 className="text-2xl font-bold">Sosyal Medya Yönetimi</h1>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable 
            columns={columns} 
            data={socialMedia || []} 
            searchColumn="social_link"
            searchPlaceholder="Sosyal medya linki ara..."
            columnTitles={{
              icon: "İkon",
              social_link: "Sosyal Medya Linki",
              actions: "İşlemler"
            }}
            noDataMessage="Veri yok"
          />
        )}
      </div>
    </div>
  )
}

export default SocialMediaList