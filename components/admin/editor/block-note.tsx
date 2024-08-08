'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BlockNote, BlockNoteEditor } from '@blocknote/core'
import '@blocknote/core/style.css' // Make sure to include Blocknote's CSS

interface BlocknoteEditorProps {
  initialValue?: string
  onChange: (value: string) => void
}

const BlockNote = ({ initialValue, onChange }: BlocknoteEditorProps) => {
  const editorRef = useRef<BlocknoteEditor | null>(null)
  const [editor, setEditor] = useState<BlocknoteEditor | null>(null)

  useEffect(() => {
    const blocknoteEditor = new Blocknote({
      // Blocknote editor options
      content: initialValue || '', // Set initial content if provided
      onChange: (content: string) => {
        onChange(content) // Notify parent component of content changes
      }
    })

    if (editorRef.current) {
      blocknoteEditor.attach(editorRef.current)
    }

    setEditor(blocknoteEditor)

    return () => {
      if (blocknoteEditor) {
        blocknoteEditor.detach()
      }
    }
  }, [initialValue, onChange])

  return <div ref={editorRef} className="blocknote-editor-container"></div>
}

export default BlockNote
