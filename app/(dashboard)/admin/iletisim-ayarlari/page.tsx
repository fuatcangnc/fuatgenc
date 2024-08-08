"use client"

import React from 'react'
import { ContactSettings } from '@/components/admin/iletisim-ayarlari/contact-settings'
import { useMediaLibrary } from '@/hooks/useMediaLibrary'
import { MediaLibraryModal } from '@/components/admin/media-library-modal'

export default function IletisimAyarlari() {
  const {
    isMediaLibraryOpen,
    selectedFile,
    openMediaLibrary,
    closeMediaLibrary,
    handleFileSelect,
  } = useMediaLibrary()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">İletişim Ayarları</h1>
      
      <ContactSettings />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Medya Kütüphanesi</h2>
        <button onClick={openMediaLibrary} className="bg-blue-500 text-white px-4 py-2 rounded">
          Medya Kütüphanesini Aç
        </button>
        
        {selectedFile && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Seçilen Dosya:</h3>
            <p>İsim: {selectedFile.name}</p>
            <p>URL: {selectedFile.url}</p>
            <img src={selectedFile.url} alt={selectedFile.name} className="max-w-xs mt-2" />
          </div>
        )}
      </div>

      <MediaLibraryModal
        isOpen={isMediaLibraryOpen}
        onClose={closeMediaLibrary}
        onSelect={handleFileSelect}
      />
    </div>
  )
}