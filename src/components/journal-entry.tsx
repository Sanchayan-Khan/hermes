"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Heart, MapPin, Calendar, Trash2 } from "lucide-react"

interface JournalEntryProps {
  entry: {
    id: string
    title: string
    date: string
    location: string
    content: string
    images: string[]
    tags: string[]
  }
  onEdit: () => void
  onDelete: () => void
}

export default function JournalEntry({ entry, onEdit, onDelete }: JournalEntryProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [rotation] = useState(() => Math.random() * 6 - 3) // Random rotation between -3 and 3 degrees

  return (
    <Card
      className="overflow-hidden transition-all border-amber-100 hover:shadow-md dark:border-amber-900/50 dark:bg-amber-950/20"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative">
        <Image
          src={entry.images[0] || "/placeholder.svg"}
          width={600}
          height={400}
          alt={entry.title}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-50/30 to-transparent"></div>
        <div
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm cursor-pointer hover:bg-amber-50 dark:bg-amber-900 dark:hover:bg-amber-800"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-amber-400"}`} />
        </div>

        {/* Decorative tape */}
        <div className="absolute top-0 left-6 w-12 h-6 bg-amber-300/70 dark:bg-amber-600/70 transform -translate-y-1"></div>
      </div>

      <CardContent className="p-4">
        <h3 className="mb-2 text-xl font-bold text-amber-900 font-serif dark:text-amber-100">{entry.title}</h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-xs text-amber-700 dark:text-amber-300">
            <Calendar className="w-3 h-3 mr-1" />
            {entry.date}
          </div>
          <div className="flex items-center text-xs text-amber-700 dark:text-amber-300">
            <MapPin className="w-3 h-3 mr-1" />
            {entry.location}
          </div>
        </div>

        <p className="mb-4 text-sm text-amber-800 dark:text-amber-200">{entry.content}</p>

        <div className="flex flex-wrap gap-1">
          {entry.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/50"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-amber-700 hover:text-red-600 hover:bg-red-50 dark:text-amber-300 dark:hover:bg-red-900/20 dark:hover:text-red-300"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

