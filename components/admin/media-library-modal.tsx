"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaLibrary } from '@/components/admin/media-library'
import { MediaFile } from '@/schemas/mediaLibrarySchema'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { getFiles, uploadFile } from '@/actions/media.actions'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setError(null)
      fetchMediaFiles()
    }
  }, [isOpen])

  const fetchMediaFiles = async () => {
    try {
      const files = await getFiles()
      setMediaFiles(files)
      setIsLoading(false)
    } catch (err) {
      console.error("Medya dosyaları yüklenirken hata oluştu:", err)
      setError("Medya dosyaları yüklenirken bir hata oluştu. Lütfen tekrar deneyin.")
      setIsLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return
  
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('alternativeText', '')
      formData.append('title', '')
      formData.append('description', '')
  
      const uploadedFile = await uploadFile(formData)
      setMediaFiles(prev => [...prev, uploadedFile])
      toast({
        title: "Dosya yüklendi",
        description: `${selectedFile.name} başarıyla yüklendi.`,
      })
      setActiveTab("library")
      setSelectedFile(null)
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
              <MediaLibrary onSelect={onSelect} mediaFiles={mediaFiles} />
            )}
          </TabsContent>
          <TabsContent value="upload">
            <div className="space-y-4">
              <Input
                type="file"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
              {selectedFile && (
                <p>Seçilen dosya: {selectedFile.name}</p>
              )}
              <Button
                onClick={handleFileUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  "Dosyayı Yükle"
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}