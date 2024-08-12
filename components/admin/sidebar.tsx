"use client"

import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import { Menu } from "@/components/admin/menu"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { SidebarToggle } from "@/components/admin/sidebar-toggle"
export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state)
  
  if(!sidebar) return null

  return (
    <aside
      className={cn(
        " -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300  bg-[#fff]",
        sidebar?.isOpen === false ? "w-[90px]" : "w-64"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex flex-col px-3 shadow-md dark:shadow-zinc-800">
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}