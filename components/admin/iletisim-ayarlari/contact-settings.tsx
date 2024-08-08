"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ContactSettings as ContactSettingsType } from '@/schemas/contactSettingsSchema'
import { getContactSettings, createContactSettings, updateContactSettings } from '@/actions/contact-settings.actions'

export const ContactSettings: React.FC = () => {
  const [settings, setSettings] = useState<ContactSettingsType>({
    address: '',
    city: '',
    district: '',
    email: '',
    fax: '',
    phone: '',
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchSettings = async () => {
      const existingSettings = await getContactSettings()
      if (existingSettings) {
        setSettings(existingSettings)
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (settings.id) {
        await updateContactSettings(settings.id, settings)
      } else {
        await createContactSettings(settings)
      }
      toast({
        title: "Başarılı",
        description: "İletişim ayarları güncellendi.",
      })
    } catch (error) {
      console.error('Ayarları kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="address">Adres</Label>
        <Input
          id="address"
          name="address"
          value={settings.address}
          onChange={handleInputChange}
          placeholder="Adres giriniz"
        />
      </div>
      <div>
        <Label htmlFor="city">İl</Label>
        <Input
          id="city"
          name="city"
          value={settings.city}
          onChange={handleInputChange}
          placeholder="İl giriniz"
        />
      </div>
      <div>
        <Label htmlFor="district">İlçe</Label>
        <Input
          id="district"
          name="district"
          value={settings.district}
          onChange={handleInputChange}
          placeholder="İlçe giriniz"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={settings.email}
          onChange={handleInputChange}
          placeholder="Email giriniz"
        />
      </div>
      <div>
        <Label htmlFor="fax">Fax</Label>
        <Input
          id="fax"
          name="fax"
          value={settings.fax}
          onChange={handleInputChange}
          placeholder="Fax numarası giriniz"
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          name="phone"
          value={settings.phone}
          onChange={handleInputChange}
          placeholder="Telefon numarası giriniz"
        />
      </div>
      <Button type="submit">Güncelle</Button>
    </form>
  )
}

export default ContactSettings