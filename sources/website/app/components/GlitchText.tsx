"use client"

import { useState, useEffect, useRef } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchText({ text, className = "", intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchPhase, setGlitchPhase] = useState(0)
  const textRef = useRef<HTMLSpanElement>(null)
  const glitchTimer = useRef<NodeJS.Timeout | null>(null)
  const phaseTimer = useRef<NodeJS.Timeout | null>(null)

  // Function to generate random clip paths for TV static effect
  const generateClipPath = () => {
    const segments = 5 + Math.floor(Math.random() * 5)
    let path = "polygon("
    for (let i = 0; i < segments; i++) {
      const x1 = Math.random() * 100
      const y1 = Math.random() * 100
      const x2 = Math.random() * 100
      const y2 = Math.random() * 100
      path += `${x1}% ${y1}%, ${x2}% ${y2}%${i < segments - 1 ? ", " : ""}`
    }
    path += ")"
    return path
  }

  // Function to generate random offsets
  const randomOffset = () => {
    return {
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
    }
  }

  useEffect(() => {
    // Randomly trigger glitch effect
    const triggerGlitch = () => {
      setIsGlitching(true)

      // Create rapid phase changes during glitch for TV static effect
      let phaseCount = 0
      const maxPhases = intensity === "high" ? 8 : intensity === "medium" ? 5 : 3

      const updatePhase = () => {
        setGlitchPhase(Math.random())
        phaseCount++

        if (phaseCount < maxPhases) {
          phaseTimer.current = setTimeout(updatePhase, 50 + Math.random() * 100)
        } else {
          setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200)
        }
      }

      updatePhase()
    }

    // Set interval for glitch triggers
    const glitchInterval = setInterval(
      triggerGlitch,
      intensity === "high"
        ? 1000 + Math.random() * 1000
        : intensity === "medium"
          ? 1500 + Math.random() * 1500
          : 2000 + Math.random() * 2000,
    )

    return () => {
      clearInterval(glitchInterval)
      if (glitchTimer.current) clearTimeout(glitchTimer.current)
      if (phaseTimer.current) clearTimeout(phaseTimer.current)
    }
  }, [intensity])

  // Generate random offsets for each render during glitch
  const redOffset = isGlitching ? randomOffset() : { x: 0, y: 0 }
  const blueOffset = isGlitching ? randomOffset() : { x: 0, y: 0 }
  const greenOffset = isGlitching ? randomOffset() : { x: 0, y: 0 }

  // Generate random clip paths for static effect
  const clipPath1 = isGlitching ? generateClipPath() : ""
  const clipPath2 = isGlitching ? generateClipPath() : ""

  return (
    <div className={`relative ${className}`}>
      {/* Base text */}
      <span ref={textRef} className="relative z-10">
        {text}
      </span>

      {isGlitching && (
        <>
          {/* RGB channel separation with random movement */}
          <span
            className="absolute top-0 left-0 w-full text-red-500 opacity-80 z-0 mix-blend-screen"
            style={{
              left: `${redOffset.x}px`,
              top: `${redOffset.y}px`,
              clipPath: Math.random() > 0.5 ? clipPath1 : undefined,
              filter: "blur(0.5px)",
              transform: `skew(${(Math.random() - 0.5) * 5}deg)`,
            }}
          >
            {text}
          </span>

          <span
            className="absolute top-0 left-0 w-full text-blue-500 opacity-80 z-0 mix-blend-screen"
            style={{
              left: `${blueOffset.x}px`,
              top: `${blueOffset.y}px`,
              clipPath: Math.random() > 0.5 ? clipPath2 : undefined,
              filter: "blur(0.5px)",
              transform: `skew(${(Math.random() - 0.5) * 5}deg)`,
            }}
          >
            {text}
          </span>

          <span
            className="absolute top-0 left-0 w-full text-green-500 opacity-80 z-0 mix-blend-screen"
            style={{
              left: `${greenOffset.x}px`,
              top: `${greenOffset.y}px`,
              clipPath: Math.random() > 0.7 ? generateClipPath() : undefined,
              filter: "blur(0.5px)",
              transform: `skew(${(Math.random() - 0.5) * 5}deg)`,
            }}
          >
            {text}
          </span>

          {/* TV static noise effect */}
          <span
            className="absolute top-0 left-0 w-full h-full z-5"
            style={{
              backgroundImage: `radial-gradient(
                ellipse at center,
                transparent 0%,
                transparent ${90 + Math.random() * 10}%,
                rgba(255, 255, 255, ${0.1 + Math.random() * 0.3}) ${95 + Math.random() * 5}%
              )`,
              backgroundSize: `${2 + Math.random() * 3}px ${2 + Math.random() * 3}px`,
              backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Horizontal scan lines with random lengths but still touching the text */}
          {Array.from({ length: 3 }).map((_, i) => {
            // Random width between 10% and 70% of the container
            const width = 10 + Math.random() * 60

            // Random position that ensures the line touches the text
            // Start position can be anywhere from 0 to (100-width)%
            const left = Math.random() * (100 - width)

            return (
              <span
                key={`scan-${i}`}
                className="absolute z-5"
                style={{
                  height: `${1 + Math.random() * 1.5}px`,
                  width: `${width}%`,
                  left: `${left}%`,
                  top: `${20 + Math.random() * 60}%`, // Position within the text area
                  background: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`,
                  transform: `translateY(${Math.sin(glitchPhase * Math.PI * 2) * 10}px)`,
                }}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export { GlitchText }
