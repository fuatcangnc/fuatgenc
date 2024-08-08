"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { YeniYaziForm } from '@/components/admin/blog-yonetimi/yeni-yazi-form'
import { PostSettingsSidebar } from '@/components/admin/blog-yonetimi/post-settings-sidebar'
import { createPost } from '@/actions/posts.actions'
import { useToast } from "@/components/ui/use-toast"
import { usePostStore } from '@/store/usePostStore'

export default function YeniYaziEkle() {
  const [isPublishing, setIsPublishing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { 
    title, 
    content, 
    slug, 
    excerpt, 
    featuredImage, 
    isFeatured, 
    metaTitle, 
    metaDescription,
    resetPost 
  } = usePostStore()

  useEffect(() => {
    // Component mount olduğunda post verilerini sıfırla
    resetPost()
  }, [resetPost])

  const handlePublish = async () => {
    if (!slug) {
      toast({
        title: "Hata",
        description: "Slug boş olamaz. Lütfen bir başlık girin veya slug'ı manuel olarak ayarlayın.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
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
        publishedAt: new Date(), // Yayınlama anını şu an olarak ayarla
      }
      const newPost = await createPost(postData)
      if (newPost) {
        toast({
          title: "Gönderi oluşturuldu",
          description: "Gönderi başarıyla oluşturuldu ve yayınlandı.",
        })
        router.push('/admin/blog-yonetimi')
      }
    } catch (error) {
      console.error('Gönderi oluşturma hatası:', error)
      toast({
        title: "Hata",
        description: "Gönderi oluşturulurken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Yeni Yazı Ekle</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-grow md:w-2/3">
          <YeniYaziForm />
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <PostSettingsSidebar
            onPublish={handlePublish}
            isPublishing={isPublishing}
            isNewPost={true}
          />
        </div>
      </div>
    </div>
  )
}