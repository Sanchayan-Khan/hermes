"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, ImageIcon, PenTool, Save, X, Plus, Tag } from "lucide-react"

interface JournalEditorProps {
  entry?: any
  onSave: (entry: any) => void
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

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    const placeholderImage = "/placeholder.svg?height=400&width=600"
    setImages([...images, placeholderImage])
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

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

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <ImageIcon className="w-4 h-4" />
            Photos
          </Label>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  src={image || "/placeholder.svg"}
                  width={150}
                  height={150}
                  alt={`Journal image ${index + 1}`}
                  className="object-cover w-full h-24 rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddImage}
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md border-amber-200 text-amber-500 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-900/30"
            >
              <Plus className="w-6 h-6" />
              <span className="text-xs">Add Photo</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            Tags
          </Label>

          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center px-2 py-1 text-xs bg-amber-100 rounded-full text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="border-amber-200 dark:border-amber-800"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button
              onClick={handleAddTag}
              variant="outline"
              className="border-amber-200 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/30"
            >
              Add
            </Button>
          </div>
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

