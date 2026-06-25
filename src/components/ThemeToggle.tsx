"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-annotation font-bold tracking-widest text-foreground">
        {isDark ? "MODE_02: BLUEPRINT" : "MODE_01: WHITEPRINT"}
      </span>
      <button
        onClick={toggleTheme}
        className={cn(
          "relative inline-flex h-6 w-11 items-center border border-foreground bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          isDark ? "bg-foreground" : "bg-transparent"
        )}
      >
        <span className="sr-only">Toggle theme</span>
        <span
          className={cn(
            "inline-block h-4 w-4 transform bg-accent transition-transform",
            isDark ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
