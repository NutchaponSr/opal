"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center">
      <div className="bg-black/90 dark:bg-black/80 rounded-full p-1 flex items-center">
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "system" ? "bg-gray-700" : "text-gray-400 hover:text-gray-200",
          )}
          aria-label="System theme"
        >
          <Monitor className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "light" ? "bg-gray-700" : "text-gray-400 hover:text-gray-200",
          )}
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "dark" ? "bg-gray-700" : "text-gray-400 hover:text-gray-200",
          )}
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

