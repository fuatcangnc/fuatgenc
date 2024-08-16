import React from 'react'
import Plugin from '@/components/admin/eklentiler/plugin'

function PluginPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">WordPress Eklentileri</h1>
      <Plugin />
    </div>
  )
}

export default PluginPage