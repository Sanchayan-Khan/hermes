"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, PenTool, Save, X, Tag } from "lucide-react";

interface JournalEditorProps {
  entry?: {
    id: string;
    title: string;
    date: string;
    location: string;
    content: string;
    image: string; // Single image URL
    tags: string[];
  };
  onSave: (entry: any) => void;
  onCancel: () => void;
}

export default function JournalEditor({
  entry,
  onSave,
  onCancel,
}: JournalEditorProps) {
  const [formData, setFormData] = useState({
    title: entry?.title || "",
    date: entry?.date || "",
    location: entry?.location || "",
    content: entry?.content || "",
    image: entry?.image || "", // Bind the image URL
    tags: entry?.tags.join(", ") || "", // Convert tags array to a comma-separated string
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEntry = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags back to an array
    };
    onSave(updatedEntry);
  };

  return (
    <Card className="border-amber-700/30 dark:bg-[#1e1916]/60 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-bold text-amber-200 font-display tracking-wide">
          {entry ? "Edit Journal Entry" : "Create New Journal Entry"}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-amber-300 hover:text-amber-200 hover:bg-amber-800/50"
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-amber-100"
            >
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div>
            <Label
              htmlFor="date"
              className="block text-sm font-medium text-amber-100"
            >
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div>
            <Label
              htmlFor="location"
              className="block text-sm font-medium text-amber-100"
            >
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div>
            <Label
              htmlFor="content"
              className="block text-sm font-medium text-amber-100"
            >
              Content
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div>
            <Label
              htmlFor="image"
              className="block text-sm font-medium text-amber-100"
            >
              Image URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="Enter the image URL"
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div>
            <Label
              htmlFor="tags"
              className="block text-sm font-medium text-amber-100"
            >
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="e.g., travel, adventure, nature"
              className="mt-1 bg-amber-900/20 border-amber-700/50 text-amber-100"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-amber-600/30 text-amber-200 hover:bg-amber-800/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
