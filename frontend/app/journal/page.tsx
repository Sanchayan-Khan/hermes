"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState("all") // all, tags, location
  const [showMyJournals, setShowMyJournals] = useState(false)

  useEffect(() => {
    // Add a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const filteredEntries = entries.filter(entry => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    switch (searchFilter) {
      case "tags":
        return entry.tags.some(tag => tag.toLowerCase().includes(query));
      case "location":
        return entry.location.toLowerCase().includes(query);
      default:
        return (
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query) ||
          entry.location.toLowerCase().includes(query) ||
          entry.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
  });

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
          <div className="flex gap-3">
            <Button
              onClick={() => setShowMyJournals(!showMyJournals)}
              variant="outline"
              className="bg-amber-100/10 hover:bg-amber-200/20 text-amber-100 border-amber-600/30 font-medium"
            >
              My Journals
            </Button>
            <Button
              onClick={handleCreateEntry}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </div>
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
        <>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/60 w-4 h-4" />
              <Input
                placeholder="Search journals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-amber-100/10 border-amber-600/30 text-amber-100 placeholder:text-amber-600/60"
              />
            </div>
            <Select value={searchFilter} onValueChange={setSearchFilter}>
              <SelectTrigger className="w-[180px] bg-amber-100/10 border-amber-600/30 text-amber-100">
                <SelectValue placeholder="Search by..." />
              </SelectTrigger>
              <SelectContent className="bg-amber-900 border-amber-600/30">
                <SelectItem value="all" className="text-amber-100">All</SelectItem>
                <SelectItem value="tags" className="text-amber-100">Tags</SelectItem>
                <SelectItem value="location" className="text-amber-100">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                {filteredEntries.map((entry, index) => (
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
                {filteredEntries.slice(0, 2).map((entry, index) => (
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
                {filteredEntries.slice(0, 1).map((entry, index) => (
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
        </>
      )}
    </div>
  )
}

