'use client'

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

type Soru = z.infer<typeof sikSorulanSorularSchema>

export default function SoruDuzenleForm({ soru, updateSoru }: { soru: Soru, updateSoru: (id: number, data: Partial<Soru>) => Promise<any> }) {
  const router = useRouter()
  const form = useForm<Soru>({
    resolver: zodResolver(sikSorulanSorularSchema),
    defaultValues: soru,
  })

  async function onSubmit(values: Soru) {
    try {
      const result = await updateSoru(soru.id, values)
      if (result.success) {
        router.push('/admin/sik-sorulan-sorular/tum-sorular')
        router.refresh()
      } else {
        console.error('Soru güncellenirken bir hata oluştu:', result.error)
      }
    } catch (error) {
      console.error('Form gönderilirken bir hata oluştu:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="soruAdi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soru</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
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
        <Button type="submit">Güncelle</Button>
      </form>
    </Form>
  )
}