'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { whatsAppFormSchema, WhatsAppFormData, NewWhatsAppForm } from '@/schemas/whatsappSchema'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createWhatsAppForm, updateWhatsAppForm } from '@/actions/api-ayarlari.actions'
import { useToast } from "@/components/ui/use-toast"
import { WhatsAppForm } from '@/lib/schema'

interface WhatsAppClientFormProps {
  initialData: WhatsAppForm | null
}

export default function WhatsAppClientForm({ initialData }: WhatsAppClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<WhatsAppFormData>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: initialData || {
      whatsappMessage: '',
      customerMessage: '',
      personelName: '',
      whatsappNumber: '',
      status: true,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  async function onSubmit(values: WhatsAppFormData) {
    setIsSubmitting(true)
    try {
      console.log("Submitting form with values:", values);
      const result = values.id 
        ? await updateWhatsAppForm(values) 
        : await createWhatsAppForm({
            whatsappMessage: values.whatsappMessage,
            customerMessage: values.customerMessage,
            personelName: values.personelName,
            whatsappNumber: values.whatsappNumber,
            status: values.status
          } as NewWhatsAppForm);
      console.log("Form submission result:", result);
      toast({
        title: "Başarılı!",
        description: `Form başarıyla ${values.id ? 'güncellendi' : 'oluşturuldu'}.`,
      })
      if (!values.id) {
        form.reset(result)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Hata!",
        description: "Form kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="whatsappMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Mesajı</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Müşteriye gönderilecek WhatsApp mesajı.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Müşteri Mesajı</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Müşteriden beklenen cevap.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personel Adı</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Numarası</FormLabel>
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Aktif
                </FormLabel>
                <FormDescription>
                  Bu formun aktif olup olmadığını belirler.
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
          {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </form>
    </Form>
  )
}
