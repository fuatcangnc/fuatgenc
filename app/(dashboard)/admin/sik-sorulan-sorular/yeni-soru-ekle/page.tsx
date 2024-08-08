'use client'

import { createSikSorulanSoru } from '@/actions/faq.actions'
import { sikSorulanSorularSchema } from '@/schemas/faqSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useRouter } from 'next/navigation'

export default function YeniSoruEkle() {
  const router = useRouter()
  const form = useForm<z.infer<typeof sikSorulanSorularSchema>>({
    resolver: zodResolver(sikSorulanSorularSchema),
    defaultValues: {
      soruAdi: "",
      icerik: "",
      durumu: true,
    },
  })

  async function onSubmit(values: z.infer<typeof sikSorulanSorularSchema>) {
    try {
      const result = await createSikSorulanSoru(values)
      if (result.success) {
        router.push('/admin/sik-sorulan-sorular/tum-sorular')
        router.refresh()
      } else {
        console.error('Soru eklenirken bir hata oluştu:', result.error)
        // Hata mesajını kullanıcıya göstermek için bir state kullanabilirsiniz
      }
    } catch (error) {
      console.error('Form gönderilirken bir hata oluştu:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yeni Sık Sorulan Soru Ekle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="soruAdi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soru</FormLabel>
                <FormControl>
                  <Input placeholder="Soruyu girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icerik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İçerik</FormLabel>
                <FormControl>
                  <Textarea placeholder="Cevabı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durumu"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Aktif</FormLabel>
                  <FormDescription>
                    Bu soru aktif olarak gösterilsin mi?
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
          <Button type="submit">Soru Ekle</Button>
        </form>
      </Form>
    </div>
  )
}