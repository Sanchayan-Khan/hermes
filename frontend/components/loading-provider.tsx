"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import LoadingScreen from "@/components/loading-screen"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
})

export function useLoadingContext() {
  return useContext(LoadingContext)
}

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    // For initial page load
    if (initialLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setInitialLoad(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [initialLoad])

  // For navigation-triggered loads
  useEffect(() => {
    if (!initialLoad && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading, initialLoad])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen initialLoad={initialLoad} />}
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>{children}</div>
    </LoadingContext.Provider>
  )
}

