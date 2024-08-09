"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Sun, Moon, User, LogOut, Globe, ShoppingCart, ExternalLink } from "lucide-react"
import { usePathname } from "next/navigation"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function TopBar() {
  const { setTheme } = useTheme()
  const pathname = usePathname()

  const breadcrumbSegments = getBreadcrumbSegments(pathname)

  return (
    <header className="bg-[#21212D] text-white">
      <div className="flex h-16  items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <span className="text-2xl font-bold">b</span>
          </Button>
          <Input 
            className="w-64 bg-[#2E2E3D] border-none" 
            placeholder="Search"
            type="search"
          />
        </div>
        <nav className="flex items-center space-x-2">
        <Link 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white border-white/10 border hover:bg-white hover:text-[#21212D] px-8 inline-flex items-center rounded-sm h-full py-2"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Siteyi Görüntüle
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-600"></span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-600 text-xs flex items-center justify-center">8</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}

function getBreadcrumbSegments(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbSegments = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: href
    }
  })

  return [{ name: "Home", href: "/" }, ...breadcrumbSegments]
}