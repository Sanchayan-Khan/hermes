"use client"

import { useState } from "react"
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, PenTool, Save, X} from "lucide-react"

interface JournalEntry {
  title: string
  date: string
  location: string
  content: string
  images: string[]
  tags: string[]
}

interface JournalEditorProps {
  entry?: JournalEntry
  onSave: (entry: JournalEntry) => void
  onCancel: () => void
}

export default function JournalEditor({ entry, onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState(entry?.title || "")
  const [date, setDate] = useState(entry?.date || new Date().toISOString().split("T")[0])
  const [location, setLocation] = useState(entry?.location || "")
  const [content, setContent] = useState(entry?.content || "")
  const [images, setImages] = useState<string[]>(entry?.images || [])
  const [tags, setTags] = useState<string[]>(entry?.tags || [])
  const [newTag, setNewTag] = useState("")
  setImages(entry?.images || [])
  setTags(entry?.tags || [])
  console.log(newTag)
  setNewTag("")  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const handleSave = () => {
    const formattedDate = formatDate(date)
    onSave({
      title,
      date: formattedDate,
      location,
      content,
      images,
      tags,
    })
  }

  // const handleAddImage = () => {
  //   const placeholderImage = "/placeholder.svg?height=400&width=600"
  //   setImages([...images, placeholderImage])
  // }

  // const handleRemoveImage = (index: number) => {
  //   setImages(images.filter((_, i) => i !== index))
  // }

  // const handleAddTag = () => {
  //   if (newTag && !tags.includes(newTag)) {
  //     setTags([...tags, newTag])
  //     setNewTag("")
  //   }
  // }

  // const handleRemoveTag = (tag: string) => {
  //   setTags(tags.filter((t) => t !== tag))
  // }

  return (
    <Card className="border-amber-100 dark:border-amber-900/50 dark:bg-amber-950/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-bold text-amber-900 font-serif dark:text-amber-100">
          {entry ? "Edit Journal Entry" : "Create New Journal Entry"}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/50"
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Amazing Adventure"
            className="border-amber-200 dark:border-amber-800"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-amber-200 dark:border-amber-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Paris, France"
              className="border-amber-200 dark:border-amber-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="flex items-center gap-1">
            <PenTool className="w-4 h-4" />
            Journal Entry
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your adventure..."
            className="min-h-32 border-amber-200 dark:border-amber-800"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSave} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Journal Entry
        </Button>
      </CardFooter>
    </Card>
  )
}
