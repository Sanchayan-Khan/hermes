"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Book, Mail, ArrowRight } from "lucide-react";
import { useLoadingContext } from "@/components/loading-provider";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import FeatureCard from "@/components/feature-card";

export default function Home() {
  const { setIsLoading } = useLoadingContext();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (href: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    router.push(href);
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-block px-4 py-1 text-sm font-medium text-amber-100 bg-amber-800/70 rounded-full border border-amber-600/30 shadow-inner">
            Your travel memories, beautifully preserved
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-wide text-amber-100 sm:text-5xl md:text-6xl font-display">
            Document your journey with Hermes
          </h1>

          {/* Sub‑text */}
          <p className="max-w-lg text-lg text-amber-200 font-handwriting leading-relaxed">
            Create beautiful travel journals, send custom postcards, and explore
            local stories from around the world.
          </p>

          {/* Get Started (only when NOT logged in) */}
          {!isAuthenticated && (
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              onClick={() => handleNavigation("/login")}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        <div className="relative max-w-4xl mx-auto p-10 bg-[#2c2623] rounded-lg shadow-xl border border-amber-800/20">
          {/* Photo gallery with side-by-side layout */}
          <div className="flex justify-center gap-10 my-8">
            <div className="relative p-4 bg-[#1e1916] shadow-md rotate-[-4deg] border border-amber-700/30 w-[300px] transition-transform hover:scale-105 hover:z-10">
              <Image
                src="https://images.unsplash.com/photo-1547393027-a632f1004ad6?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
                height={380}
                alt="Travel photo"
                className="object-cover w-full h-[380px]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-sm font-medium text-center bg-[#1e1916]/80 text-amber-200 font-handwriting">
                Amalfi Coast, Italy
              </div>
            </div>

            <div className="relative p-4 bg-[#1e1916] shadow-md rotate-[2deg] border border-amber-700/30 w-[300px] transition-transform hover:scale-105 hover:z-10">
              <Image
                src="https://images.unsplash.com/photo-1719244376100-4b342f665d07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
                height={380}
                alt="Travel photo"
                className="object-cover w-full h-[380px]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-sm font-medium text-center bg-[#1e1916]/80 text-amber-200 font-handwriting">
                Iguazu Falls, Argentina
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS (only when logged in) */}
      {isAuthenticated && (
        <div className="grid gap-8 mt-24 md:grid-cols-3">
          <FeatureCard
            icon={<Book className="w-6 h-6 text-amber-500" />}
            title="Travel Journal"
            description="Create beautiful journal entries with photos, text, stickers, and more."
            href="/journal"
          />
          <FeatureCard
            icon={<Mail className="w-6 h-6 text-amber-500" />}
            title="Custom Postcards"
            description="Design and send virtual postcards with stamps and location-based designs."
            href="/postcard"
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6 text-amber-500" />}
            title="Local Lores"
            description="Discover historical insights, folklore, and local legends from your destinations."
            href="/lores"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-amber-800/30 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-amber-200/70 text-sm">
          <a 
            href="https://github.com/mansi0xc/hermes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-amber-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub Repository
          </a>
          <span className="hidden md:inline">•</span>
          <span>Created by Beyonders</span>
        </div>
        <div className="mt-2 text-amber-200/50 text-xs">
          © {new Date().getFullYear()} Hermes Travel Journal
        </div>
      </footer>
    </div>
  );
}
