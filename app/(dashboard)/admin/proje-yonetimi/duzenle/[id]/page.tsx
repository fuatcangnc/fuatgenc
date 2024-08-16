"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, FormProject } from "@/schemas/projectSchema"
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
import { getProjectById, updateProject } from "@/actions/project.actions"
import { useQuery, useMutation } from '@tanstack/react-query'
import { MediaLibrarySelector } from '@/components/admin/media-library-selector'
import { toast } from "@/components/ui/use-toast"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormProject>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      status: "Aktif",
      startDate: "",
      endDate: "",
      image: null,
    },
  })

  const { data: projectData, isLoading, error } = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => getProjectById(parseInt(params.id)),
  })

  useEffect(() => {
    if (projectData?.success && projectData.data) {
      form.reset({
        name: projectData.data.name,
        status: projectData.data.status as "Aktif" | "Pasif",
        startDate: new Date(projectData.data.startDate).toISOString().split('T')[0],
        endDate: projectData.data.endDate 
          ? new Date(projectData.data.endDate).toISOString().split('T')[0]
          : "",
        image: projectData.data.image,
      })
    }
  }, [projectData, form])

  const updateProjectMutation = useMutation({
    mutationFn: async (data: FormProject) => {
      const response = await updateProject(parseInt(params.id), {
        ...data,
        //@ts-ignore
        startDate: new Date(data.startDate),
        //@ts-ignore
        endDate: data.endDate ? new Date(data.endDate) : null,
      })
      if (!response.success) {
        throw new Error(response.error as string)
      }
      return response.data
    },
    onSuccess: (data) => {
      console.log("Mutation success:", data);
      toast({
        title: "Başarılı",
        description: "Proje başarıyla güncellendi.",
      });
      router.push("/admin/proje-yonetimi");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Hata",
        description: "Proje güncellenirken bir hata oluştu: " + (error as Error).message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: FormProject) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    updateProjectMutation.mutate(data);
  };

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Bir hata oluştu: {(error as Error).message}</div>

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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Proje durumunu seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Pasif">Pasif</SelectItem>
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
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
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
                  <MediaLibrarySelector
                    selectedImage={field.value}
                    onImageSelect={(imageUrl) => form.setValue('image', imageUrl)}
                    onImageRemove={() => form.setValue('image', null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Güncelleniyor..." : "Projeyi Güncelle"}
          </Button>
        </form>
      </Form>
    </div>
  )
}