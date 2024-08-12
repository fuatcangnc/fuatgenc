"use client"
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { createContactForm } from '@/actions/contact-form.actions';
import { useFormStatus } from 'react-dom'
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      className="min-h-[50px] bg-[#02CA96] hover:bg-[#02A77A] text-white rounded-none"
      disabled={pending}
    >
      {pending ? 'Mesajınız Gönderiliyor...' : 'İLETİŞİME GEÇ'}
    </Button>
  )
}

function ContactFormContent() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { executeRecaptcha } = useReCaptcha()

  async function handleSubmit(formData: FormData) {
    setFormStatus('idle');
    
    try {
      const token = await executeRecaptcha('contact_form')
      formData.append('recaptchaToken', token);

      const result = await createContactForm(formData);
      if (result.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('reCAPTCHA or form submission error:', error);
      setFormStatus('error');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">İletişim</h1>
      <Card className="border border-[#02CA96] rounded-none p-4">
        <CardContent className="p-4">
          <h2 className="text-center text-xl font-bold text-[#02CA96] mb-2">
            İLETİŞİM KUR
          </h2>
          <p className="text-center text-sm mb-4">
            Sadece 24 Saat İçerisinde Cevap Vereceğimden. Hiç Şüpheniz Olmasın.
          </p>
          <form action={handleSubmit} className="space-y-4 flex flex-col items-center">
            
            <Input
              name="name"
              placeholder="Adınız"
              className="w-full rounded-none"
            />
            <Input
              name="email"
              type="email"
              placeholder="E-posta Adresiniz"
              className="w-full rounded-none"
            />
            <Textarea
              name="message"
              placeholder="Mesajınız"
              className="w-full rounded-none"
            />
            <SubmitButton />
          </form>
          {formStatus === 'success' && (
            <p className="text-green-500 mt-2">Mesajınız başarıyla gönderildi!</p>
          )}
          {formStatus === 'error' && (
            <p className="text-red-500 mt-2">Mesajınız 10 karakterden az olamaz.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ContactForm() {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactFormContent />
    </ReCaptchaProvider>
  )
}