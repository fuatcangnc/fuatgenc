"use client"

import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import { Menu } from "@/components/admin/menu"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { SidebarToggle } from "@/components/admin/sidebar-toggle"
import Image from "next/image"
import Link from "next/link"
export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state)
  
  if(!sidebar) return null

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 mt-16 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300  bg-[#fff]",
        sidebar?.isOpen === false ? "w-[90px]" : "w-64"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}