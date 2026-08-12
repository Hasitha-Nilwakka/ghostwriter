"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface ToggleThemeProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const ToggleTheme = ({
  className,
  duration = 400,
  ...props
}: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Sync state with HTML class list on mount and external changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // View transition CSS overrides
  useEffect(() => {
    let styleElement = document.getElementById("toggle-theme-vt-override") as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "toggle-theme-vt-override"
      styleElement.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `
      document.head.appendChild(styleElement)
    }
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    // Trigger View Transitions API
    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const viewportWidth = window.innerWidth

    // Hardcoded swipe-left background animation
    document.documentElement.animate(
      {
        clipPath: [`inset(0 0 0 ${viewportWidth}px)`, `inset(0 0 0 0)`],
      },
      {
        duration,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
      className={cn(
        "cursor-pointer p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors", 
        className
      )}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        animate={{
          rotate: isDark ? 40 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
      >
        <mask id="moon-mask-combined">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            cx="25"
            cy="0"
            r="8"
            fill="black"
            animate={{
              cx: isDark ? 18 : 25,
              cy: isDark ? 6 : 0,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
          />
        </mask>

        <motion.circle
          cx="12"
          cy="12"
          r="9"
          fill="currentColor"
          mask="url(#moon-mask-combined)"
          animate={{
            r: isDark ? 8 : 5,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
        />

        <motion.g
          stroke="currentColor"
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </button>
  )
}
