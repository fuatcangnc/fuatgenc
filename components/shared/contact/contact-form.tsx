import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { createContactForm } from '@/actions/contact-form.actions';

function ContactForm() {
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
          <form action={createContactForm} className="space-y-4 flex flex-col items-center">
            <Input
              name="name"
              placeholder="Adınız"
              className="w-full rounded-none"
            />
            <Textarea
              name="message"
              placeholder="Mesajınız"
              className="w-full rounded-none"
            />
            <Button type="submit" className="min-h-[50px] bg-[#02CA96] hover:bg-[#02A77A] text-white rounded-none">
              İLETİŞİME GEÇ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactForm