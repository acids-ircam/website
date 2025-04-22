"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchText({ text, className = "", intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), intensity === "high" ? 800 : intensity === "medium" ? 400 : 200)
      },
      intensity === "high"
        ? 1500 + Math.random() * 1500
        : intensity === "medium"
          ? 2500 + Math.random() * 2500
          : 4000 + Math.random() * 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          x: isGlitching ? [0, -5, 7, -3, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <span className="relative z-10">{text}</span>

        {isGlitching && (
          <>
            {/* Red channel */}
            <span
              className="absolute top-0 left-0 w-full text-red-500 opacity-80 z-0"
              style={{
                clipPath: "polygon(0 15%, 100% 15%, 100% 30%, 0 30%)",
                left: "-3px",
                textShadow: "0 0 3px rgba(239, 68, 68, 0.7)",
              }}
            >
              {text}
            </span>

            {/* Blue channel */}
            <span
              className="absolute top-0 left-0 w-full text-blue-500 opacity-80 z-0"
              style={{
                clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
                left: "3px",
                textShadow: "0 0 3px rgba(59, 130, 246, 0.7)",
              }}
            >
              {text}
            </span>

            {/* Green channel */}
            <span
              className="absolute top-0 left-0 w-full text-green-500 opacity-80 z-0"
              style={{
                clipPath: "polygon(0 40%, 100% 40%, 100% 45%, 0 45%)",
                left: "2px",
                top: "-2px",
                textShadow: "0 0 3px rgba(34, 197, 94, 0.7)",
              }}
            >
              {text}
            </span>

            {/* Additional glitch elements */}
            <span
              className="absolute top-0 left-0 w-full text-white opacity-90 z-0"
              style={{
                clipPath: "polygon(0 10%, 30% 10%, 30% 12%, 0 12%)",
                left: "5px",
                top: "3px",
              }}
            >
              {text}
            </span>

            <span
              className="absolute top-0 left-0 w-full text-white opacity-90 z-0"
              style={{
                clipPath: "polygon(70% 35%, 100% 35%, 100% 37%, 70% 37%)",
                left: "-5px",
                top: "-3px",
              }}
            >
              {text}
            </span>
          </>
        )}
      </motion.div>
    </div>
  )
}

export { GlitchText }
