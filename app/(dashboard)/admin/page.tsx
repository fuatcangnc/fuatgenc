"use client"
import React from 'react'
import { MediaLibrary } from '@/components/admin/media-library'
function Admin() {
  return (
    <div>
            <MediaLibrary onSelect={(file) => console.log('Selected file:', file)} />

    </div>
  )
}

export default Admin