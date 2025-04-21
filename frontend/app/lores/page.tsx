"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Lore {
  id: string;
  title: string;
  location: string;
  type: "Historical" | "Cultural" | "Folklore";
  content: string;
  image: string;
  userId: string;
  User?: {
    username: string;
  };
}

export default function LoresPage() {
  const [lores, setLores] = useState<Lore[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newLore, setNewLore] = useState<Lore>({
    id: "",
    title: "",
    location: "",
    type: "Historical",
    content: "",
    image: "",
    userId: "",
  });

  useEffect(() => {
    const fetchLores = async () => {
      try {
        const response = await fetch("https://backend-sample-9f8f.onrender.com/lores");
        const data = await response.json();
        setLores(data);
      } catch (error) {
        console.error("Error fetching lores:", error);
      }
    };

    fetchLores();
  }, []);

  const handleCreateLore = async () => {
    try {
      const response = await fetch("https://backend-sample-9f8f.onrender.com/lores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLore),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create lore");
      }

      const createdLore = await response.json();
      setLores([createdLore, ...lores]);
      setIsCreating(false);
      setNewLore({
        id: "",
        title: "",
        location: "",
        type: "Historical",
        content: "",
        image: "",
        userId: "",
      });
      toast.success("Lore created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create lore");
    }
  };

  const filteredLores = lores.filter(
    (lore) =>
      lore.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myLores = lores.filter((lore) => lore.userId === "currentUserId"); // Replace with actual user ID
  const othersLores = lores.filter((lore) => lore.userId !== "currentUserId");

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="Local Lores"
        description="Discover historical insights, folklore, and local legends from around the world"
        button={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                Add Lore
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Lore</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newLore.title}
                  onChange={(e) => setNewLore({ ...newLore, title: e.target.value })}
                />
                <Input
                  placeholder="Location"
                  value={newLore.location}
                  onChange={(e) => setNewLore({ ...newLore, location: e.target.value })}
                />
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newLore.type}
                  onChange={(e) => setNewLore({ ...newLore, type: e.target.value as "Historical" | "Cultural" | "Folklore" })}
                >
                  <option value="Historical">Historical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Folklore">Folklore</option>
                </select>
                <Textarea
                  placeholder="Content"
                  value={newLore.content}
                  onChange={(e) => setNewLore({ ...newLore, content: e.target.value })}
                />
                <Input
                  placeholder="Image URL"
                  value={newLore.image}
                  onChange={(e) => setNewLore({ ...newLore, image: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLore}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="relative mb-8">
        <Input
          placeholder="Search lores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">My Lores</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myLores.map((lore) => (
            <Card key={lore.id} className="overflow-hidden">
              {/* Render lore details */}
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Others' Lores</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {othersLores.map((lore) => (
            <Card key={lore.id} className="overflow-hidden">
              {/* Render lore details */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

