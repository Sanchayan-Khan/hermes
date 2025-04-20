// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Plus, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import JournalEntry from "@/components/journal-entry";
// import JournalEditor from "@/components/journal-editor";
// import PageHeader from "@/components/page-header";

// // Define the type for a journal entry
// interface JournalEntryType {
//   id: string;
//   title: string;
//   date: string;
//   location: string;
//   content: string; // Renamed from journalEntry
//   image: string; // Single image URL
//   tags: string[]; // Ensure tags is always an array
// }

// export default function JournalPage() {
//   const [entries, setEntries] = useState<JournalEntryType[]>([]);
//   const [recentEntries, setRecentEntries] = useState<JournalEntryType[]>([]);
//   const [isCreating, setIsCreating] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFilter, setSearchFilter] = useState("title"); // title or tags
//   const [showMyJournals, setShowMyJournals] = useState(false);

//   // Fetch recent journals
//   useEffect(() => {
//     const fetchRecentJournals = async () => {
//       try {
//         const response = await fetch(
//           "https://backend-sample-9f8f.onrender.com/journals/recent"
//         );
//         const data = await response.json();
//         const mappedData = data.map((entry: any) => ({
//           id: entry.id,
//           title: entry.title,
//           date: entry.date,
//           location: entry.location,
//           content: entry.journalEntry, // Map journalEntry to content
//           image: entry.photos?.[0] || "/placeholder.svg", // Use the first photo or a placeholder
//           tags: entry.tags || [], // Ensure tags is always an array
//         }));
//         setRecentEntries(mappedData);
//       } catch (error) {
//         console.error("Error fetching recent journals:", error);
//       }
//     };

//     fetchRecentJournals();
//   }, []);

//   // Fetch user's journals
//   useEffect(() => {
//     if (showMyJournals) {
//       const fetchMyJournals = async () => {
//         const token = localStorage.getItem("token");
//         try {
//           const response = await fetch(
//             "https://backend-sample-9f8f.onrender.com/journals/user",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const data = await response.json();
//           const mappedData = data.map((entry: any) => ({
//             id: entry.id,
//             title: entry.title,
//             date: entry.date,
//             location: entry.location,
//             content: entry.journalEntry, // Map journalEntry to content
//             image: entry.photos?.[0] || "/placeholder.svg", // Use the first photo or a placeholder
//             tags: entry.tags || [], // Ensure tags is always an array
//           }));
//           setEntries(mappedData);
//         } catch (error) {
//           console.error("Error fetching user journals:", error);
//         }
//       };

//       fetchMyJournals();
//     }
//   }, [showMyJournals]);

//   // Search journals
//   const handleSearch = async () => {
//     const endpoint =
//       searchFilter === "title"
//         ? `https://backend-sample-9f8f.onrender.com/journals/search/title?title=${searchQuery}`
//         : `https://backend-sample-9f8f.onrender.com/journals/search/tags?tags=${searchQuery}`;

//     try {
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       const mappedData = data.map((entry: any) => ({
//         id: entry.id,
//         title: entry.title,
//         date: entry.date,
//         location: entry.location,
//         content: entry.journalEntry, // Map journalEntry to content
//         image: entry.photos?.[0] || "/placeholder.svg", // Use the first photo or a placeholder
//         tags: entry.tags || [], // Ensure tags is always an array
//       }));
//       setEntries(mappedData);
//     } catch (error) {
//       console.error("Error searching journals:", error);
//     }
//   };

//   // Create or update journal
//   const handleSaveEntry = async (entry: JournalEntryType) => {
//     const token = localStorage.getItem("token");
//     try {
//       if (selectedEntry) {
//         // Update existing entry
//         await fetch(
//           `https://backend-sample-9f8f.onrender.com/journals/${selectedEntry}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               ...entry,
//               journalEntry: entry.content, // Map content back to journalEntry
//               photos: [entry.image], // Send the single image as an array
//             }),
//           }
//         );
//       } else {
//         // Create new entry
//         await fetch("https://backend-sample-9f8f.onrender.com/journals", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             ...entry,
//             journalEntry: entry.content, // Map content back to journalEntry
//             photos: [entry.image], // Send the single image as an array
//           }),
//         });
//       }
//       setIsCreating(false);
//       setSelectedEntry(null);
//       setShowMyJournals(true); // Refresh user's journals
//     } catch (error) {
//       console.error("Error saving journal entry:", error);
//     }
//   };

//   // Delete journal
//   const handleDeleteEntry = async (id: string) => {
//     const token = localStorage.getItem("token");
//     try {
//       await fetch(`https://backend-sample-9f8f.onrender.com/journals/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEntries(entries.filter((entry) => entry.id !== id));
//     } catch (error) {
//       console.error("Error deleting journal entry:", error);
//     }
//   };

//   const handleCreateEntry = () => {
//     setIsCreating(true);
//     setSelectedEntry(null);
//   };

//   const handleEditEntry = (id: string) => {
//     setSelectedEntry(id);
//     setIsCreating(false);
//   };

//   const handleCancelEdit = () => {
//     setIsCreating(false);
//     setSelectedEntry(null);
//   };

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       <PageHeader
//         title="Travel Journal"
//         description="Document your adventures in a beautiful scrapbook style"
//         button={
//           <div className="flex gap-3">
//             {/* <Button
//               onClick={() => setShowMyJournals(!showMyJournals)}
//               variant="outline"
//               className="bg-amber-100/10 hover:bg-amber-200/20 text-amber-100 border-amber-600/30 font-medium"
//             >
//               My Journals
//             </Button> */}
//             <Button
//               onClick={handleCreateEntry}
//               className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               New Entry
//             </Button>
//           </div>
//         }
//       />

//       {isCreating || selectedEntry ? (
//         <JournalEditor
//           entry={
//             selectedEntry
//               ? entries.find((e) => e.id === selectedEntry)
//               : undefined
//           }
//           onSave={handleSaveEntry}
//           onCancel={handleCancelEdit}
//         />
//       ) : (
//         <>
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/60 w-4 h-4" />
//               <Input
//                 placeholder="Search journals..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 bg-amber-100/10 border-amber-600/30 text-amber-100 placeholder:text-amber-600/60"
//               />
//             </div>
//             <Select value={searchFilter} onValueChange={setSearchFilter}>
//               <SelectTrigger className="w-[180px] bg-amber-100/10 border-amber-600/30 text-amber-100">
//                 <SelectValue placeholder="Search by..." />
//               </SelectTrigger>
//               <SelectContent className="bg-amber-900 border-amber-600/30">
//                 <SelectItem value="title" className="text-amber-100">
//                   Title
//                 </SelectItem>
//                 <SelectItem value="tags" className="text-amber-100">
//                   Tags
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//             <Button onClick={handleSearch} className="bg-[#b45309] text-white">
//               Search
//             </Button>
//           </div>

//           <Tabs defaultValue="recent" className="w-full">
//             <TabsList className="bg-amber-900/30">
//               <TabsTrigger value="recent" className="font-medium">
//                 Recent
//               </TabsTrigger>
//               <TabsTrigger value="my-journals" className="font-medium">
//                 My Journals
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="recent">
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {recentEntries.map((entry) => (
//                   <JournalEntry
//                     key={entry.id}
//                     entry={entry}
//                     onEdit={() => handleEditEntry(entry.id)}
//                     onDelete={() => handleDeleteEntry(entry.id)}
//                   />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="my-journals">
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {entries.map((entry) => (
//                   <JournalEntry
//                     key={entry.id}
//                     entry={entry}
//                     onEdit={() => handleEditEntry(entry.id)}
//                     onDelete={() => handleDeleteEntry(entry.id)}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JournalEntry from "@/components/journal-entry";
import JournalEditor from "@/components/journal-editor";
import PageHeader from "@/components/page-header";

// Define the type for a journal entry
interface JournalEntryType {
  id: string;
  title: string;
  date: string;
  location: string;
  content: string; // Renamed from journalEntry
  image: string; // Single image URL
  tags: string[]; // Ensure tags is always an array
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [recentEntries, setRecentEntries] = useState<JournalEntryType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"title" | "tags">("title");

  // === NEW: controlled tab state ===
  const [activeTab, setActiveTab] = useState<"recent" | "my-journals">(
    "recent"
  );

  // Fetch recent journals
  useEffect(() => {
    const fetchRecentJournals = async () => {
      try {
        const res = await fetch(
          "https://backend-sample-9f8f.onrender.com/journals/recent"
        );
        const data = await res.json();
        setRecentEntries(
          data.map((entry: any) => ({
            id: entry.id,
            title: entry.title,
            date: entry.date,
            location: entry.location,
            content: entry.journalEntry,
            image: entry.photos?.[0] || "/placeholder.svg",
            tags: entry.tags || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching recent journals:", err);
      }
    };

    fetchRecentJournals();
  }, []);

  // Fetch user's journals whenever the My Journals tab is active
  useEffect(() => {
    if (activeTab !== "my-journals") return;

    const fetchMyJournals = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          "https://backend-sample-9f8f.onrender.com/journals/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setEntries(
          data.map((entry: any) => ({
            id: entry.id,
            title: entry.title,
            date: entry.date,
            location: entry.location,
            content: entry.journalEntry,
            image: entry.photos?.[0] || "/placeholder.svg",
            tags: entry.tags || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching user journals:", err);
      }
    };

    fetchMyJournals();
  }, [activeTab]);

  // Search journals by title or tags
  const handleSearch = async () => {
    const endpoint =
      searchFilter === "title"
        ? `https://backend-sample-9f8f.onrender.com/journals/search/title?title=${searchQuery}`
        : `https://backend-sample-9f8f.onrender.com/journals/search/tags?tags=${searchQuery}`;
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setEntries(
        data.map((entry: any) => ({
          id: entry.id,
          title: entry.title,
          date: entry.date,
          location: entry.location,
          content: entry.journalEntry,
          image: entry.photos?.[0] || "/placeholder.svg",
          tags: entry.tags || [],
        }))
      );
      // switch to "My Journals" to see search results
      setActiveTab("my-journals");
    } catch (err) {
      console.error("Error searching journals:", err);
    }
  };

  // Create or update journal
  const handleSaveEntry = async (entry: JournalEntryType) => {
    const token = localStorage.getItem("token");
    try {
      if (selectedEntry) {
        // Update existing entry
        await fetch(
          `https://backend-sample-9f8f.onrender.com/journals/${selectedEntry}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...entry,
              journalEntry: entry.content,
              photos: [entry.image],
              tags: entry.tags,
            }),
          }
        );
      } else {
        // Create new entry
        await fetch("https://backend-sample-9f8f.onrender.com/journals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...entry,
            journalEntry: entry.content,
            photos: [entry.image],
            tags: entry.tags,
          }),
        });
      }

      // Reset form and show My Journals
      setIsCreating(false);
      setSelectedEntry(null);
      setActiveTab("my-journals");
    } catch (err) {
      console.error("Error saving journal entry:", err);
    }
  };

  // Delete journal
  const handleDeleteEntry = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`https://backend-sample-9f8f.onrender.com/journals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting journal entry:", err);
    }
  };

  const handleCreateEntry = () => {
    setIsCreating(true);
    setSelectedEntry(null);
  };

  const handleEditEntry = (id: string) => {
    setSelectedEntry(id);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setIsCreating(false);
    setSelectedEntry(null);
  };

  // Combine both lists to find the entry to edit
  const entryToEdit = selectedEntry
    ? [...recentEntries, ...entries].find((e) => e.id === selectedEntry)
    : undefined;

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader
        title="Travel Journal"
        description="Document your adventures in a beautiful scrapbook style"
        button={
          <Button
            onClick={handleCreateEntry}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        }
      />

      {isCreating || selectedEntry ? (
        <JournalEditor
          entry={entryToEdit}
          onSave={handleSaveEntry}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/60 w-4 h-4" />
              <Input
                placeholder="Search journals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-amber-100/10 border-amber-600/30 text-amber-100 placeholder:text-amber-600/60"
              />
            </div>
            <Select
              value={searchFilter}
              onValueChange={(val) => setSearchFilter(val as "title" | "tags")}
            >
              <SelectTrigger className="w-[180px] bg-amber-100/10 border-amber-600/30 text-amber-100">
                <SelectValue placeholder="Search by..." />
              </SelectTrigger>
              <SelectContent className="bg-amber-900 border-amber-600/30">
                <SelectItem value="title" className="text-amber-100">
                  Title
                </SelectItem>
                <SelectItem value="tags" className="text-amber-100">
                  Tags
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-[#b45309] text-white">
              Search
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(val) =>
              setActiveTab(val as "recent" | "my-journals")
            }
            className="w-full"
          >
            <TabsList className="bg-amber-900/30">
              <TabsTrigger value="recent" className="font-medium">
                Recent
              </TabsTrigger>
              <TabsTrigger value="my-journals" className="font-medium">
                My Journals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentEntries.map((entry) => (
                  <JournalEntry
                    key={entry.id}
                    entry={entry}
                    onEdit={() => handleEditEntry(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-journals">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <JournalEntry
                    key={entry.id}
                    entry={entry}
                    onEdit={() => handleEditEntry(entry.id)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
