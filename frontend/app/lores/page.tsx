"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";

interface Lore {
  id: string;
  title: string;
  location: string;
  type: "Historical" | "Cultural" | "Folklore";
  content: string;
  image: string;
  User?: {
    username: string;
  };
}

export default function LoresPage() {
  const [lores, setLores] = useState<Lore[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLores = async () => {
      try {
        const response = await fetch("/api/lores");
        const data = await response.json();
        setLores(data);
      } catch (error) {
        console.error("Error fetching lores:", error);
      }
    };

    fetchLores();
  }, []);

  const filteredLores = lores.filter(
    (lore) =>
      lore.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lore.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="Local Lores"
        description="Discover historical insights, folklore, and local legends from around the world"
      />

      <div className="relative mb-8">
        <Input
          placeholder="Search lores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-amber-700/50 bg-amber-900/20 text-amber-100 placeholder:text-amber-500/50"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLores.map((lore) => (
          <Card key={lore.id} className="overflow-hidden">
            <CardHeader>
              <h3 className="text-xl font-bold">{lore.title}</h3>
              <p>{lore.location}</p>
            </CardHeader>
            <CardContent>
              <p>{lore.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

