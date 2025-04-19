"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Book, Mail, ArrowRight } from "lucide-react";
import { useLoadingContext } from "@/components/loading-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { setIsLoading } = useLoadingContext();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigation = (href: string) => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }
    setIsLoading(true);
    router.push(href);
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 text-sm font-medium text-amber-100 bg-amber-800/70 rounded-full border border-amber-600/30 shadow-inner">
            Your travel memories, beautifully preserved
          </div>
          <h1 className="text-4xl font-bold tracking-wide text-amber-100 sm:text-5xl md:text-6xl font-display">
            Document your journey with Hermes
          </h1>
          <p className="max-w-lg text-lg text-amber-200 font-handwriting leading-relaxed">
            Create beautiful travel journals, send custom postcards, and explore
            local stories from around the world.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {!isLoggedIn && (
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
        </div>
        <div className="relative">
          <div className="relative grid grid-cols-2 gap-4 mx-auto">
            <div className="space-y-4">
              <div className="relative p-2 bg-[#1e1916] shadow-md rotate-[-4deg] border border-amber-700/30">
                <Image
                  src="https://images.unsplash.com/photo-1547393027-a632f1004ad6?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={250}
                  height={300}
                  alt="Travel photo"
                  className="object-cover w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center bg-[#1e1916]/80 text-amber-200 font-handwriting">
                  Amalfi Coast, Italy
                </div>
              </div>
              <div className="p-4 bg-amber-800/40 shadow-md rotate-[2deg] backdrop-blur-sm border border-amber-700/30">
                <div className="font-medium text-amber-200 font-display">
                  Postcards
                </div>
                <p className="text-sm text-amber-300 font-handwriting">
                  Send beautiful custom postcards to friends and family
                </p>
                <Mail className="w-5 h-5 mt-2 text-amber-500" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="p-4 bg-amber-800/30 shadow-md rotate-[3deg] backdrop-blur-sm border border-amber-700/20">
                <div className="font-medium text-amber-200 font-display">
                  Journal
                </div>
                <p className="text-sm text-amber-300 font-handwriting">
                  Document your travels with a beautiful scrapbook
                </p>
                <Book className="w-5 h-5 mt-2 text-amber-500" />
              </div>
              <div className="relative p-2 bg-[#1e1916] shadow-md rotate-[-2deg] border border-amber-700/30">
                <Image
                  src="https://images.unsplash.com/photo-1719244376100-4b342f665d07?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={250}
                  height={300}
                  alt="Travel photo"
                  className="object-cover w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center bg-[#1e1916]/80 text-amber-200 font-handwriting">
                  Iguazu Falls, Argentina
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-200/10 rounded-full -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100/10 rounded-full -z-10"></div>
        </div>
      </div>

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
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  const { setIsLoading } = useLoadingContext();
  const router = useRouter();

  const handleNavigation = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }
    setIsLoading(true);
    router.push(href);
  };

  return (
    <button
      onClick={handleNavigation}
      className="relative p-6 transition-all bg-[#1e1916]/60 border border-amber-700/30 rounded-lg shadow-md hover:shadow-amber-700/10 group hover:-translate-y-1 backdrop-blur-sm text-left"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-lg transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
      <div className="p-3 mb-4 bg-amber-800/50 rounded-full w-fit shadow-inner group-hover:bg-amber-700/70 transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium text-amber-200 font-display tracking-wide">
        {title}
      </h3>
      <p className="text-amber-300/80 font-handwriting">{description}</p>
    </button>
  );
}
