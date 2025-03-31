"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bookmark, BookmarkCheck } from "lucide-react"
import PageHeader from "@/components/page-header"

// Sample lores data
const sampleLores = [
  {
    id: "1",
    title: "The Legend of the Eiffel Tower",
    location: "Paris, France",
    type: "Historical",
    content:
      "When the Eiffel Tower was first constructed for the 1889 World's Fair, many Parisians considered it an eyesore and petitioned for its removal. It was originally intended to be a temporary structure, but its utility for communications saved it from demolition.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "The Mysterious Moai of Easter Island",
    location: "Easter Island, Chile",
    type: "Cultural",
    content:
      "The giant stone statues of Easter Island, known as Moai, were carved by the Rapa Nui people between 1250 and 1500 AD. How these massive statues, some weighing up to 86 tons, were transported across the island remains a subject of debate among archaeologists.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "The Ghost of Anne Boleyn",
    location: "Tower of London, UK",
    type: "Folklore",
    content:
      "Anne Boleyn, the second wife of King Henry VIII, was executed at the Tower of London in 1536. Legend has it that her ghost, sometimes headless and carrying her severed head, still haunts the Tower, particularly around the anniversary of her execution.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "The Origin of the Northern Lights",
    location: "Arctic Circle",
    type: "Folklore",
    content:
      "In Finnish folklore, the Northern Lights (Aurora Borealis) were believed to be caused by a magical fox sweeping its tail across the snow, sending sparks into the sky. The Finnish name for this phenomenon, 'revontulet,' literally translates to 'fox fires.'",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function LoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [savedLores, setSavedLores] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const filteredLores = sampleLores.filter(
    (lore) =>
      lore.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleSaveLore = (id: string) => {
    if (savedLores.includes(id)) {
      setSavedLores(savedLores.filter((loreId) => loreId !== id))
    } else {
      setSavedLores([...savedLores, id])
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="Local Lores"
        description="Discover historical insights, folklore, and local legends from around the world"
        button={
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
            <Input
              placeholder="Search lores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
            />
          </div>
        }
      />

      <div className="relative mb-8">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full -z-10"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/3 rounded-full -z-10 blur-3xl"></div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-amber-900/30">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            All Lores
          </TabsTrigger>
          <TabsTrigger
            value="historical"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Historical
          </TabsTrigger>
          <TabsTrigger
            value="cultural"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Cultural
          </TabsTrigger>
          <TabsTrigger
            value="folklore"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Folklore
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores.map((lore, index) => (
              <div
                key={lore.id}
                className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <LoreCard
                  lore={lore}
                  isSaved={savedLores.includes(lore.id)}
                  onToggleSave={() => toggleSaveLore(lore.id)}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historical" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Historical")
              .map((lore, index) => (
                <div
                  key={lore.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <LoreCard
                    lore={lore}
                    isSaved={savedLores.includes(lore.id)}
                    onToggleSave={() => toggleSaveLore(lore.id)}
                  />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Cultural")
              .map((lore, index) => (
                <div
                  key={lore.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <LoreCard
                    lore={lore}
                    isSaved={savedLores.includes(lore.id)}
                    onToggleSave={() => toggleSaveLore(lore.id)}
                  />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="folklore" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Folklore")
              .map((lore, index) => (
                <div
                  key={lore.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <LoreCard
                    lore={lore}
                    isSaved={savedLores.includes(lore.id)}
                    onToggleSave={() => toggleSaveLore(lore.id)}
                  />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => savedLores.includes(lore.id))
              .map((lore, index) => (
                <div
                  key={lore.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <LoreCard key={lore.id} lore={lore} isSaved={true} onToggleSave={() => toggleSaveLore(lore.id)} />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface LoreCardProps {
  lore: {
    id: string
    title: string
    location: string
    type: string
    content: string
    image: string
  }
  isSaved: boolean
  onToggleSave: () => void
}

function LoreCard({ lore, isSaved, onToggleSave }: LoreCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden transition-all border-amber-600/30 hover:shadow-amber-700/10 dark:bg-[#1e1916]/60 backdrop-blur-sm group">
      <div className="relative">
        <Image
          src={lore.image || "/placeholder.svg"}
          width={600}
          height={300}
          alt={lore.title}
          className="object-cover w-full h-48 transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1916]/80 via-transparent to-transparent"></div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSave}
            className="bg-[#1e1916]/80 hover:bg-amber-900/80 text-amber-400 hover:text-amber-300 rounded-full backdrop-blur-sm"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-amber-700/70 text-amber-100 hover:bg-amber-600/70 backdrop-blur-sm border border-amber-500/30">
            {lore.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-amber-100 font-display tracking-wide">{lore.title}</h3>
        </div>
        <div className="flex items-center text-sm text-amber-200 font-handwriting">
          <MapPin className="w-3 h-3 mr-1" />
          {lore.location}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className={`text-base text-amber-100 font-handwriting leading-relaxed ${!expanded && "line-clamp-3"}`}>
          {lore.content}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="p-0 text-amber-400 hover:text-amber-300 hover:bg-transparent"
        >
          {expanded ? "Read less" : "Read more"}
        </Button>
      </CardFooter>
    </Card>
  )
}

