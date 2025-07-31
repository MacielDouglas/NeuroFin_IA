"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative w-20 h-8 bg-gradient-to-r from-gray-200/80 to-slate-200/80 dark:from-gray-900/80 dark:to-slate-900/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="absolute top-0.5 left-0.5 w-7 h-7 bg-white dark:bg-stone-800 rounded-full shadow-md flex items-center justify-center transition-all duration-300">
          <span className="text-sm">🌙</span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-8 bg-gradient-to-r from-gray-200/80 to-slate-200/80 dark:from-gray-900/80 dark:to-slate-900/80 hover:from-gray-300/80 hover:to-slate-300/80 dark:hover:from-gray-800/80 dark:hover:to-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 group"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Toggle Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-50/30 to-slate-50/30 dark:from-gray-950/30 dark:to-slate-950/30"></div>

      {/* Toggle Button */}
      <div
        className={`absolute top-0.5 w-10 h-7 bg-white dark:bg-stone-800 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
          theme === "light"
            ? "left-0.5 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-stone-800 dark:to-stone-700"
            : "left-6 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-stone-700 dark:to-stone-800"
        }`}
      >
        <span
          className={`text-sm transition-all duration-300 ${
            theme === "light"
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {theme === "light" ? <Sun /> : <Moon />}
        </span>
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <span
          className={`text-xs transition-opacity duration-300 ${
            theme === "light" ? "opacity-0" : "opacity-40"
          }`}
        >
          <Sun />
        </span>
        <span
          className={`text-xs transition-opacity duration-300 ${
            theme === "light" ? "opacity-40" : "opacity-0"
          }`}
        >
          <Moon />
        </span>
      </div>
    </button>
  );
}
