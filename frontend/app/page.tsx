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
    </div>
  );
}
