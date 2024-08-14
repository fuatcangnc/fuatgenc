'use client'

import { useState } from 'react'
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
import { useToast } from "@/components/ui/use-toast"

type Soru = z.infer<typeof sikSorulanSorularSchema>

export default function SoruDuzenleForm({ soru, updateSoru }: { soru: Soru, updateSoru: (id: number, data: Partial<Soru>) => Promise<any> }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<Soru>({
    resolver: zodResolver(sikSorulanSorularSchema),
    defaultValues: soru,
  })

  async function onSubmit(values: Soru) {
    console.log('onSubmit çağrıldı:', values)
    setIsSubmitting(true)
    try {
      const { id, createdAt, updatedAt, ...updateData } = values
      const result = await updateSoru(soru.id, updateData)
      console.log('Güncelleme sonucu:', result)
      if (result.success) {
        toast({
          title: "Başarılı",
          description: "Soru başarıyla güncellendi.",
        })
        router.push('/admin/sik-sorulan-sorular/tum-sorular')
        router.refresh()
      } else {
        toast({
          title: "Hata",
          description: result.error || 'Soru güncellenirken bir hata oluştu.',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Form gönderilirken bir hata oluştu:', error)
      toast({
        title: "Hata",
        description: 'Form gönderilirken bir hata oluştu.',
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submit edildi')
    const isValid = await form.trigger()
    if (isValid) {
      const values = form.getValues()
      await onSubmit(values)
    } else {
      console.log('Form geçersiz')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
        </Button>
      </form>
    </Form>
  )
}