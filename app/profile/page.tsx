"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Calendar, Edit, Camera, Globe, BookOpen, Send, Settings } from "lucide-react"
import PageHeader from "@/components/page-header"

// Sample user data
const userData = {
  name: "Alex Morgan",
  username: "traveler_alex",
  email: "alex@example.com",
  bio: "Adventure seeker and photography enthusiast. I've visited 23 countries and counting! Always planning my next journey.",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  avatar: "/placeholder.svg?height=200&width=200",
  coverPhoto: "/placeholder.svg?height=400&width=1200",
  stats: {
    journalEntries: 15,
    postcardsSent: 27,
    loresSaved: 8,
    countriesVisited: 23,
  },
  badges: [
    { id: "1", name: "Globetrotter", description: "Visited 20+ countries" },
    { id: "2", name: "Storyteller", description: "Created 10+ journal entries" },
    { id: "3", name: "Postcard Pro", description: "Sent 25+ postcards" },
  ],
  recentDestinations: [
    { id: "1", name: "Tokyo, Japan", date: "March 2024" },
    { id: "2", name: "Barcelona, Spain", date: "December 2023" },
    { id: "3", name: "Bali, Indonesia", date: "October 2023" },
  ],
}

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="My Profile"
        description="Manage your account and track your travel memories"
        button={
          <Button
            variant="outline"
            className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100 shadow-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        }
      />

      <div
        className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Cover Photo and Profile Section */}
        <div className="relative mb-8">
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden border-2 border-amber-600/30">
            <Image src={userData.coverPhoto || "/placeholder.svg"} alt="Cover photo" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1916]/80 via-[#1e1916]/30 to-transparent"></div>
          </div>

          <div className="absolute -bottom-16 left-4 md:left-8 p-1 bg-[#1e1916] rounded-full border-4 border-amber-600/30 shadow-lg">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <Image src={userData.avatar || "/placeholder.svg"} alt={userData.name} fill className="object-cover" />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-amber-600 rounded-full hover:bg-amber-700 transition-colors shadow-md">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="absolute bottom-4 left-36 md:left-48">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-100 font-display tracking-wide">
              {userData.name}
            </h1>
            <p className="text-amber-300 font-handwriting">@{userData.username}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-amber-500" />}
            value={userData.stats.journalEntries}
            label="Journal Entries"
          />
          <StatCard
            icon={<Send className="w-5 h-5 text-amber-500" />}
            value={userData.stats.postcardsSent}
            label="Postcards Sent"
          />
          <StatCard
            icon={<Bookmark className="w-5 h-5 text-amber-500" />}
            value={userData.stats.loresSaved}
            label="Lores Saved"
          />
          <StatCard
            icon={<Globe className="w-5 h-5 text-amber-500" />}
            value={userData.stats.countriesVisited}
            label="Countries Visited"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* User Info */}
          <Card className="md:col-span-1 border-amber-600/30 dark:bg-[#1e1916]/60 backdrop-blur-sm">
            <CardHeader>
              <h2 className="text-xl font-bold text-amber-100 font-display tracking-wide">About Me</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-amber-100 font-handwriting leading-relaxed">{userData.bio}</p>

              <div className="pt-4 space-y-2 border-t border-amber-600/30">
                <div className="flex items-center text-amber-200">
                  <Mail className="w-4 h-4 mr-2 text-amber-500" />
                  {userData.email}
                </div>
                <div className="flex items-center text-amber-200">
                  <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                  {userData.location}
                </div>
                <div className="flex items-center text-amber-200">
                  <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                  Joined {userData.joinDate}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-600/30">
                <h3 className="mb-2 text-lg font-medium text-amber-100 font-display">Travel Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center p-2 bg-amber-800/40 rounded-lg border border-amber-600/30 group hover:bg-amber-700/40 transition-colors cursor-help"
                      title={badge.description}
                    >
                      <div className="w-6 h-6 mr-2 bg-amber-600/50 rounded-full flex items-center justify-center text-amber-100 text-xs font-bold">
                        {badge.name.charAt(0)}
                      </div>
                      <span className="text-sm text-amber-100">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-2 border-amber-600/30 dark:bg-[#1e1916]/60 backdrop-blur-sm">
            <CardHeader>
              <h2 className="text-xl font-bold text-amber-100 font-display tracking-wide">Travel Activity</h2>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="destinations" className="w-full">
                <TabsList className="mb-6 bg-amber-900/30">
                  <TabsTrigger
                    value="destinations"
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
                  >
                    Recent Destinations
                  </TabsTrigger>
                  <TabsTrigger
                    value="journals"
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
                  >
                    Recent Journals
                  </TabsTrigger>
                  <TabsTrigger
                    value="postcards"
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
                  >
                    Recent Postcards
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="destinations" className="mt-0">
                  <div className="space-y-4">
                    {userData.recentDestinations.map((destination) => (
                      <div
                        key={destination.id}
                        className="p-4 bg-amber-800/20 rounded-lg border border-amber-600/30 flex items-center justify-between hover:bg-amber-800/30 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-4 bg-amber-700/50 rounded-full flex items-center justify-center">
                            <Globe className="w-5 h-5 text-amber-200" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-amber-100">{destination.name}</h3>
                            <p className="text-sm text-amber-300 font-handwriting">{destination.date}</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-700/70 text-amber-100 hover:bg-amber-600/70 backdrop-blur-sm border border-amber-500/30">
                          Visited
                        </Badge>
                      </div>
                    ))}

                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline"
                        className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100"
                      >
                        View All Destinations
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="journals" className="mt-0">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-4 bg-amber-800/20 rounded-lg border border-amber-600/30 hover:bg-amber-800/30 transition-colors"
                      >
                        <div className="flex items-center mb-2">
                          <BookOpen className="w-4 h-4 mr-2 text-amber-500" />
                          <h3 className="text-lg font-medium text-amber-100">Journal Entry #{i}</h3>
                        </div>
                        <p className="text-sm text-amber-200 mb-2 font-handwriting">
                          {["Paris Adventure", "Beach Day in Bali", "Hiking in the Alps", "Tokyo Exploration"][i - 1]}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-amber-300">
                            {["March 15", "February 2", "January 10", "April 5"][i - 1]}, 2024
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-400 hover:text-amber-300 hover:bg-amber-800/50 p-1 h-auto"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100"
                    >
                      View All Journal Entries
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="postcards" className="mt-0">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-4 bg-amber-800/20 rounded-lg border border-amber-600/30 hover:bg-amber-800/30 transition-colors"
                      >
                        <div className="flex items-center mb-2">
                          <Send className="w-4 h-4 mr-2 text-amber-500" />
                          <h3 className="text-lg font-medium text-amber-100">Postcard #{i}</h3>
                        </div>
                        <p className="text-sm text-amber-200 mb-2 font-handwriting">
                          Sent to: {["Mom & Dad", "Sarah", "Travel Group", "John"][i - 1]}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-amber-300">
                            From: {["Paris", "Bali", "Switzerland", "Tokyo"][i - 1]}
                          </span>
                          <Badge className="bg-amber-700/70 text-amber-100 hover:bg-amber-600/70 backdrop-blur-sm border border-amber-500/30">
                            Delivered
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100"
                    >
                      View All Postcards
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* World Map Visualization (Placeholder) */}
        <Card className="mt-8 border-amber-600/30 dark:bg-[#1e1916]/60 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <h2 className="text-xl font-bold text-amber-100 font-display tracking-wide">My Travel Map</h2>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 md:h-96 bg-amber-900/20 rounded-lg border border-amber-600/30 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                <Image src="/placeholder.svg?height=400&width=1200" alt="World map" fill className="object-cover" />
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto text-amber-500 mb-4" />
                <p className="text-amber-200 font-handwriting text-lg">
                  Your travel map visualization will appear here
                </p>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                  Explore Your Travels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <Card className="border-amber-600/30 dark:bg-[#1e1916]/60 backdrop-blur-sm hover:bg-amber-900/30 transition-colors group">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="p-3 mb-2 bg-amber-800/50 rounded-full w-fit shadow-inner group-hover:bg-amber-700/70 transition-colors">
          {icon}
        </div>
        <div className="text-2xl font-bold text-amber-100 mb-1 font-display">{value}</div>
        <div className="text-sm text-amber-300 font-handwriting">{label}</div>
      </CardContent>
    </Card>
  )
}

function Bookmark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}

