"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPosts, deletePost } from '@/actions/posts.actions'
import { Post } from '@/schemas/postsSchema'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export function PostListing() {
  const [posts, setPosts] = useState<Post[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Yazılar yüklenirken hata:', error)
      toast({
        title: "Hata",
        description: "Yazılar yüklenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      try {
        await deletePost(id)
        toast({
          title: "Başarılı",
          description: "Yazı başarıyla silindi.",
        })
        fetchPosts()
      } catch (error) {
        console.error('Yazı silinirken hata:', error)
        toast({
          title: "Hata",
          description: "Yazı silinirken bir hata oluştu.",
          variant: "destructive",
        })
      }
    }
  }

  const columns: ColumnDef<Post>[] = [
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
          aria-label="Satır seç"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "BAŞLIK",
      cell: ({ row }) => {
        const post = row.original
        return (
          <Link href={`/admin/blog-yonetimi/duzenle/${post.id}`} className="text-blue-500 hover:underline">
            {post.title}
          </Link>
        )
      },
    },
    {
      accessorKey: "slug",
      header: "SLUG",
    },
    {
      accessorKey: "publishedAt",
      header: "DURUM",
      cell: ({ row }) => {
        return row.getValue("publishedAt") ? "Yayında" : "Taslak"
      },
    },
    {
      accessorKey: "date",
      header: "TARİH",
      cell: ({ row }) => {
        const post = row.original
        return post.publishedAt 
          ? `Yayınlandı ${new Date(post.publishedAt).toLocaleString('tr-TR')}`
          : `Son Düzenleme ${new Date(post.updatedAt).toLocaleString('tr-TR')}`
      },
    },
    {
      id: "actions",
      header: "İŞLEMLER",
      cell: ({ row }) => {
        const post = row.original
        return (
          <div className="space-x-2">
            <Link href={`/admin/blog-yonetimi/duzenle/${post.id}`} passHref>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" /> Düzenle
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDelete(post.id)}
              className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Sil
            </Button>
          </div>
        )
      },
    },
  ]

  const columnTitles = {
    select: "Seç",
    title: "Başlık",
    slug: "Slug",
    publishedAt: "Durum",
    date: "Tarih",
    actions: "İşlemler"
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yazılar</h1>
        <Link href="/admin/blog-yonetimi/yeni-yazi-ekle" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Yazı Ekle
          </Button>
        </Link>
      </div>
      <DataTable 
        columns={columns} 
        data={posts} 
        searchColumn="title"
        searchPlaceholder="Yazılarda ara..."
        columnTitles={columnTitles}
      />
    </div>
  )
}