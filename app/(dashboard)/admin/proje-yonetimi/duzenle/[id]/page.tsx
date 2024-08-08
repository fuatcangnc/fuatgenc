"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectFormSchema, ProjectFormData } from "@/schemas/projectSchema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { getProjectById, updateProject } from "@/actions/project.actions"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<ProjectFormData | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      status: "",
      startDate: "",
      endDate: "",
      image: "",
    },
  })

  useEffect(() => {
    const fetchProject = async () => {
      const result = await getProjectById(parseInt(params.id))
      if (result.success && result.data) {
        const formattedProject: ProjectFormData = {
          name: result.data.name,
          status: result.data.status,
          startDate: result.data.startDate instanceof Date 
            ? result.data.startDate.toISOString().split('T')[0] 
            : result.data.startDate,
          endDate: result.data.endDate instanceof Date 
            ? result.data.endDate.toISOString().split('T')[0] 
            : result.data.endDate,
          image: result.data.image,
        }
        setProject(formattedProject)
        form.reset(formattedProject)
        if (result.data.image) {
          setImagePreview(`/uploads/proje-yonetimi/${result.data.image}`)
        }
      } else {
        console.error(result.error)
      }
    }
    fetchProject()
  }, [params.id, form])

  const onSubmit = async (data: ProjectFormData) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof File) {
        formData.append(key, data[key] as File)
      } else {
        formData.append(key, data[key]?.toString() || "")
      }
    })

    const result = await updateProject(parseInt(params.id), formData)
    if (result.success) {
      router.push("/admin/proje-yonetimi")
    } else {
      console.error(result.error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file, { shouldValidate: true })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Proje Düzenle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proje Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Proje adını girin" {...field} />
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
                      <SelectValue placeholder="Proje durumunu seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Planlama">Planlama</SelectItem>
                    <SelectItem value="Devam Ediyor">Devam Ediyor</SelectItem>
                    <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
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
                  <Input type="file" onChange={handleImageChange} />
                </FormControl>
                {imagePreview && (
                  <Image src={imagePreview} alt="Preview" width={100} height={100} />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Projeyi Güncelle</Button>
        </form>
      </Form>
    </div>
  )
}