"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import JournalEntry from "@/components/journal-entry"
import JournalEditor from "@/components/journal-editor"
import PageHeader from "@/components/page-header"

// Sample journal entries data
const sampleEntries = [
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
  const [entries, setEntries] = useState(sampleEntries)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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

  const handleSaveEntry = (entry: any) => {
    if (selectedEntry) {
      // Update existing entry
      setEntries(entries.map((e) => (e.id === selectedEntry ? { ...e, ...entry } : e)))
      setSelectedEntry(null)
    } else if (isCreating) {
      // Create new entry
      const newEntry = {
        id: Date.now().toString(),
        ...entry,
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
      <PageHeader
        title="Travel Journal"
        description="Document your adventures in a beautiful scrapbook style"
        button={
          <Button
            onClick={handleCreateEntry}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        }
      />

      {isCreating || selectedEntry ? (
        <div
          className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <JournalEditor
            entry={selectedEntry ? entries.find((e) => e.id === selectedEntry) : undefined}
            onSave={handleSaveEntry}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-amber-900/30">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
              >
                All Entries
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
              >
                Favorites
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <JournalEntry
                    entry={entry}
                    onEdit={() => handleEditEntry(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.slice(0, 2).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <JournalEntry
                    entry={entry}
                    onEdit={() => handleEditEntry(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.slice(0, 1).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <JournalEntry
                    entry={entry}
                    onEdit={() => handleEditEntry(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

