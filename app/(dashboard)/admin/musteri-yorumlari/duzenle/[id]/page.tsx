"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { musteriYorumuSchema, MusteriYorumuFormValues } from "@/schemas/musteriFormSchema"
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/actions/testimonial.actions"
import { useToast } from "@/components/ui/use-toast"
import { MusteriYorumu } from "@/lib/schema"
import Image from "next/image"
import { MediaLibraryModal } from "@/components/admin/media-library-modal"
import { ImageIcon, Trash2 } from "lucide-react"

export default function DuzenleMusteriYorumu({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<MusteriYorumuFormValues>({
    resolver: zodResolver(musteriYorumuSchema),
    defaultValues: {
      musteriAdi: "",
      musteriAciklamasi: "",
      musteriResmi: "",
      durum: true,
    },
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await getTestimonialById(parseInt(params.id))
        if (testimonial) {
          form.reset({
            musteriAdi: testimonial.musteriAdi,
            musteriAciklamasi: testimonial.musteriAciklamasi,
            musteriResmi: testimonial.musteriResmi,
            durum: testimonial.durum,
          })
        }
      } catch (error) {
        console.error("Müşteri yorumu yüklenirken hata oluştu:", error)
        toast({
          title: "Hata",
          description: "Müşteri yorumu yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonial()
  }, [params.id, form, toast])

  const onSubmit = async (values: MusteriYorumuFormValues) => {
    try {
      await updateTestimonial(parseInt(params.id), values)
      toast({
        title: "Başarılı",
        description: "Müşteri yorumu başarıyla güncellendi.",
      })
      router.push("/admin/musteri-yorumlari")
    } catch (error) {
      console.error("Müşteri yorumu güncellenirken hata oluştu:", error)
      toast({
        title: "Hata",
        description: "Müşteri yorumu güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Bu müşteri yorumunu silmek istediğinizden emin misiniz?")) {
      try {
        await deleteTestimonial(parseInt(params.id))
        toast({
          title: "Başarılı",
          description: "Müşteri yorumu başarıyla silindi.",
        })
        router.push("/admin/musteri-yorumlari")
      } catch (error) {
        console.error("Müşteri yorumu silinirken hata oluştu:", error)
        toast({
          title: "Hata",
          description: "Müşteri yorumu silinirken bir hata oluştu.",
          variant: "destructive",
        })
      }
    }
  }

  const handleMediaSelect = (mediaUrl: string) => {
    form.setValue("musteriResmi", mediaUrl)
    setIsMediaLibraryOpen(false)
  }

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Müşteri Yorumu Düzenle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="musteriAdi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Müşteri Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Müşteri adını giriniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="musteriAciklamasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Müşteri Açıklaması</FormLabel>
                <FormControl>
                  <Textarea placeholder="Müşteri açıklamasını giriniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="musteriResmi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Müşteri Resmi</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    {field.value && (
                      <div className="relative w-32 h-32">
                        <Image 
                          src={field.value} 
                          alt="Müşteri Resmi" 
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    )}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsMediaLibraryOpen(true)}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" /> Resim Seç
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durum"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Durum</FormLabel>
                  <FormDescription>
                    Müşteri yorumunun durumunu belirleyin
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button type="submit">Güncelle</Button>
            <Button 
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Sil
            </Button>
          </div>
        </form>
      </Form>
      {isMediaLibraryOpen && (
        <MediaLibraryModal
          isOpen={isMediaLibraryOpen}
          onClose={() => setIsMediaLibraryOpen(false)}
          onSelect={handleMediaSelect}
        />
      )}
    </div>
  )
}