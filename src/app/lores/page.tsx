"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bookmark, BookmarkCheck } from "lucide-react"

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
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 font-serif dark:text-amber-100">Local Lores</h1>
          <p className="text-amber-700 dark:text-amber-200">
            Discover historical insights, folklore, and local legends from around the world
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
          <Input
            placeholder="Search lores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-amber-200 dark:border-amber-800"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Lores</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="folklore">Folklore</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores.map((lore) => (
              <LoreCard
                key={lore.id}
                lore={lore}
                isSaved={savedLores.includes(lore.id)}
                onToggleSave={() => toggleSaveLore(lore.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historical" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Historical")
              .map((lore) => (
                <LoreCard
                  key={lore.id}
                  lore={lore}
                  isSaved={savedLores.includes(lore.id)}
                  onToggleSave={() => toggleSaveLore(lore.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Cultural")
              .map((lore) => (
                <LoreCard
                  key={lore.id}
                  lore={lore}
                  isSaved={savedLores.includes(lore.id)}
                  onToggleSave={() => toggleSaveLore(lore.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="folklore" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => lore.type === "Folklore")
              .map((lore) => (
                <LoreCard
                  key={lore.id}
                  lore={lore}
                  isSaved={savedLores.includes(lore.id)}
                  onToggleSave={() => toggleSaveLore(lore.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLores
              .filter((lore) => savedLores.includes(lore.id))
              .map((lore) => (
                <LoreCard key={lore.id} lore={lore} isSaved={true} onToggleSave={() => toggleSaveLore(lore.id)} />
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
    <Card className="overflow-hidden transition-all border-amber-100 hover:shadow-md dark:border-amber-900/50 dark:bg-amber-950/20">
      <div className="relative">
        <Image
          src={lore.image || "/placeholder.svg"}
          width={600}
          height={300}
          alt={lore.title}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSave}
            className="bg-white/80 hover:bg-white text-amber-600 hover:text-amber-700 rounded-full dark:bg-amber-950/80 dark:hover:bg-amber-900"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/70 dark:text-amber-200 dark:hover:bg-amber-800">
            {lore.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-amber-900 font-serif dark:text-amber-100">{lore.title}</h3>
        </div>
        <div className="flex items-center text-sm text-amber-700 dark:text-amber-300">
          <MapPin className="w-3 h-3 mr-1" />
          {lore.location}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className={`text-sm text-amber-800 dark:text-amber-200 ${!expanded && "line-clamp-3"}`}>{lore.content}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="p-0 text-amber-600 hover:text-amber-800 hover:bg-transparent dark:text-amber-300 dark:hover:text-amber-100"
        >
          {expanded ? "Read less" : "Read more"}
        </Button>
      </CardFooter>
    </Card>
  )
}

