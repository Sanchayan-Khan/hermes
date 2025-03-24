"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mail, Lock, User } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login with:", email, password)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup with:", name, email, password)
  }

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full opacity-50 -z-10 dark:bg-amber-900/30"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 rounded-full opacity-40 -z-10 dark:bg-amber-800/20"></div>

      <div className="absolute top-10 left-1/4 rotate-[-10deg]">
        <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-md shadow-sm flex items-center justify-center dark:bg-amber-900/30 dark:border-amber-800">
          <Image
            src="/placeholder.svg?height=60&width=60"
            width={60}
            height={60}
            alt="Passport stamp"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-20 right-1/4 rotate-[5deg]">
        <div className="w-24 h-16 bg-amber-50 border border-amber-200 rounded-sm shadow-sm flex items-center justify-center dark:bg-amber-900/30 dark:border-amber-800">
          <div className="text-xs text-amber-700 font-medium dark:text-amber-200">TRAVEL TICKET</div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rotate-12 bg-amber-500 rounded-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">H</div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-center text-amber-900 font-serif dark:text-amber-100">
            Welcome to Hermes
          </h1>
          <p className="text-center text-amber-700 dark:text-amber-200">
            Your personal travel journal & postcard creator
          </p>
        </div>

        <div className="p-6 bg-white border border-amber-100 rounded-lg shadow-lg dark:bg-amber-950/20 dark:border-amber-900/50">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-amber-200 dark:border-amber-800"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-amber-600 hover:underline dark:text-amber-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-amber-200 dark:border-amber-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 border-amber-200 dark:border-amber-800"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-amber-200 dark:border-amber-800"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-500" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-amber-200 dark:border-amber-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-amber-700 dark:text-amber-200">
              By continuing, you agree to our{" "}
              <Link href="#" className="text-amber-600 hover:underline dark:text-amber-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-amber-600 hover:underline dark:text-amber-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

