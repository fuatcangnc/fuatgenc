import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function ContactForm() {
  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">İletişim</h1>
      <p className="mb-4 text-sm">
        Günümüzde en çok kullanılan 2 iletişim kanalından biri telefon diğeri ise WhatsApp :) Bana ulaşmak için 0553 080 5798 numaralı telefon numarasını ya da aşağıda paylaştığım iletişim araçlarını kullanabilirsiniz.
      </p>
      <Card className="border border-[#02CA96] rounded-none p-4">
        <CardContent className="p-4">
          <h2 className="text-center text-xl font-bold text-[#02CA96] mb-2">
              İLETİŞİM KUR
          </h2>
          <p className="text-center text-sm mb-4">
            Sadece 24 Saat İçerisinde Cevap Vereceğimden Hiç Şüpheniz Olmasın :)
          </p>
          <form className="space-y-4 flex flex-col items-center">
            <Input placeholder="Ad Soyad" className="w-full rounded-none" />
            <Input placeholder="0(5**) *** ** **" className="w-full rounded-none" />
            <Button type="submit" className="min-h-[50px] bg-[#02CA96] hover:bg-[#02A77A] text-white rounded-none">
              HEMEN BAŞVUR
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactForm