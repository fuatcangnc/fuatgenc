"use client"

import { useStore } from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { Sidebar } from "@/components/admin/sidebar"
import TopBar from "@/components/admin/top-bar"
import { Toaster } from "@/components/ui/toaster"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <div className="flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className={`flex overflow-x-hidden bg-[#F1F5F9] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300`}>
          <Sidebar />
          <div className="w-full mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}