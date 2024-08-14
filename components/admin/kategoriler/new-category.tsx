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
import { createCategory } from '@/actions/category.actions'
import { useRouter } from 'next/navigation'
import { toast } from "@/components/ui/use-toast"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema, CategorySchema } from '@/schemas/categorySchema'
import { Skeleton } from "@/components/ui/skeleton" // Yeni import

function NewCategory() {
  const router = useRouter()
  const [isEditingSlug, setIsEditingSlug] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true) // Yeni state

  const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<CategorySchema>({
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

  const name = watch('name')
  const slug = watch('slug')

  React.useEffect(() => {
    // Simüle edilmiş yükleme süresi
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (!isEditingSlug && name) {
      setValue('slug', slugify(name, { lower: true, strict: true }))
    }
  }, [name, isEditingSlug, setValue])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value)
  }

  const handleEditSlug = () => {
    setIsEditingSlug(!isEditingSlug)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('slug', slugify(e.target.value, { lower: true, strict: true }))
  }

  const handleImageSelect = (imageUrl: string) => {
    setValue('seoImage', imageUrl)
  }

  const handleRemoveImage = () => {
    setValue('seoImage', null)
  }

  const onSubmit = async (data: CategorySchema) => {
    try {
      const result = await createCategory({
        ...data,
        description: data.description || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoImage: data.seoImage || null
      })
      if ('error' in result) {
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
        reset()
        setIsEditingSlug(false)
        router.refresh()
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

  if (isLoading) {
    return (
      <div className="flex max-w-[70%]">
        <Sidebar />
        <Card className="flex-1 m-4">
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(10)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
                <Label htmlFor="seoTitle">SEO Başlığı</Label>
                <Controller
                  name="seoTitle"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="seoTitle" 
                      placeholder="SEO Başlığı" 
                      {...field}
                    />
                  )}
                />
                {errors.seoTitle && <p className="text-red-500 text-sm">{errors.seoTitle.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seoDescription">SEO Açıklaması</Label>
                <Controller
                  name="seoDescription"
                  control={control}
                  render={({ field }) => (
                    <Textarea 
                      id="seoDescription" 
                      placeholder="SEO açıklaması" 
                      {...field}
                    />
                  )}
                />
                {errors.seoDescription && <p className="text-red-500 text-sm">{errors.seoDescription.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="seoImage">SEO Görseli</Label>
                <Controller
                  name="seoImage"
                  control={control}
                  render={({ field }) => (
                    <MediaLibrarySelector
                      selectedImage={field.value}
                      onImageSelect={(imageUrl) => {
                        field.onChange(imageUrl)
                        handleImageSelect(imageUrl)
                      }}
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