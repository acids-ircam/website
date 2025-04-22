"use client"

import { useEffect, useRef } from "react"

interface HalftoneBackgroundProps {
  color?: string
  dotSize?: number
  speed?: number
  opacity?: number
}

export default function HalftoneBackground({
  color = "#dc2626",
  dotSize = 2,
  speed = 0.002,
  opacity = 0.25, // Increased from 0.15 to 0.25
}: HalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover scrolling content
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation variables
    let time = 0
    const dots: { x: number; y: number; size: number }[] = []

    // Create dot grid
    const createDots = () => {
      dots.length = 0
      const spacing = dotSize * 8 // Increased spacing for better performance
      const cols = Math.ceil(canvas.width / spacing) + 5 // Add extra columns
      const rows = Math.ceil(canvas.height / spacing) + 5 // Add extra rows

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            size: dotSize,
          })
        }
      }
    }

    createDots()

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += speed

      // Draw dots
      ctx.fillStyle = color
      ctx.globalAlpha = 1 // Set to 1 and let the container control opacity

      dots.forEach((dot) => {
        const waveX = Math.sin(time + dot.x * 0.01) * 5
        const waveY = Math.cos(time + dot.y * 0.01) * 5
        const size = Math.abs(Math.sin(time + dot.x * 0.01 + dot.y * 0.01)) * dot.size + dot.size / 2

        ctx.beginPath()
        ctx.arc(dot.x + waveX, dot.y + waveY, size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [color, dotSize, speed, opacity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        opacity,
        zIndex: -1, // Ensure it's behind all content
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}
