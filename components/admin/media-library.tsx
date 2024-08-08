"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, ArrowSquareOut, Trash, ArrowClockwise } from "@phosphor-icons/react"
import { getFiles, deleteFile, uploadFile, updateFileMetadata } from '@/actions/media.actions'
import { MediaFile } from '@/schemas/mediaLibrarySchema'

interface MediaLibraryProps {
  onSelect?: (file: MediaFile) => void
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelect }) => {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    const fetchedFiles = await getFiles()
    setFiles(fetchedFiles)
  }

  const handleFileSelect = (file: MediaFile) => {
    if (onSelect) {
      onSelect(file)
    } else {
      setSelectedFile(file)
    }
  }

  const handleDelete = async (file: MediaFile) => {
    if (window.confirm(`Are you sure you want to delete ${file.name}?`)) {
      await deleteFile(file.name)
      await fetchFiles()
      if (selectedFile && selectedFile.id === file.id) {
        setSelectedFile(null)
      }
    }
  }

  const handleUpdate = async () => {
    if (selectedFile) {
      await updateFileMetadata(selectedFile.id, selectedFile)
      await fetchFiles()
    }
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return 0
  })

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {sortedFiles.map((file) => (
            <Card 
              key={file.id} 
              className={`cursor-pointer transition-colors duration-200 ${
                selectedFile && selectedFile.id === file.id 
                  ? 'bg-[#3858E9] text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleFileSelect(file)}
            >
              <CardContent className="p-2">
                <img src={file.url} alt={file.name} className="w-full h-32 object-cover mb-2" />
                <p className="text-sm truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{new Date(file.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {selectedFile && !onSelect && (
        <div className="w-1/3 bg-white p-4 shadow-lg overflow-y-auto border-l h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">File Details</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-auto mb-4" />
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileName">File Name</Label>
              <Input id="fileName" value={selectedFile.name} readOnly />
            </div>
            <div>
              <Label htmlFor="fileUrl">File URL</Label>
              <Input id="fileUrl" value={selectedFile.url} readOnly />
            </div>
            <div>
              <Label htmlFor="fileSize">File Size</Label>
              <Input id="fileSize" value={`${(selectedFile.size / 1024).toFixed(2)} KB`} readOnly />
            </div>
            <div>
              <Label htmlFor="fileType">File Type</Label>
              <Input id="fileType" value={selectedFile.name.split('.').pop() || ''} readOnly />
            </div>
            <div>
              <Label htmlFor="uploadDate">Upload Date</Label>
              <Input id="uploadDate" value={new Date(selectedFile.createdAt).toLocaleString()} readOnly />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={() => window.open(selectedFile.url, '_blank')}>
                View
                <ArrowSquareOut className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(selectedFile)}>
                Delete
                <Trash className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" onClick={handleUpdate}>
              Update
              <ArrowClockwise className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaLibrary