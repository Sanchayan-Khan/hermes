"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Calendar,
  Globe,
  BookOpen,
  Send,
  Bookmark,
  Settings,
} from "lucide-react";
import PageHeader from "@/components/page-header";

// Define the type for userData
interface UserData {
  name: string;
  username: string;
  coverImage: string | null;
  profilePicture: string | null;
  stats: {
    journalEntries: number;
    postcardsSent: number;
    loresSaved: number;
    countriesVisited: number;
  };
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch(
          "https://backend-sample-9f8f.onrender.com/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: UserData = await response.json(); // Explicitly type the response
          setUserData(data);
          setIsLoaded(true);
        } else {
          localStorage.removeItem("token"); // Clear invalid token
          router.push("/login"); // Redirect to login
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    router.push("/"); // Redirect to home
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="My Profile"
        description="Manage your account and track your travel memories"
        button={
          <Button
            variant="outline"
            className="border-amber-600/50 text-amber-200 hover:bg-amber-800/50 hover:text-amber-100 shadow-md"
            onClick={handleLogout}
          >
            <Settings className="w-4 h-4 mr-2" />
            Logout
          </Button>
        }
      />

      <div
        className={`transition-all duration-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Cover Photo and Profile Section */}
        <div className="relative mb-8">
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden border-2 border-amber-600/30">
            <Image
              src={userData.coverImage || "/placeholder.svg"}
              alt="Cover photo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1916]/80 via-[#1e1916]/30 to-transparent"></div>
          </div>

          <div className="absolute -bottom-16 left-4 md:left-8 p-1 bg-[#1e1916] rounded-full border-4 border-amber-600/30 shadow-lg">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <Image
                src={userData.profilePicture || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-36 md:left-48">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-100 font-display tracking-wide">
              {userData.name}
            </h1>
            <p className="text-amber-300 font-handwriting">
              @{userData.username}
            </p>
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
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <Card className="border-amber-600/30 dark:bg-[#1e1916]/60 backdrop-blur-sm hover:bg-amber-900/30 transition-colors group">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="p-3 mb-2 bg-amber-800/50 rounded-full w-fit shadow-inner group-hover:bg-amber-700/70 transition-colors">
          {icon}
        </div>
        <div className="text-2xl font-bold text-amber-100 mb-1 font-display">
          {value}
        </div>
        <div className="text-sm text-amber-300 font-handwriting">{label}</div>
      </CardContent>
    </Card>
  );
}
