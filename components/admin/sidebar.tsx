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
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300  bg-[#21212D]",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Link href="/admin" className="px-5 border-b border-white/10 py-2">
          <Image src="/logo.svg" alt="logo" width={100} height={30} />
        </Link>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}