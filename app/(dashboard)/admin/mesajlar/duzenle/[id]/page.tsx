"use client"

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContactForm } from '@/actions/contact-form.actions'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Editor } from '@/components/admin/editor'
import { Skeleton } from "@/components/ui/skeleton"

function MessageSkeleton() {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      <div className="w-64 p-6 bg-white shadow">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default function EditMessage({ params }: { params: { id: string } }) {
  const messageId = parseInt(params.id)
  const [replyContent, setReplyContent] = useState('')
  
  const { data: message, isLoading, error } = useQuery({
    queryKey: ['contactForm', messageId],
    queryFn: () => getContactForm(messageId)
  })

  if (isLoading) return <MessageSkeleton />
  if (error) return <div>An error occurred: {(error as Error).message}</div>
  if (!message) return <div>Message not found</div>

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Contact information</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold mb-1">FULL NAME</h2>
              <p>{message.name}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-1">EMAIL</h2>
              <p>{message.email}</p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold mb-1">CONTENT</h2>
            <div className="bg-gray-100 p-4 rounded">
              {message.message}
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Replies</h2>
          <Editor 
            value={replyContent}
            onChange={(value) => setReplyContent(value)}
          />
        </div>
      </div>
      <div className="w-64 p-6 bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">Publish</h2>
        <div className="mb-4">
          <Button className="w-full mb-2">Save</Button>
          <Button variant="outline" className="w-full">Save & Exit</Button>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Status</h3>
          <Select defaultValue={message.status ? "read" : "unread"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}