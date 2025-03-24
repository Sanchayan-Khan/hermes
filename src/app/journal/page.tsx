"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import JournalEntry from "@/components/journal-entry"
import JournalEditor from "@/components/journal-editor"

// Define a type for journal entries
interface JournalEntryType {
  id: string
  title: string
  date: string
  location: string
  content: string
  images: string[]
  tags: string[]
}

// Sample journal entries data
const sampleEntries: JournalEntryType[] = [
  {
    id: "1",
    title: "Paris Adventure",
    date: "March 15, 2024",
    location: "Paris, France",
    content: "Visited the Eiffel Tower today. The view from the top was breathtaking!",
    images: ["/placeholder.svg?height=400&width=600"],
    tags: ["europe", "city", "landmarks"],
  },
  {
    id: "2",
    title: "Beach Day in Bali",
    date: "February 2, 2024",
    location: "Bali, Indonesia",
    content: "Spent the day relaxing on the beach and swimming in the crystal clear water.",
    images: ["/placeholder.svg?height=400&width=600"],
    tags: ["asia", "beach", "relaxation"],
  },
  {
    id: "3",
    title: "Hiking in the Alps",
    date: "January 10, 2024",
    location: "Swiss Alps, Switzerland",
    content: "Challenging hike today, but the mountain views were worth every step!",
    images: ["/placeholder.svg?height=400&width=600"],
    tags: ["europe", "mountains", "hiking"],
  },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntryType[]>(sampleEntries)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const handleCreateEntry = () => {
    setIsCreating(true)
    setSelectedEntry(null)
  }

  const handleEditEntry = (id: string) => {
    setSelectedEntry(id)
    setIsCreating(false)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    if (selectedEntry === id) {
      setSelectedEntry(null)
    }
  }

  const handleSaveEntry = (entry: Partial<JournalEntryType>) => {
    if (selectedEntry) {
      // Update existing entry
      setEntries(entries.map((e) => (e.id === selectedEntry ? { ...e, ...entry } : e)))
      setSelectedEntry(null)
    } else if (isCreating) {
      // Create new entry
      const newEntry: JournalEntryType = {
        id: Date.now().toString(),
        title: entry.title || "Untitled",
        date: entry.date || new Date().toLocaleDateString(),
        location: entry.location || "Unknown",
        content: entry.content || "",
        images: entry.images || [],
        tags: entry.tags || [],
      }
      setEntries([newEntry, ...entries])
      setIsCreating(false)
    }
  }

  const handleCancelEdit = () => {
    setIsCreating(false)
    setSelectedEntry(null)
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 font-serif dark:text-amber-100">Travel Journal</h1>
          <p className="text-amber-700 dark:text-amber-200">Document your adventures in a beautiful scrapbook style</p>
        </div>
        <Button onClick={handleCreateEntry} className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {isCreating || selectedEntry ? (
        <JournalEditor
          entry={selectedEntry ? entries.find((e) => e.id === selectedEntry) : undefined}
          onSave={handleSaveEntry}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All Entries</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <JournalEntry
                  key={entry.id}
                  entry={entry}
                  onEdit={() => handleEditEntry(entry.id)}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.slice(0, 2).map((entry) => (
                <JournalEntry
                  key={entry.id}
                  entry={entry}
                  onEdit={() => handleEditEntry(entry.id)}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.slice(0, 1).map((entry) => (
                <JournalEntry
                  key={entry.id}
                  entry={entry}
                  onEdit={() => handleEditEntry(entry.id)}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
