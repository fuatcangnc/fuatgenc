"use client"

import React, { useState } from 'react'
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
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Başarılı",
          description: "Dosya başarıyla yüklendi.",
        })
        onSelect(data.file)
        setActiveTab("library")
      } else {
        throw new Error(data.message || 'Dosya yükleme hatası')
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      toast({
        title: "Hata",
        description: "Dosya yüklenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <MediaLibrary onSelect={onSelect} />
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