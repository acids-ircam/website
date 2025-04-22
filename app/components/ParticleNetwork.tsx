"use client"

import { useEffect, useRef } from "react"

interface ParticleNetworkProps {
  particleCount?: number
  connectionDistance?: number
  color?: string
  speed?: number
  interactive?: boolean
  fullScreen?: boolean
}

export default function ParticleNetwork({
  particleCount = 120,
  connectionDistance = 60,
  color = "#dc2626",
  speed = 0.5,
  interactive = true,
  fullScreen = false,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (fullScreen) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      } else {
        const { width, height } = canvas.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 150,
      }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    // Create particles with even distribution
    const particles: {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      originalRadius: number
    }[] = []

    // Create particles with better distribution
    for (let i = 0; i < particleCount; i++) {
      // Use grid-based positioning for more even distribution
      const gridX = Math.floor(i / Math.sqrt(particleCount)) / Math.sqrt(particleCount)
      const gridY = (i % Math.floor(Math.sqrt(particleCount))) / Math.sqrt(particleCount)

      // Add some randomness to the grid
      const x = (gridX + (Math.random() * 0.8 - 0.4)) * canvas.width
      const y = (gridY + (Math.random() * 0.8 - 0.4)) * canvas.height

      const radius = Math.random() * 2 + 1
      particles.push({
        x,
        y,
        radius,
        originalRadius: radius,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles - now white and more visible
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only draw connections if particles are very close
          if (distance < connectionDistance) {
            // Calculate opacity based on distance - more visible now
            const opacity = (1 - distance / connectionDistance) * 0.7 // Increased from 0.5 to 0.7

            // Draw the connection line in white with increased opacity
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Interactive effect with mouse
        if (interactive) {
          const dx = particle.x - mouseRef.current.x
          const dy = particle.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = mouseRef.current.radius

          if (distance < maxDistance) {
            // Grow particles near mouse
            const scale = 1 + (maxDistance - distance) / maxDistance
            particle.radius = particle.originalRadius * scale

            // Push particles away from mouse
            const angle = Math.atan2(dy, dx)
            const force = (maxDistance - distance) / maxDistance
            particle.x += Math.cos(angle) * force
            particle.y += Math.sin(angle) * force
          } else {
            particle.radius = particle.originalRadius
          }
        }

        // Draw white outline first (increased opacity)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius + 0.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)" // Increased from 0.3 to 0.5
        ctx.fill()

        // Draw the colored particle with increased opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = color.includes("rgba") ? color : `rgba(220, 38, 38, 0.7)` // Increased from 0.5 to 0.7
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [particleCount, connectionDistance, color, speed, interactive, fullScreen])

  return (
    <canvas
      ref={canvasRef}
      className={`${fullScreen ? "fixed top-0 left-0 w-full h-full pointer-events-none" : "w-full h-full"}`}
      style={{ zIndex: fullScreen ? -1 : 0 }}
    />
  )
}
