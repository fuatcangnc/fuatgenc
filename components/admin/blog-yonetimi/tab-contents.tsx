"use client"
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { usePostStore } from '@/store/usePostStore'

// SVG ikonları için Image bileşenlerini oluşturalım
const GoogleIcon = () => (
  <Image src="/google-logo.svg" alt="Google Logo" width={20} height={20} />
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5">
    <rect width="256" height="256" fill="none"/>
    <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" fill="currentColor"/>
  </svg>
)

const MetaTitle = () => {
  const { metaTitle, setMetaTitle } = usePostStore()
  const maxLength = 60
  const usedCharacters = metaTitle.length
  const progress = (usedCharacters / maxLength) * 100

  const getGradient = (progress: number) => {
    if (progress <= 33) {
      return 'bg-gradient-to-r from-red-500 to-yellow-500'
    } else if (progress <= 66) {
      return 'bg-gradient-to-r from-yellow-500 to-green-300'
    } else {
      return 'bg-gradient-to-r from-green-300 to-green-500'
    }
  }

  const getStatus = (progress: number) => {
    if (progress <= 33) return 'Zayıf'
    if (progress <= 66) return 'İyi'
    return 'Mükemmel'
  }

  return (
    <div>
      <Label htmlFor="meta-title">Meta başlık</Label>
      <Input 
        id="meta-title" 
        placeholder="(Başlıksız)" 
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        maxLength={maxLength}
      />
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${getGradient(progress)}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Karakterler: {usedCharacters} – {getStatus(progress)}
        </p>
      </div>
    </div>
  )
}

const MetaDescription = () => {
  const { metaDescription, setMetaDescription } = usePostStore()
  const maxLength = 145
  const usedCharacters = metaDescription.length
  const progress = (usedCharacters / maxLength) * 100

  const getGradient = (progress: number) => {
    if (progress <= 33) {
      return 'bg-gradient-to-r from-red-500 to-yellow-500'
    } else if (progress <= 66) {
      return 'bg-gradient-to-r from-yellow-500 to-green-300'
    } else {
      return 'bg-gradient-to-r from-green-300 to-green-500'
    }
  }

  return (
    <div>
      <Label htmlFor="meta-description">Meta açıklama</Label>
      <Textarea 
        id="meta-description" 
        placeholder="Bir meta açıklama yazın..." 
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        maxLength={maxLength}
      />
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${getGradient(progress)}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Önerilen: {maxLength} karakter. {usedCharacters} karakter kullandınız
        </p>
      </div>
    </div>
  )
}

const SearchEnginePreview = () => {
  const { slug, metaTitle, metaDescription } = usePostStore()

  const splitText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return [text, ''];
    let splitIndex = text.lastIndexOf(' ', maxLength);
    if (splitIndex === -1) splitIndex = maxLength;
    return [text.slice(0, splitIndex), text.slice(splitIndex).trim()];
  }

  const [titleLine1, titleLine2] = splitText(metaTitle || '(Başlıksız)', 60);
  const [descLine1, descLine2] = splitText(metaDescription || 'Özel bir meta açıklama ayarlanmadıysa, arama motorları burada arama terimiyle ilgili içeriğin otomatik bir önizlemesini gösterecektir.', 160);

  return (
    <div>
      <h3 className="font-semibold">Arama Motoru Sonuç Önizlemesi</h3>
      <div className="mt-2 p-4 border rounded-md max-w-[600px]">
        <div className="text-blue-600 text-lg overflow-hidden">
          <div className="truncate">
            {slug ? `fuat.ghost.io/${slug}` : 'fuat ghost io › başlıksız'}
          </div>
        </div>
        <div className="text-xl font-medium overflow-hidden">
          <div>{titleLine1}</div>
          {titleLine2 && <div>{titleLine2}</div>}
        </div>
        <div className="text-sm text-gray-600 overflow-hidden">
          <div>{descLine1}</div>
          {descLine2 && <div>{descLine2}</div>}
        </div>
      </div>
    </div>
  )
}

export interface TabContent {
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

export const tabContents: Record<string, TabContent> = {
  'meta-data': {
    title: 'Meta Veri',
    icon: <GoogleIcon />,
    content: (
      <div className="space-y-4">
        <MetaTitle />
        <MetaDescription />
        <div>
          <Label htmlFor="canonical-url">Canonical URL</Label>
          <Input id="canonical-url" placeholder="https://fuat.ghost.io/p/808fbcf5-eda4-4cec-a53a-59f88eef" />
        </div>
        <SearchEnginePreview />
      </div>
    )
  },
  // Diğer tablar...
}