'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSocialMedia, updateSocialMedia } from '@/actions/social.actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { socialMediaSchema } from "@/schemas/socialSchemas"
import { toast } from "@/components/ui/use-toast"

export default function EditSocialMediaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const form = useForm({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      icon: "",
      social_link: "",
    },
  })

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const socialMedia = await getSocialMedia();
        const currentSocialMedia = socialMedia.find(sm => sm.id === parseInt(params.id));
        if (currentSocialMedia) {
          form.reset({
            icon: currentSocialMedia.icon,
            social_link: currentSocialMedia.social_link,
          });
        } else {
          toast({
            title: "Hata!",
            description: "Sosyal medya bağlantısı bulunamadı.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Failed to fetch social media:', error);
        toast({
          title: "Hata!",
          description: "Sosyal medya bağlantısı yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, [params.id, form]);

  async function onSubmit(values: any) {
    const formData = new FormData()
    formData.append('icon', values.icon)
    formData.append('social_link', values.social_link)

    try {
      const result = await updateSocialMedia(parseInt(params.id), formData)
      if (result.success) {
        toast({
          title: "Başarılı!",
          description: "Sosyal medya bağlantısı başarıyla güncellendi.",
        })
        router.push('/admin/sosyal-medya-yonetimi')
      } else {
        toast({
          title: "Hata!",
          description: result.error ? JSON.stringify(result.error) : "Beklenmeyen bir hata oluştu.",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Hata!",
        description: "Form gönderilirken bir hata oluştu.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Sosyal Medya Bağlantısını Düzenle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Platform seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Sosyal medya platformunu seçin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bağlantı</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com/profile" {...field} />
                </FormControl>
                <FormDescription>
                  Sosyal medya profilinizin bağlantısını girin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Güncelle</Button>
        </form>
      </Form>
    </div>
  )
}