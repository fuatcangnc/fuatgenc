"use client"

import { createProject } from "@/actions/project.actions"
import { projectSchema } from "@/schemas/projectSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function YeniProjePage() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      status: "active",
      startDate: "",
      endDate: "",
      image: undefined,
    },
  })

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key] instanceof File) {
        formData.append(key, data[key])
      } else if (data[key] !== undefined) {
        formData.append(key, data[key].toString())
      }
    })

    const result = await createProject(formData)
    if (result.success) {
      router.push("/admin/proje-yonetimi")
    } else {
      // Hata yönetimi
      console.error(result.error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Yeni Proje Ekle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proje Adı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durum</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="passive">Pasif</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlangıç Tarihi</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bitiş Tarihi</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proje Resmi</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      handleImageChange(e)
                      field.onChange(e.target.files?.[0])
                    }}
                  />
                </FormControl>
                {imagePreview && (
                  <Image src={imagePreview} alt="Proje Resmi Önizleme" width={200} height={200} />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Proje Ekle</Button>
        </form>
      </Form>
    </div>
  )
}