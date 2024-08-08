"use client"

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { MusteriYorumu } from '@/lib/schema'
import { Skeleton } from '@/components/ui/skeleton'

interface MusteriYorumlariTableProps {
  data: MusteriYorumu[] | undefined
  columns: ColumnDef<MusteriYorumu>[]
  isLoading: boolean
}

export function MusteriYorumlariTable({ data, columns, isLoading }: MusteriYorumlariTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  return <DataTable columns={columns} data={data || []} searchColumn="musteriAdi" />
}