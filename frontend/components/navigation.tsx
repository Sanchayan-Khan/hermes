"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Book, Mail, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLoadingContext } from "@/components/loading-provider";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useLoadingContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Don't show navigation on login page
  if (pathname === "/login") return null;

  const handleNavigation = (href: string) => {
    if (!isAuthenticated && href !== "/login") {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }
    if (pathname !== href) {
      setIsLoading(true);
      router.push(href);
    }
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-[#2a2522]/80 backdrop-blur-md border-b border-amber-700/30">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => handleNavigation("/")}
        >
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rotate-12 bg-amber-500 rounded-sm group-hover:rotate-[20deg] transition-transform shadow-md"></div>
            <div className="absolute top-[-5px] right-[-5px] w-6 h-6">
              <div className="absolute w-full h-full rounded-full bg-amber-200/40 animate-ping"></div>
              <div className="absolute w-full h-full rounded-full bg-amber-200/60"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white font-display text-2xl">
              H
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-amber-300">
            Hermes
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink
            href="/journal"
            active={pathname === "/journal"}
            onClick={() => handleNavigation("/journal")}
          >
            <Book className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline font-medium">Journal</span>
          </NavLink>
          <NavLink
            href="/postcard"
            active={pathname === "/postcard"}
            onClick={() => handleNavigation("/postcard")}
          >
            <Mail className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline font-medium">Postcards</span>
          </NavLink>
          <NavLink
            href="/lores"
            active={pathname === "/lores"}
            onClick={() => handleNavigation("/lores")}
          >
            <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline font-medium">Lores</span>
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              href="/profile"
              active={pathname === "/profile"}
              onClick={() => handleNavigation("/profile")}
            >
              <User className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline font-medium">Profile</span>
            </NavLink>
          ) : (
            <NavLink
              href="/login"
              active={pathname === "/login"}
              onClick={() => handleNavigation("/login")}
            >
              <User className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline font-medium">Sign In</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-all hover:scale-105",
        active
          ? "bg-amber-800 text-amber-100 shadow-inner shadow-amber-950/50"
          : "text-amber-300 hover:bg-amber-900/50"
      )}
    >
      {children}
    </button>
  );
}
