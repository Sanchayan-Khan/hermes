import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Book, Mail, ArrowRight } from "lucide-react"

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
            Create beautiful travel journals, send custom postcards, and explore local stories from around the world.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
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
                  src="/placeholder.svg?height=300&width=250"
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
                <div className="font-medium text-amber-800 dark:text-amber-100 font-serif">Postcards</div>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Send beautiful custom postcards to friends and family
                </p>
                <Mail className="w-5 h-5 mt-2 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="p-4 bg-amber-50 shadow-md rotate-[3deg] dark:bg-amber-950/40">
                <div className="font-medium text-amber-800 dark:text-amber-100 font-serif">Journal</div>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Document your travels with a beautiful scrapbook
                </p>
                <Book className="w-5 h-5 mt-2 text-amber-600 dark:text-amber-300" />
              </div>
              <div className="relative p-2 bg-white shadow-md rotate-[-2deg] dark:bg-amber-950/40">
                <Image
                  src="/placeholder.svg?height=300&width=250"
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
          icon={<MapPin className="w-6 h-6 text-amber-600 dark:text-amber-300" />}
          title="Local Lores"
          description="Discover historical insights, folklore, and local legends from your destinations."
          href="/lores"
        />
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="relative p-6 transition-all bg-white border border-amber-100 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1 dark:bg-amber-950/20 dark:border-amber-900/50"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-lg transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
      <div className="p-3 mb-4 bg-amber-50 rounded-full w-fit dark:bg-amber-900/30">{icon}</div>
      <h3 className="mb-2 text-xl font-medium text-amber-900 dark:text-amber-100 font-serif">{title}</h3>
      <p className="text-amber-700 dark:text-amber-200">{description}</p>
    </Link>
  )
}

