import { useState } from 'react';
import { MediaFile } from '@/schemas/mediaLibrarySchema';

export function useMediaLibrary() {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);

  const openMediaLibrary = () => setIsMediaLibraryOpen(true);
  const closeMediaLibrary = () => setIsMediaLibraryOpen(false);

  const handleFileSelect = (file: MediaFile) => {
    setSelectedFile(file);
    closeMediaLibrary();
  };

  return {
    isMediaLibraryOpen,
    selectedFile,
    openMediaLibrary,
    closeMediaLibrary,
    handleFileSelect,
  };
}