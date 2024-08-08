"use client"

import { useState, useEffect, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Edit, Check } from "lucide-react"
import { tabContents } from './tab-contents'
import { usePostStore } from '@/store/usePostStore'
import { MediaLibraryModal } from '@/components/admin/media-library-modal'
import Image from 'next/image'
import slugify from 'slugify'

interface PostSettingsSidebarProps {
  onPublish: () => Promise<void>;
  onDelete?: () => Promise<void>;
  isPublishing: boolean;
  isDeleting?: boolean;
  isNewPost?: boolean;
}

export function PostSettingsSidebar({ 
  onPublish, 
  onDelete, 
  isPublishing, 
  isDeleting = false, 
  isNewPost = false
}: PostSettingsSidebarProps) {
  const { 
    title,
    slug, 
    excerpt, 
    featuredImage, 
    isFeatured, 
    setSlug, 
    setExcerpt, 
    setFeaturedImage, 
    setIsFeatured, 
  } = usePostStore()
  
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [isEditingSlug, setIsEditingSlug] = useState(false)
  const [tempSlug, setTempSlug] = useState(slug)
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const [isSlugManuallySet, setIsSlugManuallySet] = useState(false)

  const updateSlug = useCallback((newSlug: string, isManual: boolean = false) => {
    console.log('Updating slug:', newSlug, 'Manual:', isManual);
    setSlug(newSlug);
    setTempSlug(newSlug);
    if (isManual) {
      setIsSlugManuallySet(true);
    }
  }, [setSlug]);

  useEffect(() => {
    if (!isSlugManuallySet && title) {
      const newSlug = slugify(title, { lower: true, strict: true });
      updateSlug(newSlug);
    }
  }, [title, isSlugManuallySet, updateSlug]);

  useEffect(() => {
    if (!isEditingSlug) {
      setTempSlug(slug);
    }
  }, [isEditingSlug, slug]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleBack = () => {
    setActiveTab(null)
  }

  const handleEditSlug = () => {
    if (isEditingSlug) {
      console.log('Saving edited slug:', tempSlug);
      updateSlug(tempSlug, true);
    } else {
      console.log('Entering edit mode, current slug:', slug);
    }
    setIsEditingSlug(!isEditingSlug);
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = slugify(e.target.value, { lower: true, strict: true });
    console.log('Slug changed:', newSlug);
    setTempSlug(newSlug);
  }

  const handleImageSelect = (image: { url: string }) => {
    setFeaturedImage(image.url)
    setIsMediaLibraryOpen(false)
  }

  const handleRemoveImage = () => {
    setFeaturedImage(null)
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 border-l border-gray-200 dark:border-gray-700">
      {activeTab ? (
        <div>
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h2 className="text-xl font-bold mb-4 dark:text-white">{tabContents[activeTab]?.title || activeTab}</h2>
          {tabContents[activeTab]?.content}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="post-url" className="dark:text-gray-300">Gönderi URL'si</Label>
            <div className="flex items-center">
              <Input 
                id="post-url" 
                placeholder="fuat.ghost.io/" 
                value={isEditingSlug ? tempSlug : slug}
                onChange={handleSlugChange}
                className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
                disabled={!isEditingSlug}
              />
              <Button 
                onClick={handleEditSlug} 
                className="ml-2"
                variant="outline"
              >
                {isEditingSlug ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            {featuredImage ? (
              <div className="space-y-2">
                <div className="relative w-full h-40">
                  <Image 
                    src={featuredImage} 
                    alt="Öne Çıkan Görsel" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsMediaLibraryOpen(true)}
                    className="flex-1"
                  >
                    Değiştir
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRemoveImage}
                    className="flex-1"
                  >
                    Kaldır
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsMediaLibraryOpen(true)}
                className="w-full"
              >
                Öne çıkan görseli ayarla
              </Button>
            )}
          </div>

          <div>
            <Label htmlFor="excerpt" className="dark:text-gray-300">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              placeholder="Bir excerpt yazın (isteğe bağlı)" 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="feature-post" className="dark:text-gray-300">Bu gönderiyi öne çıkar</Label>
              <Switch 
                id="feature-post" 
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
            </div>
            {Object.keys(tabContents).filter(item => item !== 'twitter-card').map((item) => (
              <div key={item} className="flex items-center justify-between cursor-pointer dark:text-gray-300" onClick={() => handleTabClick(item)}>
                <div className="flex items-center">
                  {tabContents[item].icon && (
                    <span className="mr-2">{tabContents[item].icon}</span>
                  )}
                  <span>{tabContents[item].title}</span>
                </div>
                <ChevronRight size={20} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Button 
              variant="default" 
              className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              onClick={onPublish}
              disabled={isPublishing}
            >
              {isPublishing ? 'Yayınlanıyor...' : 'Yayınla'}
            </Button>
            {onDelete && (
              <Button 
                variant="outline" 
                className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900 dark:hover:bg-opacity-20"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Siliniyor...' : 'Gönderiyi sil'}
              </Button>
            )}
          </div>
        </div>
      )}
      <MediaLibraryModal 
        isOpen={isMediaLibraryOpen} 
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  )
}