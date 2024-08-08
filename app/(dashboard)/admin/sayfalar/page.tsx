"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  PlusCircle, 
  MagnifyingGlass, 
  ChatCenteredText 
} from "@phosphor-icons/react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export default function Sayfalar() {
  const [pages, setPages] = useState([
    { 
      title: "Ana Sayfa — Front Page", 
      author: "fuatcangenc@gmail.com", 
      date: "Published 2024/07/15 at 10:28 am",
      seoDetails: { title: "TG", description: "DG", keyword: "!!!" },
      status: "published"
    },
    { 
      title: "Privacy Policy — Draft, Privacy Policy Page", 
      author: "fuatcangenc@gmail.com", 
      date: "Last Modified 2024/07/17 at 5:50 pm",
      seoDetails: { title: "TG", description: "DG", keyword: "!!!" },
      status: "draft"
    }
  ]);

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Pages</h1>
            <Button variant="outline" className="flex items-center gap-2 bg-[#0066FF] hover:bg-gray-100 transition-colors text-white" size={'default'}>
              <PlusCircle size={20} />
              Add New Page
            </Button>
          </div>

          <div className="mb-6">
            <nav className="flex flex-wrap gap-1 sm:gap-2 text-sm font-medium">
              <a href="#" className="px-3 py-2 bg-white border text-gray-600 hover:bg-gray-300 transition-colors duration-200 relative">
                All <span className="ml-1 px-2 py-1 rounded-full bg-gray-300 text-xs">2</span>
                <span className="vertical-divider"></span>
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-[#2563eb] hover:bg-gray-100 transition-colors duration-200 relative">
                Published <span className="ml-1 px-2 py-1 rounded-full text-xs">1</span>
                <span className="vertical-divider"></span>
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-[#2563eb] hover:bg-gray-100 transition-colors duration-200 relative">
                Draft <span className="ml-1 px-2 py-1 rounded-full text-xs">1</span>
                <span className="vertical-divider"></span>
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-[#2563eb] hover:bg-gray-100 transition-colors duration-200 relative">
                Trash <span className="ml-1 px-2 py-1 rounded-full text-xs">22</span>
              </a>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex flex-wrap gap-2">
              <Select>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white hover:bg-gray-100">Apply</Button>
              <Select>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white hover:bg-gray-100">Filter</Button>
            </div>
            <div className="flex items-center w-full md:w-auto">
              <Input placeholder="Search Pages" className="mr-2 bg-white" />
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                <MagnifyingGlass size={20} />
                <span className="ml-2 hidden sm:inline">Search Pages</span>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="p-3">
                    <Checkbox />
                  </th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">SEO Details</th>
                  <th className="p-3">
                    <ChatCenteredText size={20} />
                  </th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {pages.map((page, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <Checkbox />
                    </td>
                    <td className="p-3">
                      <a href="#" className="text-blue-600 hover:underline">{page.title}</a>
                    </td>
                    <td className="p-3">{page.author}</td>
                    <td className="p-3">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex gap-1 bg-white p-2 rounded">
                            <span className="text-green-500">TG</span>
                            <span className="text-red-500">DG</span>
                            <span className="text-red-500">!!!</span>
                            <span className="text-red-500">!!!</span>
                            <span className="text-red-500">!!!</span>
                            <span className="text-green-500">R</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Title: {page.seoDetails.title}</p>
                          <p>Description: {page.seoDetails.description}</p>
                          <p>Keyword: {page.seoDetails.keyword}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">{page.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex gap-2 mb-4 sm:mb-0">
              <Select>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white hover:bg-gray-100">Apply</Button>
            </div>
            <span className="text-sm text-gray-600">2 items</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
