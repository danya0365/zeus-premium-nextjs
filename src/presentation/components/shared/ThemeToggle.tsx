"use client";

import { animated, useSpring } from "@react-spring/web";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeToggle
 * Animated sun/moon toggle for dark mode switching
 * Uses react-spring for rotation animation
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const springProps = useSpring({
    transform: isDark ? "rotate(180deg)" : "rotate(0deg)",
    opacity: mounted ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-xl flex items-center justify-center
          bg-zeus-blue-50 dark:bg-zeus-blue-900/30
          hover:bg-zeus-blue-100 dark:hover:bg-zeus-blue-900/50
          transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <animated.button
      style={springProps}
      onClick={handleToggle}
      className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer
        bg-zeus-blue-50 dark:bg-zeus-blue-900/30
        hover:bg-zeus-blue-100 dark:hover:bg-zeus-blue-900/50
        transition-colors duration-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-zeus-blue-light" />
      ) : (
        <Sun className="w-5 h-5 text-zeus-orange" />
      )}
    </animated.button>
  );
}
