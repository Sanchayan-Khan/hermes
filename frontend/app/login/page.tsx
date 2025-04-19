"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [showOtpPopup, setShowOtpPopup] = useState(false); // State to control OTP popup
  const router = useRouter();

  // Handle Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(
        "https://backend-sample-9f8f.onrender.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email, // Email entered by the user
            password: password, // Password entered by the user
            username: name, // Full name entered by the user
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShowOtpPopup(true); // Show the OTP popup
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        "https://backend-sample-9f8f.onrender.com/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email, // Email entered by the user
            otp: otp, // OTP entered by the user
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        handleLogin(); // Automatically log in the user
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("An error occurred during OTP verification. Please try again.");
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://backend-sample-9f8f.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: email, // Maps the input to the identifier field
            password: password, // Password entered by the user
          }),
        }
      );
      const data = await response.json();
      console.log("Login response:", data); // Log the response for debugging

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token in localStorage
        router.push("/"); // Redirect to the dashboard or home page
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleLogout = async () => {
    // 1. Remove the token from localStorage
    localStorage.removeItem("token"); // Web Storage API :contentReference[oaicite:8]{index=8} :contentReference[oaicite:9]{index=9}

    // 2. (Optional) Notify backend to clear cookie
    await fetch("https://backend-sample-9f8f.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    });

    // 3. Redirect to login page
    router.push("/login"); // Next.js client navigation :contentReference[oaicite:10]{index=10} :contentReference[oaicite:11]{index=11}
  };

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-brown p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
            <Input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setShowOtpPopup(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyOtp}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-amber-900/30">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                handleLogin(); // Call the login function
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="identifier">Username/Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Login</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
