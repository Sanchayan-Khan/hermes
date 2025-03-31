import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <div className="text-center">
        <Loader className="w-12 h-12 mx-auto animate-spin text-amber-500" />
        <p className="mt-4 text-amber-300 font-handwriting text-lg">Loading local lores...</p>
      </div>
    </div>
  )
}

