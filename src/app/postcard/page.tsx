"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, ImageIcon, Stamp, Type, PenTool, MapPin, RotateCcw, Download, Mail } from "lucide-react"

export default function PostcardPage() {
  const [postcardFront, setPostcardFront] = useState("/placeholder.svg?height=400&width=600")
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("")
  const [sender, setSender] = useState("")
  const [location, setLocation] = useState("")
  const [font, setFont] = useState("handwritten")
  const [stamp, setStamp] = useState("1")
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleSendPostcard = () => {
    // In a real app, this would send the postcard
    alert("Postcard sent successfully!")
  }

  const handleDownload = () => {
    // In a real app, this would download the postcard
    alert("Postcard downloaded!")
  }

  const fontClasses = {
    handwritten: "font-serif italic",
    modern: "font-sans",
    vintage: "font-serif",
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 font-serif dark:text-amber-100">Create a Postcard</h1>
          <p className="text-amber-700 dark:text-amber-200">
            Design and send beautiful postcards to friends and family
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative mb-6 perspective">
            <div
              className={`relative w-full transition-all duration-500 transform-gpu preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of postcard */}
              <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                <Card className="overflow-hidden border-2 border-amber-200 shadow-lg aspect-[3/2] dark:border-amber-800">
                  <CardContent className="relative p-0">
                    <Image
                      src={postcardFront || "/placeholder.svg"}
                      width={600}
                      height={400}
                      alt="Postcard front"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-sm font-medium text-white bg-black/30 backdrop-blur-sm">
                      {location || "Add a location"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Back of postcard */}
              <div
                className="absolute inset-0 rotate-y-180 backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <Card className="overflow-hidden border-2 border-amber-200 shadow-lg aspect-[3/2] bg-[#f9f7f2] dark:border-amber-800 dark:bg-amber-950/40">
                  <CardContent className="relative p-4">
                    <div className="absolute top-4 right-4">
                      {stamp === "1" && (
                        <div className="w-16 h-16 p-1 border border-amber-300 rounded-sm dark:border-amber-700">
                          <div className="flex items-center justify-center w-full h-full text-xs text-center bg-amber-100 dark:bg-amber-900/50">
                            STAMP
                          </div>
                        </div>
                      )}
                      {stamp === "2" && (
                        <div className="w-16 h-16 p-1 border border-amber-300 rounded-sm dark:border-amber-700">
                          <div className="flex items-center justify-center w-full h-full text-xs text-center bg-amber-200 dark:bg-amber-800/50">
                            TRAVEL
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid h-full grid-cols-2 gap-4">
                      <div className="flex flex-col justify-between">
                        <div
                          className={`text-sm ${fontClasses[font as keyof typeof fontClasses]} text-amber-900 dark:text-amber-100`}
                        >
                          {message || "Your message will appear here..."}
                        </div>
                        <div className="text-sm font-medium text-amber-800 dark:text-amber-200">
                          {sender ? `From: ${sender}` : "From: Your Name"}
                        </div>
                      </div>

                      <div className="flex flex-col justify-end pl-4 border-l border-amber-300 dark:border-amber-700">
                        <div className="mb-4 text-sm text-amber-800 dark:text-amber-200">
                          {recipient ? `To: ${recipient}` : "To: Recipient Name"}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-300">
                          {location ? `Sent from ${location}` : "Location"}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-300">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button
              onClick={handleFlip}
              variant="outline"
              size="sm"
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-amber-200 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/30"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Flip Postcard
            </Button>
          </div>

          <div className="flex gap-2 mt-12">
            <Button onClick={handleSendPostcard} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              Send Postcard
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-amber-200 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="recipient">Recipient</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-1">
                  <PenTool className="w-4 h-4" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="min-h-32 border-amber-200 dark:border-amber-800"
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

              <div className="space-y-2">
                <Label htmlFor="sender" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  From
                </Label>
                <Input
                  id="sender"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your Name"
                  className="border-amber-200 dark:border-amber-800"
                />
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  Background Image
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPostcardFront("/placeholder.svg?height=400&width=600")}
                    className="overflow-hidden border-2 rounded-md aspect-video border-amber-200 hover:border-amber-500 dark:border-amber-800 dark:hover:border-amber-500"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      width={100}
                      height={60}
                      alt="Background option 1"
                      className="object-cover w-full h-full"
                    />
                  </button>
                  <button
                    onClick={() => setPostcardFront("/placeholder.svg?height=400&width=600")}
                    className="overflow-hidden border-2 rounded-md aspect-video border-amber-200 hover:border-amber-500 dark:border-amber-800 dark:hover:border-amber-500"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      width={100}
                      height={60}
                      alt="Background option 2"
                      className="object-cover w-full h-full"
                    />
                  </button>
                  <button
                    onClick={() => setPostcardFront("/placeholder.svg?height=400&width=600")}
                    className="overflow-hidden border-2 rounded-md aspect-video border-amber-200 hover:border-amber-500 dark:border-amber-800 dark:hover:border-amber-500"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      width={100}
                      height={60}
                      alt="Background option 3"
                      className="object-cover w-full h-full"
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font" className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  Font Style
                </Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger className="border-amber-200 dark:border-amber-800">
                    <SelectValue placeholder="Select a font style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="handwritten">Handwritten</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stamp" className="flex items-center gap-1">
                  <Stamp className="w-4 h-4" />
                  Stamp
                </Label>
                <Select value={stamp} onValueChange={setStamp}>
                  <SelectTrigger className="border-amber-200 dark:border-amber-800">
                    <SelectValue placeholder="Select a stamp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Classic Stamp</SelectItem>
                    <SelectItem value="2">Travel Stamp</SelectItem>
                    <SelectItem value="3">No Stamp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="recipient" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient's Name"
                  className="border-amber-200 dark:border-amber-800"
                />
              </div>

              <div className="p-4 border rounded-md border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                <h4 className="mb-2 font-medium text-amber-800 dark:text-amber-200">Delivery Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="digital" name="delivery" className="mr-2" defaultChecked />
                    <Label htmlFor="digital" className="text-sm text-amber-700 dark:text-amber-300">
                      Digital Delivery (Email)
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="print" name="delivery" className="mr-2" />
                    <Label htmlFor="print" className="text-sm text-amber-700 dark:text-amber-300">
                      Print & Mail (Additional fee)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                <h4 className="mb-2 font-medium text-amber-800 dark:text-amber-200">Schedule Delivery</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="now" name="schedule" className="mr-2" defaultChecked />
                    <Label htmlFor="now" className="text-sm text-amber-700 dark:text-amber-300">
                      Send Now
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="later" name="schedule" className="mr-2" />
                    <Label htmlFor="later" className="text-sm text-amber-700 dark:text-amber-300">
                      Schedule for Later
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

