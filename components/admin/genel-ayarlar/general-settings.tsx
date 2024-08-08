"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MediaLibraryModal } from '@/components/admin/media-library-modal'
import { MediaFile } from '@/schemas/mediaLibrarySchema'
import { GeneralSettings } from '@/schemas/generalSettingsSchema'
import { getGeneralSettings, createGeneralSettings, updateGeneralSettings } from '@/actions/general-settings.actions'
import { useToast } from "@/components/ui/use-toast"

export const GeneralSettings = () => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const [settings, setSettings] = useState<GeneralSettings>({
    siteTitle: '',
    tagline: '',
    siteIcon: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSettings = async () => {
      const existingSettings = await getGeneralSettings()
      if (existingSettings) {
        setSettings(existingSettings)
      }
    }
    fetchSettings()
  }, [])

  const handleIconSelect = (file: MediaFile) => {
    setSettings(prev => ({ ...prev, siteIcon: file.url }))
    setIsMediaLibraryOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const dataToSend = {
        ...settings,
        siteIcon: settings.siteIcon || null,
      };
      if (settings.id) {
        await updateGeneralSettings(settings.id, dataToSend)
      } else {
        await createGeneralSettings(dataToSend)
      }
      toast({
        title: "Başarılı",
        description: "Genel ayarlar başarıyla kaydedildi.",
      })
    } catch (error) {
      console.error('Ayarları kaydetme hatası:', error)
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="siteTitle">Site Başlığı</Label>
        <Input 
          id="siteTitle" 
          name="siteTitle"
          value={settings.siteTitle}
          onChange={handleInputChange}
          placeholder="Site başlığını girin" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Slogan</Label>
        <Input 
          id="tagline" 
          name="tagline"
          value={settings.tagline || ''}
          onChange={handleInputChange}
          placeholder="Slogan girin" 
        />
        <p className="text-sm text-gray-500">Sitenizi birkaç kelimeyle açıklayın. Örnek: "Sadece başka bir WordPress sitesi."</p>
      </div>

      <div className="space-y-2">
        <Label>Site İkonu</Label>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {settings.siteIcon ? (
              <img src={settings.siteIcon} alt="Site İkonu" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">F</span>
            )}
          </div>
          <div>
            <Button type="button" variant="outline" onClick={() => setIsMediaLibraryOpen(true)}>Site İkonunu Değiştir</Button>
            <Button type="button" variant="link" className="text-red-500" onClick={() => setSettings(prev => ({ ...prev, siteIcon: null }))}>Site İkonunu Kaldır</Button>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-[250px]  text-white flex items-center justify-center">
        {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>

      <MediaLibraryModal 
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleIconSelect}
      />
    </form>
  )
}

export default GeneralSettings