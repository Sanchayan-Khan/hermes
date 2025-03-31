"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mail, Lock, User } from "lucide-react"
import { useLoadingContext } from "@/components/loading-provider"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { setIsLoading } = useLoadingContext()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      router.push("/journal")
    }, 800)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    setTimeout(() => {
      router.push("/journal")
    }, 800)
  }

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/5 rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-400/5 rounded-full -z-10"></div>

      <div className="absolute top-10 left-1/4 rotate-[-10deg]">
        <div className="w-20 h-20 bg-amber-900/30 border border-amber-700/30 rounded-md shadow-inner flex items-center justify-center backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-amber-700/20 flex items-center justify-center font-handwriting text-amber-300 text-xs text-center transform rotate-[3deg]">
            PASSPORT
            <br />
            STAMP
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-1/4 rotate-[5deg]">
        <div className="w-24 h-16 bg-amber-900/30 border border-amber-700/30 rounded-sm shadow-inner flex items-center justify-center backdrop-blur-sm">
          <div className="text-xs text-amber-300 font-handwriting font-medium">TRAVEL TICKET</div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2 group">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rotate-12 bg-amber-500 rounded-sm group-hover:rotate-[20deg] transition-transform duration-300 shadow-lg"></div>
              <div className="absolute top-[-5px] right-[-5px] w-6 h-6">
                <div className="absolute w-full h-full rounded-full bg-amber-200/40 animate-ping"></div>
                <div className="absolute w-full h-full rounded-full bg-amber-200/60"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold font-display text-3xl">
                H
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-center text-amber-200 font-display tracking-wide">
            Welcome to Hermes
          </h1>
          <p className="text-center text-amber-300 font-handwriting text-lg">
            Your personal travel journal & postcard creator
          </p>
        </div>

        <div className="p-6 bg-[#1e1916]/60 border border-amber-700/30 rounded-lg shadow-lg backdrop-blur-sm">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-amber-900/30">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-amber-100 data-[state=active]:shadow-inner font-medium"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-amber-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-amber-200">
                      Password
                    </Label>
                    <Link href="#" className="text-xs text-amber-500 hover:text-amber-400 hover:underline font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-200">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-amber-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-amber-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-amber-300 font-handwriting">
              By continuing, you agree to our{" "}
              <Link href="#" className="text-amber-500 hover:text-amber-400 hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-amber-500 hover:text-amber-400 hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

