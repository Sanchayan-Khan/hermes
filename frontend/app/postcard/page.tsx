"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, ImageIcon, Stamp, Type, PenTool, MapPin, RotateCcw, Download, Mail } from "lucide-react"
import PageHeader from "@/components/page-header"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

interface Postcard {
  id: string;
  message: string;
  location: string;
  backgroundImage: string;
  fontStyle: "handwritten" | "modern" | "vintage";
  stamp: "classic" | "travel" | "none";
  sender?: {
    id: string;
    username: string;
    email: string;
  };
  recipient?: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: string;
}

export default function PostcardPage() {
  const router = useRouter();
  const [postcardFront, setPostcardFront] = useState("/placeholder.svg?height=400&width=600")
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("")
  const [location, setLocation] = useState("")
  const [font, setFont] = useState<"handwritten" | "modern" | "vintage">("handwritten")
  const [stamp, setStamp] = useState<"classic" | "travel" | "none">("classic")
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [view, setView] = useState("create")
  const [sentPostcards, setSentPostcards] = useState<Postcard[]>([])
  const [receivedPostcards, setReceivedPostcards] = useState<Postcard[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFontChange = (value: "handwritten" | "modern" | "vintage") => {
    setFont(value);
  };

  const handleStampChange = (value: "classic" | "travel" | "none") => {
    setStamp(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (view === "sent") {
      fetchSentPostcards()
    } else if (view === "received") {
      fetchReceivedPostcards()
    }
  }, [view])

  const fetchSentPostcards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("https://backend-sample-9f8f.onrender.com/postcards/sent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch sent postcards");
      const data = await response.json();
      setSentPostcards(data);
    } catch (error) {
      toast.error("Failed to load sent postcards");
    }
  };

  const fetchReceivedPostcards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("https://backend-sample-9f8f.onrender.com/postcards/received", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch received postcards");
      const data = await response.json();
      setReceivedPostcards(data);
    } catch (error) {
      toast.error("Failed to load received postcards");
    }
  };

  const handleSendPostcard = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("https://backend-sample-9f8f.onrender.com/postcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          location,
          backgroundImage: postcardFront,
          fontStyle: font,
          stamp,
          recipient, // username of recipient
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send postcard");
      }

      toast.success("Postcard sent successfully!");
      setView("sent");
      await fetchSentPostcards();
      // Reset form
      setMessage("");
      setRecipient("");
      setLocation("");
      setPostcardFront("/placeholder.svg?height=400&width=600");
      setFont("handwritten");
      setStamp("classic");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send postcard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleDownload = () => {
    alert("Postcard downloaded!")
  }

  const fontClasses = {
    handwritten: "font-handwriting",
    modern: "font-sans",
    vintage: "font-display",
  }

  const stampOptions = [
    { value: "classic", label: "Classic Stamp" },
    { value: "travel", label: "Travel Stamp" },
    { value: "none", label: "No Stamp" }
  ]

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Postcards" 
        description="Create, send, and view your postcards" 
        button={
          view === "create" ? undefined : (
            <Button
              onClick={() => setView("create")}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Create New Postcard
            </Button>
          )
        }
      />

      <Tabs value={view} onValueChange={setView} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-amber-900/30">
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Create
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Sent
          </TabsTrigger>
          <TabsTrigger
            value="received"
            className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
          >
            Received
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <div className="grid gap-8 lg:grid-cols-2">
            <div
              className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="relative mb-12">
                <div className="perspective w-full max-w-md mx-auto">
                  <div
                    className={`relative transition-all duration-700 w-full h-[300px] preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-amber-600/30 shadow-lg"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={postcardFront || "/placeholder.svg"}
                          alt="Postcard front"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-3 right-3 w-16 h-16 border-2 border-amber-300/30 rounded-full flex items-center justify-center">
                          <div className="text-xs text-amber-100 font-handwriting text-center">
                            TRAVEL
                            <br />
                            MEMORIES
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-base font-medium text-white bg-black/40 backdrop-blur-sm">
                          {location || "Add a location"}
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden border-2 border-amber-600/30 shadow-lg bg-[#2a2522]"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;4&quot; height=&quot;4&quot; viewBox=&quot;0 0 4 4&quot;%3E%3Cpath fill=&quot;%239C8362&quot; fillOpacity=&quot;0.2&quot; d=&quot;M1 3h1v1H1V3zm2-2h1v1H3V1z&quot;%3E%3C/path%3E%3C/svg%3E')] opacity-30"></div>
                      <div className="relative p-4 h-full">
                        <div className="absolute top-4 right-4">
                          {stamp === "classic" && (
                            <div className="w-16 h-16 p-1 border border-amber-500/50 rounded-sm shadow-inner">
                              <div className="flex items-center justify-center w-full h-full text-xs text-center bg-amber-800/50 text-amber-100 font-handwriting">
                                STAMP
                              </div>
                            </div>
                          )}
                          {stamp === "travel" && (
                            <div className="w-16 h-16 p-1 border border-amber-500/50 rounded-sm shadow-inner">
                              <div className="flex items-center justify-center w-full h-full text-xs text-center bg-amber-700/50 text-amber-100 font-handwriting">
                                TRAVEL
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="grid h-full grid-cols-2 gap-4">
                          <div className="flex flex-col justify-between">
                            <div
                              className={`text-base ${fontClasses[font as keyof typeof fontClasses]} text-amber-100 leading-relaxed`}
                            >
                              {message || "Your message will appear here..."}
                            </div>
                            <div className="text-base font-medium text-amber-100 mt-4">
                              {recipient ? `To: ${recipient}` : "To: Recipient Name"}
                            </div>
                          </div>
                          <div className="flex flex-col justify-end pl-4 border-l border-amber-500/50">
                            <div className="mb-4 text-base text-amber-100">
                              {location ? `Sent from ${location}` : "Location"}
                            </div>
                            <div className="text-sm text-amber-200 font-handwriting">{new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleFlip}
                    variant="outline"
                    className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100 shadow-md"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {isFlipped ? "View Front" : "View Back"}
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-8">
                <Button
                  onClick={handleSendPostcard}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Postcard
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100 shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div
              className={`transition-all duration-500 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-amber-900/30">
                  <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="design"
                    className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
                  >
                    Design
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-1 text-amber-200">
                      <PenTool className="w-4 h-4" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="min-h-32 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50 font-handwriting"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-1 text-amber-200">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Paris, France"
                      className="border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50 font-handwriting"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient" className="flex items-center gap-1 text-amber-200">
                      <Mail className="w-4 h-4" />
                      Recipient
                    </Label>
                    <Input
                      id="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Recipient's Name"
                      className="border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50 font-handwriting"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="design" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1 text-amber-200">
                      <ImageIcon className="w-4 h-4" />
                      Background Image
                    </Label>
                    <Input
                      value={postcardFront}
                      onChange={(e) => setPostcardFront(e.target.value)}
                      placeholder="Enter image URL"
                      className="border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font" className="flex items-center gap-1 text-amber-200">
                      <Type className="w-4 h-4" />
                      Font Style
                    </Label>
                    <Select value={font} onValueChange={handleFontChange}>
                      <SelectTrigger className="border-amber-700/50 bg-amber-900/20 text-amber-100">
                        <SelectValue placeholder="Select a font style" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2522] border-amber-700/50">
                        <SelectItem
                          value="handwritten"
                          className="text-amber-100 focus:bg-amber-800/50 focus:text-amber-100"
                        >
                          Handwritten
                        </SelectItem>
                        <SelectItem value="modern" className="text-amber-100 focus:bg-amber-800/50 focus:text-amber-100">
                          Modern
                        </SelectItem>
                        <SelectItem value="vintage" className="text-amber-100 focus:bg-amber-800/50 focus:text-amber-100">
                          Vintage
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stamp" className="flex items-center gap-1 text-amber-200">
                      <Stamp className="w-4 h-4" />
                      Stamp
                    </Label>
                    <Select value={stamp} onValueChange={handleStampChange}>
                      <SelectTrigger className="border-amber-700/50 bg-amber-900/20 text-amber-100">
                        <SelectValue placeholder="Select a stamp" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2522] border-amber-700/50">
                        {stampOptions.map(option => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value} 
                            className="text-amber-100 focus:bg-amber-800/50 focus:text-amber-100"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sentPostcards.map((postcard) => (
              <div
                key={postcard.id}
                className="relative overflow-hidden transition-all duration-300 transform border rounded-lg shadow-lg group hover:scale-105 border-amber-600/30"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={postcard.backgroundImage}
                    alt={`Postcard to ${postcard.recipient?.username}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="mb-1 text-sm font-medium">To: {postcard.recipient?.username}</p>
                  <p className="text-xs text-amber-200">{postcard.location}</p>
                  <p className="text-xs text-amber-200">{new Date(postcard.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="received">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {receivedPostcards.map((postcard) => (
              <div
                key={postcard.id}
                className="relative overflow-hidden transition-all duration-300 transform border rounded-lg shadow-lg group hover:scale-105 border-amber-600/30"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={postcard.backgroundImage}
                    alt={`Postcard from ${postcard.sender?.username}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="mb-1 text-sm font-medium">From: {postcard.sender?.username}</p>
                  <p className="text-xs text-amber-200">{postcard.location}</p>
                  <p className="text-xs text-amber-200">{new Date(postcard.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

