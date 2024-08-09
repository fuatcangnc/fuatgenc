"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Sidebar from './sidebar'
import { MediaLibrarySelector } from '@/components/admin/media-library-selector'
import { Edit, Check } from "lucide-react"
import slugify from 'slugify'
import { useCategoryStore } from '@/store/useCategoryStore'
import { createCategory } from '@/actions/category.actions'
import { useRouter } from 'next/navigation'
import { toast } from "@/components/ui/use-toast"

function NewCategory() {
  const router = useRouter()
  const {
    name, slug, isEditingSlug, tempSlug, seoImage, description, isDefault,
    seoTitle, seoDescription, isIndexed,
    setName, setSlug, setIsEditingSlug, setTempSlug, setSeoImage,
    setDescription, setIsDefault, setSeoTitle, setSeoDescription, setIsIndexed,
    updateSlug, resetForm
  } = useCategoryStore()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEditSlug = () => {
    if (isEditingSlug) {
      updateSlug(tempSlug, true)
    }
    setIsEditingSlug(!isEditingSlug)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = slugify(e.target.value, { lower: true, strict: true })
    setTempSlug(newSlug)
  }

  const handleImageSelect = (imageUrl: string) => {
    setSeoImage(imageUrl)
  }

  const handleRemoveImage = () => {
    setSeoImage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const categoryData = {
      name,
      slug,
      description,
      isDefault,
      seoTitle,
      seoDescription,
      seoImage,
      isIndexed
    }
  
    try {
      const result = await createCategory(categoryData)
      if (result.error) {
        if (result.error.includes("duplicate key value")) {
          toast({
            title: "Hata",
            description: "Bu slug zaten kullanılıyor. Lütfen farklı bir kategori adı girin.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Hata",
            description: result.error,
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Başarılı",
          description: "Kategori başarıyla oluşturuldu.",
        })
        resetForm()
        router.push('/admin/kategoriler')
      }
    } catch (error) {
      console.error("Kategori oluşturulurken bir hata oluştu:", error)
      toast({
        title: "Hata",
        description: "Kategori oluşturulurken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex max-w-[70%]">
      <Sidebar/>
      <Card className="flex-1 m-4">
        <CardHeader>
          <CardTitle>Yeni Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">İsim</Label>
                <Input id="name" placeholder="Kategori ismi" value={name} onChange={handleNameChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="permalink" className="dark:text-gray-300">Kalıcı Bağlantı</Label>
                <div className="flex items-center">
                  <Input 
                    id="permalink" 
                    placeholder="kategori-ismi" 
                    value={isEditingSlug ? tempSlug : slug}
                    onChange={handleSlugChange}
                    className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    disabled={!isEditingSlug}
                  />
                  <Button 
                    onClick={handleEditSlug} 
                    className="ml-2"
                    variant="outline"
                  >
                    {isEditingSlug ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea 
                  id="description" 
                  placeholder="Kategori açıklaması" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is-default" 
                  checked={isDefault}
                  onCheckedChange={setIsDefault}
                />
                <Label htmlFor="is-default">Varsayılan mı?</Label>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold">Arama Motoru Optimizasyonu</h3>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-title">SEO Başlığı</Label>
                <Input 
                  id="seo-title" 
                  placeholder="SEO Başlığı" 
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-description">SEO Açıklaması</Label>
                <Textarea 
                  id="seo-description" 
                  placeholder="SEO açıklaması" 
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-image">SEO Görseli</Label>
                <MediaLibrarySelector
                  selectedImage={seoImage}
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleRemoveImage}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="index" 
                  checked={isIndexed}
                  onCheckedChange={setIsIndexed}
                />
                <Label htmlFor="index">İndeksle</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin/kategoriler')}>İptal</Button>
          <Button type="submit" onClick={handleSubmit}>Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NewCategory