"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Mail, MapPin, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  // Don't show navigation on login page
  if (pathname === "/login") return null

  return (
    <nav className="sticky top-0 z-10 w-full bg-[#f9f7f2]/80 dark:bg-[#2a2522]/80 backdrop-blur-md border-b border-amber-200/30 dark:border-amber-900/30">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rotate-12 bg-amber-500 rounded-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">H</div>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-amber-800 dark:text-amber-300">Hermes</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/journal" active={pathname === "/journal"}>
            <Book className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Journal</span>
          </NavLink>
          <NavLink href="/postcard" active={pathname === "/postcard"}>
            <Mail className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Postcards</span>
          </NavLink>
          <NavLink href="/lores" active={pathname === "/lores"}>
            <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Lores</span>
          </NavLink>
          <NavLink href="/profile" active={pathname === "/profile"}>
            <User className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
        active
          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100 shadow-sm"
          : "text-amber-700 hover:bg-amber-100/50 dark:text-amber-300 dark:hover:bg-amber-900/20",
      )}
    >
      {children}
    </Link>
  )
}

