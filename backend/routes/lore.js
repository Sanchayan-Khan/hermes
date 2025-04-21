"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/**
 * @typedef {Object} Lore
 * @property {string} id
 * @property {string} title
 * @property {string} location
 * @property {"Historical"|"Cultural"|"Folklore"} type
 * @property {string} content
 * @property {string} image
 * @property {string} userId
 * @property {Object} [creator]
 * @property {string} [creator.username]
 */

export default function LoresPage() {
  const [lores, setLores] = useState([]);
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
        const response = await fetch("https://backend-sample-9f8f.onrender.com/lore");
        const data = await response.json();
        setLores(data);
      } catch (error) {
        console.error("Error fetching lores:", error);
      }
    };

    fetchLores();
  }, []);

  const token = localStorage.getItem("token");
  let currentUserId = "";

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
    currentUserId = decodedToken.id; // Extract the user ID from the token
  }

  const myLores = lores.filter((lore) => lore.userId === currentUserId);
  const othersLores = lores.filter((lore) => lore.userId !== currentUserId);

  const handleCreateLore = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://backend-sample-9f8f.onrender.com/lore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLore),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create lore");
      }

      const createdLore = await response.json();
      setLores([createdLore, ...lores]); // Add the new lore to the state
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
                  onChange={(e) => setNewLore({ ...newLore, type: e.target.value })}
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
              <CardHeader>
                <h3 className="text-xl font-bold">{lore.title}</h3>
                <p>{lore.location}</p>
                <p className="text-sm text-gray-500">By: {lore.creator?.username || "Unknown"}</p>
              </CardHeader>
              <CardContent>
                <p>{lore.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Others' Lores</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {othersLores.map((lore) => (
            <Card key={lore.id} className="overflow-hidden">
              <CardHeader>
                <h3 className="text-xl font-bold">{lore.title}</h3>
                <p>{lore.location}</p>
                <p className="text-sm text-gray-500">By: {lore.creator?.username || "Unknown"}</p>
              </CardHeader>
              <CardContent>
                <p>{lore.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// routes/lore.js
const express = require("express");
const { Op } = require("sequelize");
const Lore = require("../models/Lore");
const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new lore (requires login)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, location, type, content, image } = req.body;
    
    // Validate required fields
    if (!title || !location || !type || !content || !image) {
      return res.status(400).json({
        message: "Title, location, type, content, and image are required.",
      });
    }

    // Validate lore type
    if (!["Historical", "Cultural", "Folklore"].includes(type)) {
      return res.status(400).json({
        message: "Type must be one of: Historical, Cultural, Folklore",
      });
    }

    const newLore = await Lore.create({
      title,
      location,
      type,
      content,
      image,
      userId: req.user.id, // Ensure this is set correctly
    });

    // Include user data in response
    const loreWithUser = await Lore.findByPk(newLore.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.status(201).json(loreWithUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get all lores (no login required)
router.get("/", async (req, res) => {
  try {
    const lores = await Lore.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const token = localStorage.getItem("token");
    let currentUserId = "";

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
      currentUserId = decodedToken.id; // Extract the user ID from the token
    }

    console.log("Current User ID:", currentUserId);

    const myLores = lores.filter((lore) => lore.userId === currentUserId);
    const othersLores = lores.filter((lore) => lore.userId !== currentUserId);

    res.json({ myLores, othersLores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get lores by type
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    if (!["Historical", "Cultural", "Folklore"].includes(type)) {
      return res.status(400).json({
        message: "Invalid type. Must be one of: Historical, Cultural, Folklore",
      });
    }

    const lores = await Lore.findAll({
      where: { type },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(lores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get a specific lore by ID (no login required)
router.get("/:id", async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!lore) {
      return res.status(404).json({ message: "Lore not found." });
    }
    res.json(lore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update a lore (requires login & ownership)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) {
      return res.status(404).json({ message: "Lore not found." });
    }
    if (lore.userId !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this lore.",
      });
    }

    const { title, location, type, content, image } = req.body;
    
    // Validate required fields
    if (!title || !location || !type || !content) {
      return res.status(400).json({
        message: "Title, location, type, and content are required.",
      });
    }

    // Validate lore type
    if (!["Historical", "Cultural", "Folklore"].includes(type)) {
      return res.status(400).json({
        message: "Type must be one of: Historical, Cultural, Folklore",
      });
    }

    await lore.update({
      title,
      location,
      type,
      content,
      ...(image && { image }), // Only update image if provided
    });

    // Get updated lore with user data
    const updatedLore = await Lore.findByPk(lore.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.json(updatedLore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Delete a lore (requires login & ownership)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) {
      return res.status(404).json({ message: "Lore not found." });
    }
    if (lore.userId !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this lore.",
      });
    }

    await lore.destroy();
    res.json({ message: "Lore deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Search lores
router.get("/search/:term", async (req, res) => {
  try {
    const { term } = req.params;
    const lores = await Lore.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${term}%` } },
          { location: { [Op.iLike]: `%${term}%` } },
          { content: { [Op.iLike]: `%${term}%` } },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(lores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

const handleCreateLore = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://backend-sample-9f8f.onrender.com/lore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newLore),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create lore");
    }

    const createdLore = await response.json();
    console.log("Created Lore:", createdLore);
    setLores([createdLore, ...lores]); // Add the new lore to the state
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

module.exports = router;