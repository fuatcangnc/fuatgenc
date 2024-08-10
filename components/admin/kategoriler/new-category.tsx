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
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema } from '@/schemas/categorySchema'

function NewCategory() {
  const router = useRouter()
  const {
    name, slug, isEditingSlug, tempSlug, seoImage, description, isDefault,
    seoTitle, seoDescription, isIndexed,
    setName, setSlug, setIsEditingSlug, setTempSlug, setSeoImage,
    setDescription, setIsDefault, setSeoTitle, setSeoDescription, setIsIndexed,
    updateSlug, resetForm
  } = useCategoryStore()

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      isDefault: false,
      seoTitle: '',
      seoDescription: '',
      seoImage: null,
      isIndexed: true
    }
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setValue('name', newName)
    if (!isEditingSlug) {
      const newSlug = slugify(newName, { lower: true, strict: true })
      setSlug(newSlug)
      setTempSlug(newSlug)
      setValue('slug', newSlug)
    }
  }

  const handleEditSlug = () => {
    if (isEditingSlug) {
      updateSlug(tempSlug, true)
      setValue('slug', tempSlug)
    }
    setIsEditingSlug(!isEditingSlug)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = slugify(e.target.value, { lower: true, strict: true })
    setTempSlug(newSlug)
    setValue('slug', newSlug)
  }

  const handleImageSelect = (imageUrl: string) => {
    setSeoImage(imageUrl)
    setValue('seoImage', imageUrl)
  }

  const handleRemoveImage = () => {
    setSeoImage(null)
    setValue('seoImage', null)
  }

  const onSubmit = async (data: any) => {
    try {
      const result = await createCategory(data)
      if (result.error) {
        toast({
          title: "Hata",
          description: result.error,
          variant: "destructive",
        })
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">İsim</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="name" 
                      placeholder="Kategori ismi" 
                      {...field} 
                      onChange={handleNameChange}
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="permalink" className="dark:text-gray-300">Kalıcı Bağlantı</Label>
                <div className="flex items-center">
                  <Controller
                    name="slug"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        id="permalink" 
                        placeholder="kategori-ismi" 
                        {...field}
                        value={isEditingSlug ? tempSlug : field.value}
                        onChange={handleSlugChange}
                        className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        disabled={!isEditingSlug}
                      />
                    )}
                  />
                  <Button 
                    onClick={handleEditSlug} 
                    className="ml-2"
                    variant="outline"
                    type="button"
                  >
                    {isEditingSlug ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Açıklama</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      id="description" 
                      placeholder="Kategori açıklaması" 
                      {...field}
                    />
                  )}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="isDefault"
                  control={control}
                  render={({ field }) => (
                    <Switch 
                      id="is-default" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is-default">Varsayılan mı?</Label>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold">Arama Motoru Optimizasyonu</h3>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-title">SEO Başlığı</Label>
                <Controller
                  name="seoTitle"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="seo-title" 
                      placeholder="SEO Başlığı" 
                      {...field}
                    />
                  )}
                />
                {errors.seoTitle && <p className="text-red-500 text-sm">{errors.seoTitle.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-description">SEO Açıklaması</Label>
                <Controller
                  name="seoDescription"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      id="seo-description" 
                      placeholder="SEO açıklaması" 
                      {...field}
                    />
                  )}
                />
                {errors.seoDescription && <p className="text-red-500 text-sm">{errors.seoDescription.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seo-image">SEO Görseli</Label>
                <Controller
                  name="seoImage"
                  control={control}
                  render={({ field }) => (
                    <MediaLibrarySelector
                      selectedImage={field.value}
                      onImageSelect={handleImageSelect}
                      onImageRemove={handleRemoveImage}
                    />
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="isIndexed"
                  control={control}
                  render={({ field }) => (
                    <Switch 
                      id="index" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="index">İndeksle</Label>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => router.push('/admin/kategoriler')} type="button">İptal</Button>
              <Button type="submit">Kaydet</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewCategory
