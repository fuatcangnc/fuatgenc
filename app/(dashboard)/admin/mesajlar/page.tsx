"use client"

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FileCsv, FileXls, CaretUpDown, Pencil, Trash, FileArrowDown } from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from '@tanstack/react-query'
import { getContactForms } from '@/actions/contact-form.actions'
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, exportToExcel, exportToCSV } from '@/utils/exportUtils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Mesaj {
  id: number
  name: string
  email: string
  createdAt: string
  status: "Okundu" | "Okunmadı"
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

function Mesajlar() {
    const router = useRouter()
  const { data: veri, isLoading, error } = useQuery<Mesaj[]>({
    queryKey: ['contactForms'],
    queryFn: async () => {
      const response = await getContactForms();
      return response;
    }
  })

  const sutunlar: ColumnDef<Mesaj>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[11px] p-0 header-button"
          >
            ID
            <CaretUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[11px] p-0 header-button"
          >
            İSİM
            <CaretUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[11px] p-0 header-button"
          >
            E-POSTA
            <CaretUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[11px] p-0 header-button"
          >
            OLUŞTURULMA TARİHİ
            <CaretUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-[11px] p-0 header-button"
          >
            DURUM
            <CaretUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${row.original.status === "Okundu" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: "islemler",
      header: "İŞLEMLER",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/admin/mesajlar/duzenle/${row.original.id}`} passHref>
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
          <h1 className="text-2xl font-bold">Mesajlar</h1>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileArrowDown className="mr-2 h-4 w-4" />
                  Dışa Aktar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => veri && exportToExcel(veri)}>
                  <FileXls className="mr-2 h-4 w-4" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => veri && exportToCSV(veri)}>
                  <FileCsv className="mr-2 h-4 w-4" />
                  CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : veri ? (
          <DataTable 
            columns={sutunlar} 
            data={veri} 
            searchColumn="email"
            searchPlaceholder="E-posta ara..."
            columnTitles={{
              id: "ID",
              name: "İsim",
              email: "E-posta",
              createdAt: "Oluşturulma Tarihi",
              status: "Durum",
              islemler: "İşlemler"
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Mesajlar