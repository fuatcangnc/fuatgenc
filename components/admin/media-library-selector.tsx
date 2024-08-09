"use client"

import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { MediaLibraryModal } from '@/components/admin/media-library-modal'
import Image from 'next/image'
import { MediaFile } from '@/schemas/mediaLibrarySchema'

interface MediaLibrarySelectorProps {
  selectedImage: string | null
  onImageSelect: (image: string) => void
  onImageRemove: () => void
}

export const MediaLibrarySelector: React.FC<MediaLibrarySelectorProps> = ({
  selectedImage,
  onImageSelect,
  onImageRemove
}) => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)

  const handleOpenMediaLibrary = useCallback(() => {
    console.log("Opening media library")
    try {
      setIsMediaLibraryOpen(true)
    } catch (error) {
      console.error("Error opening media library:", error)
      // Hata durumunda kullanıcıya bir bildirim gösterin
    }
  }, [])

  const handleCloseMediaLibrary = useCallback(() => {
    console.log("Closing media library")
    setIsMediaLibraryOpen(false)
  }, [])

  const handleImageSelect = useCallback((image: MediaFile) => {
    console.log("Image selected:", image)
    onImageSelect(image.url)
    setIsMediaLibraryOpen(false)
  }, [onImageSelect])

  return (
    <>
      {selectedImage ? (
        <div className="space-y-2">
          <div className="relative w-full h-40">
            <Image 
              src={selectedImage} 
              alt="Seçilen Görsel" 
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleOpenMediaLibrary}
              className="flex-1"
            >
              Değiştir
            </Button>
            <Button 
              variant="outline" 
              onClick={onImageRemove}
              className="flex-1"
            >
              Kaldır
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={handleOpenMediaLibrary}
          className="w-full"
        >
          Medya Kütüphanesinden Görsel Seç
        </Button>
      )}
      <MediaLibraryModal 
        isOpen={isMediaLibraryOpen} 
        onClose={handleCloseMediaLibrary}
        onSelect={handleImageSelect}
      />
    </>
  )
}