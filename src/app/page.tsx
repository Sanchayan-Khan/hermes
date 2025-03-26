import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Book, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-100">
            Your travel memories, beautifully preserved
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl md:text-6xl dark:text-amber-100 font-serif">
            Document your journey with Hermes
          </h1>
          <p className="max-w-lg text-lg text-amber-700 dark:text-amber-200">
            Create beautiful travel journals, send custom postcards, and explore
            local stories from around the world.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/login">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-amber-200 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/30"
            >
              <Link href="/journal">Explore Features</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="relative grid grid-cols-2 gap-4 mx-auto">
            <div className="space-y-4">
              <div className="relative p-2 bg-white shadow-md rotate-[-4deg] dark:bg-amber-950/40">
                <Image
                  src="https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_640.jpg"
                  width={250}
                  height={300}
                  alt="Travel photo"
                  className="object-cover w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center bg-white/80 dark:bg-amber-950/80">
                  Paris, France
                </div>
              </div>
              <div className="p-4 bg-amber-100 shadow-md rotate-[2deg] dark:bg-amber-900/30">
                <div className="font-medium text-amber-800 dark:text-amber-100 font-serif">
                  Postcards
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Send beautiful custom postcards to friends and family
                </p>
                <Mail className="w-5 h-5 mt-2 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="p-4 bg-amber-50 shadow-md rotate-[3deg] dark:bg-amber-950/40">
                <div className="font-medium text-amber-800 dark:text-amber-100 font-serif">
                  Journal
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Document your travels with a beautiful scrapbook
                </p>
                <Book className="w-5 h-5 mt-2 text-amber-600 dark:text-amber-300" />
              </div>
              <div className="relative p-2 bg-white shadow-md rotate-[-2deg] dark:bg-amber-950/40">
                <Image
                  src="data:image/jpeg;base64,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"
                  width={250}
                  height={300}
                  alt="Travel photo"
                  className="object-cover w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center bg-white/80 dark:bg-amber-950/80">
                  Kyoto, Japan
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-200/50 rounded-full -z-10 dark:bg-amber-800/30"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100/80 rounded-full -z-10 dark:bg-amber-900/30"></div>
        </div>
      </div>

      <div className="grid gap-8 mt-24 md:grid-cols-3">
        <FeatureCard
          icon={<Book className="w-6 h-6 text-amber-600 dark:text-amber-300" />}
          title="Travel Journal"
          description="Create beautiful journal entries with photos, text, stickers, and more."
          href="/journal"
        />
        <FeatureCard
          icon={<Mail className="w-6 h-6 text-amber-600 dark:text-amber-300" />}
          title="Custom Postcards"
          description="Design and send virtual postcards with stamps and location-based designs."
          href="/postcard"
        />
        <FeatureCard
          icon={
            <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-300" />
          }
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
  return (
    <Link
      href={href}
      className="relative p-6 transition-all bg-white border border-amber-100 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1 dark:bg-amber-950/20 dark:border-amber-900/50"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-lg transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
      <div className="p-3 mb-4 bg-amber-50 rounded-full w-fit dark:bg-amber-900/30">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium text-amber-900 dark:text-amber-100 font-serif">
        {title}
      </h3>
      <p className="text-amber-700 dark:text-amber-200">{description}</p>
    </Link>
  );
}
