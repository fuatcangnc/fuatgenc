"use client"

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, deleteProject } from '@/actions/project.actions'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CaretUpDown, Pencil, Trash } from "@phosphor-icons/react"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export type Project = {
    id: number
    name: string
    status: string
    startDate: string | Date
    endDate: string | Date | null
    image: string | null
  }

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

export default function ProjectsList() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const result = await getProjects()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({
        title: "Başarılı",
        description: "Proje başarıyla silindi.",
      })
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Proje silinirken bir hata oluştu.",
        variant: "destructive",
      })
      console.error(error)
    },
  })

  const handleDelete = (id: number) => {
    if (window.confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      deleteProjectMutation.mutate(id)
    }
  }

  const columns: ColumnDef<Project>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          PROJE ADI
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <Link href={`/admin/proje-yonetimi/duzenle/${row.original.id}`}>
            <span className="text-blue-600 hover:underline cursor-pointer">
              {row.getValue("name")}
            </span>
          </Link>
        )
      },
    },
    {
      accessorKey: "status",
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
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Switch
            checked={status === "active"}
            onCheckedChange={() => {}}
            disabled
          />
        )
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          BAŞLANGIÇ TARİHİ
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return new Date(row.getValue("startDate")).toLocaleDateString('tr-TR')
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-[11px] p-0 header-button"
        >
          BİTİŞ TARİHİ
          <CaretUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const endDate = row.getValue("endDate") as string | null
        return endDate ? new Date(endDate).toLocaleDateString('tr-TR') : '-'
      },
    },
    {
      id: "actions",
      header: "İŞLEMLER",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/admin/proje-yonetimi/duzenle/${row.original.id}`} passHref>
            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Pencil className="h-4 w-4 mr-1" />
              Düzenle
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash className="h-4 w-4 mr-1" />
            Sil
          </Button>
        </div>
      ),
    },
  ]

  if (error) {
    return <div>Hata: Projeler yüklenirken bir sorun oluştu. {(error as Error).message}</div>
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Proje Yönetimi</CardTitle>
        <Link href="/admin/proje-yonetimi/yeni-proje">
          <Button>Yeni Proje Ekle</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable 
            columns={columns} 
            data={data || []} 
            searchColumn="name"
            searchPlaceholder="Proje ara..."
            columnTitles={{
              name: "Proje Adı",
              status: "Durum",
              startDate: "Başlangıç Tarihi",
              endDate: "Bitiş Tarihi",
              actions: "İşlemler"
            }}
            noDataMessage="Proje bulunamadı"
          />
        )}
      </CardContent>
    </Card>
  )
}