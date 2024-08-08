"use client"

import { useStore } from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { Sidebar } from "@/components/admin/sidebar"
import TopBar from "@/components/admin/top-bar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null


  return (
    <div className="flex h-screen overflow-hidden bg-[#21212D]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className={`flex-1 overflow-x-hidden overflow-y-auto  md:px-8 bg-[#F1F5F9] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 rounded-[30px] md:rounded-[35px/50px_0px_0px_0px] ${
          sidebar.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        }`}>
          <TopBar />
          {children}
        </main>
      </div>
    </div>
  )
}

