"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { YeniYaziForm } from '@/components/admin/blog-yonetimi/yeni-yazi-form'
import { PostSettingsSidebar } from '@/components/admin/blog-yonetimi/post-settings-sidebar'
import { getPostById, updatePost, deletePost } from '@/actions/posts.actions'
import { useToast } from "@/components/ui/use-toast"
import { usePostStore } from '@/store/usePostStore'

export default function DuzenleYazi() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const { id } = useParams()
  const { 
    title, setTitle, 
    content, setContent, 
    slug, setSlug,
    excerpt, setExcerpt,
    featuredImage, setFeaturedImage,
    isFeatured, setIsFeatured,
    metaTitle, setMetaTitle,
    metaDescription, setMetaDescription
  } = usePostStore()

  useEffect(() => {
    const loadPost = async () => {
      if (typeof id === 'string') {
        try {
          const fetchedPost = await getPostById(parseInt(id))
          if (fetchedPost) {
            setTitle(fetchedPost.title)
            setContent(fetchedPost.content || '')
            setSlug(fetchedPost.slug)
            setExcerpt(fetchedPost.excerpt || '')
            setFeaturedImage(fetchedPost.featuredImage)
            setIsFeatured(fetchedPost.isFeatured)
            setMetaTitle(fetchedPost.metaTitle || '')
            setMetaDescription(fetchedPost.metaDescription || '')
          } else {
            toast({
              title: "Hata",
              description: "Gönderi bulunamadı.",
              variant: "destructive",
            })
            router.push('/admin/blog-yonetimi')
          }
        } catch (error) {
          console.error('Gönderi yüklenirken hata:', error)
          toast({
            title: "Hata",
            description: "Gönderi yüklenirken bir hata oluştu.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadPost()
  }, [id, setTitle, setContent, setSlug, setExcerpt, setFeaturedImage, setIsFeatured, setMetaTitle, setMetaDescription, toast, router])

  const handlePublish = async () => {
    setIsUpdating(true)
    try {
      const postData = {
        title,
        content,
        slug,
        excerpt,
        featuredImage,
        isFeatured,
        metaTitle,
        metaDescription,
      }
      const updatedPost = await updatePost(parseInt(id as string), postData)
      if (updatedPost) {
        setSlug(updatedPost.slug)
        toast({
          title: "Gönderi güncellendi",
          description: "Gönderi başarıyla güncellendi.",
        })
        router.push('/admin/blog-yonetimi')
      }
    } catch (error) {
      console.error('Gönderi güncelleme hatası:', error)
      toast({
        title: "Hata",
        description: "Gönderi güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Bu gönderiyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      setIsDeleting(true)
      try {
        await deletePost(parseInt(id as string))
        toast({
          title: "Gönderi silindi",
          description: "Gönderi başarıyla silindi.",
        })
        router.push('/admin/blog-yonetimi')
      } catch (error) {
        console.error('Gönderi silme hatası:', error)
        toast({
          title: "Hata",
          description: "Gönderi silinirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Yazı Düzenle</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-grow md:w-2/3">
          <YeniYaziForm />
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <PostSettingsSidebar
            onPublish={handlePublish}
            onDelete={handleDelete}
            isPublishing={isUpdating}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  )
}