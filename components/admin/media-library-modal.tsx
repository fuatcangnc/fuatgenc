"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaLibrary } from '@/components/admin/media-library'
import { MediaFile } from '@/schemas/mediaLibrarySchema'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface MediaLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (file: MediaFile) => void
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState("library")
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)
      // Simüle edilmiş API çağrısı
      const loadMediaFiles = async () => {
        try {
          // Gerçek uygulamada, burada API'den medya dosyalarını yükleyin
          await new Promise(resolve => setTimeout(resolve, 1000)) // Simüle edilmiş gecikme
          setIsLoading(false)
        } catch (err) {
          console.error("Medya dosyaları yüklenirken hata oluştu:", err)
          setError("Medya dosyaları yüklenirken bir hata oluştu. Lütfen tekrar deneyin.")
          setIsLoading(false)
        }
      }
      loadMediaFiles()
    }
  }, [isOpen])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Gerçek uygulamada, burada dosya yükleme işlemini gerçekleştirin
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simüle edilmiş yükleme
      toast({
        title: "Dosya yüklendi",
        description: `${file.name} başarıyla yüklendi.`,
      })
    } catch (err) {
      console.error("Dosya yüklenirken hata oluştu:", err)
      toast({
        title: "Hata",
        description: "Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading && !isUploading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ortam Kütüphanesi</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="library">Ortam Kütüphanesi</TabsTrigger>
            <TabsTrigger value="upload">Yükle</TabsTrigger>
          </TabsList>
          <TabsContent value="library">
            {isLoading ? (
              <p>Yükleniyor...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <MediaLibrary onSelect={onSelect} />
            )}
          </TabsContent>
          <TabsContent value="upload">
            <div className="space-y-4">
              <Input
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              {isUploading && <p>Yükleniyor...</p>}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}