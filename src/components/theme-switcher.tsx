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
    <div className="flex items-center justify-center ml-auto">
      <div className="bg-background dark:bg-input/30 rounded-full p-0.5 flex items-center border dark:border-input max-h-7 min-h-7">
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "system" ? "bg-input/50" : "text-icon",
          )}
          aria-label="System theme"
        >
          <Monitor className="size-3" />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "light" ? "bg-input/50" : "text-icon",
          )}
          aria-label="Light theme"
        >
          <Sun className="size-3" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            theme === "dark" ? "bg-input/50" : "text-icon",
          )}
          aria-label="Dark theme"
        >
          <Moon className="size-3" />
        </button>
      </div>
    </div>
  )
}

