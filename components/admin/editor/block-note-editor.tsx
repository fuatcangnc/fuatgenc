import React, { useState } from 'react'
import BlockNote from './block-note'
const BlockNoteEditor = () => {
  const [content, setContent] = useState('')

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Blocknote.js Editor</h1>
        <BlockNote initialValue={content} onChange={handleChange} />
      </div>
    </div>
  )
}

export default BlockNoteEditor
