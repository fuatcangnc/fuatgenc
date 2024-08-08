"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { ArrowSquareOut,Trash,ArrowClockwise } from "@phosphor-icons/react"
import { getFiles, deleteFile, uploadFile, updateFileMetadata } from '@/actions/media.actions'
import { MediaFile } from '@/schemas/mediaLibrarySchema'

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [editedFile, setEditedFile] = useState<Partial<MediaFile>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [isUploading, setIsUploading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    if (selectedFile) {
      setEditedFile({
        alternativeText: selectedFile.alternativeText || '',
        title: selectedFile.title || '',
        description: selectedFile.description || '',
      })
    }
  }, [selectedFile])

  const fetchFiles = async () => {
    const fetchedFiles = await getFiles()
    setFiles(fetchedFiles)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploadedFile = await uploadFile(formData)
      await fetchFiles() // Dosya listesini yenile
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      // Burada kullanıcıya bir hata mesajı gösterebilirsiniz
    } finally {
      setIsUploading(false)
    }
  }

  const handleView = (file: MediaFile) => {
    window.open(file.url, '_blank')
  }

  const handleDelete = async (file: MediaFile) => {
    if (window.confirm(`${file.name} dosyasını silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteFile(file.name)
        await fetchFiles() // Dosya listesini yenile
        if (selectedFile && selectedFile.name === file.name) {
          setSelectedFile(null) // Silinen dosya seçiliyse sidebar'ı kapat
        }
      } catch (error) {
        console.error('Dosya silme hatası:', error)
        // Burada kullanıcıya bir hata mesajı gösterebilirsiniz
      }
    }
  }

  const handleMetadataChange = (field: string, value: string) => {
    setEditedFile(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdate = async () => {
    if (!selectedFile) return

    setIsUpdating(true)
    try {
      const updatedFile = await updateFileMetadata(selectedFile.id, editedFile)
      setSelectedFile(updatedFile)
      setFiles(files.map(f => f.id === updatedFile.id ? updatedFile : f))
      // Burada kullanıcıya başarılı güncelleme mesajı gösterebilirsiniz
    } catch (error) {
      console.error('Metadata güncelleme hatası:', error)
      // Burada kullanıcıya bir hata mesajı gösterebilirsiniz
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'size') return a.size - b.size
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Medya Kütüphanesi</h1>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <Button onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? 'Yükleniyor...' : 'Yükle'}
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Input 
            placeholder="Arama terimi girin" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button>Ara</Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">İsim</SelectItem>
              <SelectItem value="size">Boyut</SelectItem>
              <SelectItem value="date">Tarih</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {sortedFiles.map((file) => (
            <Card 
              key={file.url} 
              className={`cursor-pointer transition-colors duration-200 ${
                selectedFile && selectedFile.id === file.id 
                  ? 'bg-[#3858E9] text-white' 
                  : 'hover:bg-gray-100'
              }`} 
              onClick={() => setSelectedFile(file)}
            >
              <CardContent className="p-2">
                <img src={file.url} alt={file.name} className="w-full h-32 object-cover mb-2" />
                <p className="text-sm truncate">{file.name}</p>
                <p className={`text-xs ${selectedFile && selectedFile.id === file.id ? 'text-white' : 'text-gray-500'}`}>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="w-1/3 bg-white p-4 shadow-lg overflow-y-auto border-l h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Dosya Detayları</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <img src={selectedFile.url} alt={selectedFile.name} className="w-1/4 h-auto mb-4" />
          <div className="space-y-4">
            <div className="text-[12px]">
              <p><strong>Yüklenme tarihi:</strong> {new Date(selectedFile.createdAt).toLocaleDateString()}</p>
              <p><strong>Dosya adı:</strong> {selectedFile.name}</p>
              <p><strong>Dosya türü:</strong> {selectedFile.name.split('.').pop()}</p>
              <p><strong>Dosya boyutu:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alternativeText">Alternatif Metin</Label>
              <Input 
                id="alternativeText" 
                value={editedFile.alternativeText || ''} 
                onChange={(e) => handleMetadataChange('alternativeText', e.target.value)}
              />
              <p className="text-[12px] text-gray-500">Görüntünün amacını nasıl tanımlayacağınızı öğrenin. Görüntü tamamen dekoratifse boş bırakın.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                value={editedFile.title || ''} 
                onChange={(e) => handleMetadataChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea 
                id="description" 
                value={editedFile.description || ''} 
                onChange={(e) => handleMetadataChange('description', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileUrl">Dosya URL'i</Label>
              <Input id="fileUrl" value={selectedFile.url} readOnly />
            </div>
            <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center" 
              onClick={() => handleView(selectedFile)}
            >
              <span>Görüntüle</span>
              <ArrowSquareOut className="ml-2 h-4 w-4" />
            </Button>             
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center text-red-600 border-red-600 hover:bg-red-50" 
              onClick={() => handleDelete(selectedFile)}
            >
              <span>Sil</span>
              <Trash className="ml-2 h-4 w-4" />
            </Button>
            </div>
            <Button 
            className="w-full bg-[#3858E9] hover:bg-[#3858E9]/90 text-white flex items-center justify-center" 
            onClick={handleUpdate} 
            disabled={isUpdating}
          >
            <span>{isUpdating ? 'Güncelleniyor...' : 'Güncelle'}</span>
            <ArrowClockwise className="ml-2 h-4 w-4" />
          </Button>
          </div>
        </div>
      )}
    </div>
  )
}