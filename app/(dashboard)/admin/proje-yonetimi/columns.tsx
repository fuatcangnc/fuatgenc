import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowDown, Pencil, Trash } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { deleteProject } from "@/actions/project.actions"

export type Project = {
  id: number
  name: string
  status: string
  startDate: string
  endDate: string
  image: string
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proje Adı
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
  },
  {
    accessorKey: "startDate",
    header: "Başlangıç Tarihi",
  },
  {
    accessorKey: "endDate",
    header: "Bitiş Tarihi",
  },
  {
    accessorKey: "image",
    header: "Proje Resmi",
    cell: ({ row }) => (
      <Image src={`/uploads/proje-yonetimi/${row.original.image}`} alt={row.original.name} width={50} height={50} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      return (
        <div className="flex space-x-2">
          <Link href={`/admin/proje-yonetimi/duzenle/${project.id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Düzenle
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={async () => {
              if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
                await deleteProject(project.id)
                window.location.reload()
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Sil
          </Button>
        </div>
      )
    },
  },
]