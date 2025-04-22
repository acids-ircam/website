"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParticleWavesProps {
  pulseRef: React.MutableRefObject<{
    isPulsing: boolean
    timestamp: number
  }>
}

export default function ParticleWaves({ pulseRef }: ParticleWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fix the variable initialization error by declaring centerX and centerY before they're used

    // Center coordinates - declare and initialize before use
    let centerX = 0
    let centerY = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = containerRef.current
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height

      // Update center coordinates when resizing
      centerX = canvas.width / 2
      centerY = canvas.height / 2
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Remove the duplicate declaration that was causing the error
    // let centerX: number = canvas.width / 2
    // let centerY: number = canvas.height / 2

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      angle: number
      distance: number
      originalDistance: number
      trail: { x: number; y: number; alpha: number }[]
      trailLength: number
      isWave: boolean
      glitchTimer: number
      glitchState: boolean
      hue: number

      constructor(isWave = false) {
        this.isWave = isWave
        this.glitchTimer = Math.random() * 100
        this.glitchState = false

        // More red particles, with occasional cyan or magenta for visual interest
        this.hue = Math.random() > 0.85 ? (Math.random() > 0.5 ? 180 : 300) : 0 // 85% red, 15% cyan or magenta

        if (isWave) {
          // Wave particles start from the circle's circumference
          this.angle = Math.random() * Math.PI * 2
          this.distance = Math.random() * 10 + 170 // Tighter radius around the circle
          this.originalDistance = this.distance
          this.x = centerX + Math.cos(this.angle) * this.distance
          this.y = centerY + Math.sin(this.angle) * this.distance

          // Wave particles move ONLY outward with consistent direction
          const speed = Math.random() * 1.0 + 0.8
          this.speedX = Math.cos(this.angle) * speed
          this.speedY = Math.sin(this.angle) * speed

          // Ensure the direction is always outward
          if ((this.x > centerX && this.speedX < 0) || (this.x < centerX && this.speedX > 0)) {
            this.speedX *= -1
          }
          if ((this.y > centerY && this.speedY < 0) || (this.y < centerY && this.speedY > 0)) {
            this.speedY *= -1
          }

          this.size = Math.random() * 2.5 + 1
          this.color = `hsl(${this.hue}, 100%, 50%)`
          this.alpha = Math.random() * 0.5 + 0.2

          // Trails
          this.trail = []
          this.trailLength = Math.floor(Math.random() * 6) + 4
        } else {
          // Background particles - more of them and better distributed
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 1.2 + 0.3

          // Slower, more natural movement for background particles
          this.speedX = (Math.random() - 0.5) * 0.3
          this.speedY = (Math.random() - 0.5) * 0.3

          this.color = `hsl(${this.hue}, 80%, ${Math.random() * 20 + 40}%)`
          this.alpha = Math.random() * 0.2 + 0.05
          this.trail = []
          this.trailLength = 0
        }
      }

      update() {
        // Glitch effect - randomly change direction or position
        this.glitchTimer--
        if (this.glitchTimer <= 0) {
          this.glitchState = Math.random() > 0.7
          this.glitchTimer = Math.random() * 60 + 30
        }

        if (this.glitchState && Math.random() > 0.9) {
          // Glitch the particle
          if (Math.random() > 0.5) {
            this.x += (Math.random() - 0.5) * 10
            this.y += (Math.random() - 0.5) * 10
          }

          // Only allow background particles to change direction during glitch
          if (!this.isWave && Math.random() > 0.8) {
            this.speedX *= -1
          }
        }

        // Add current position to trail
        if (this.isWave) {
          if (this.trail.length >= this.trailLength) {
            this.trail.pop()
          }
          this.trail.unshift({ x: this.x, y: this.y, alpha: this.alpha })
        }

        // Update position with occasional jitter for glitchy effect
        if (this.isWave) {
          // Wave particles move outward with slight jitter
          this.x += this.speedX + (this.glitchState ? Math.random() * 2 : 0)
          this.y += this.speedY + (this.glitchState ? Math.random() * 2 : 0)
        } else {
          // Background particles wander more naturally
          this.x += this.speedX
          this.y += this.speedY

          // Add slight random movement for more natural wandering
          if (Math.random() > 0.95) {
            this.speedX += (Math.random() - 0.5) * 0.1
            this.speedY += (Math.random() - 0.5) * 0.1

            // Limit max speed to prevent erratic movement
            this.speedX = Math.max(-0.5, Math.min(0.5, this.speedX))
            this.speedY = Math.max(-0.5, Math.min(0.5, this.speedY))
          }
        }

        // Fade out wave particles as they move away with a more dramatic curve
        if (this.isWave) {
          const currentDistance = Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2))
          const maxDistance = this.originalDistance + 300

          if (currentDistance > maxDistance) {
            this.alpha = 0
          } else {
            // More dramatic fade curve
            this.alpha = 0.8 * Math.pow(1 - (currentDistance - this.originalDistance) / 300, 1.5)
          }
        }

        // Reset background particles if they go off screen
        if (!this.isWave) {
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
        }
      }

      draw() {
        // Draw trail with glitch effect
        if (this.isWave) {
          for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i]

            // Occasionally split RGB channels for glitch effect
            if (this.glitchState && Math.random() > 0.7) {
              // Red channel
              ctx.beginPath()
              ctx.arc(t.x + 3, t.y, this.size * (1 - i / this.trailLength), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255, 0, 0, ${t.alpha * (1 - i / this.trailLength) * 0.5})`
              ctx.fill()

              // Blue channel
              ctx.beginPath()
              ctx.arc(t.x - 3, t.y, this.size * (1 - i / this.trailLength), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(0, 0, 255, ${t.alpha * (1 - i / this.trailLength) * 0.5})`
              ctx.fill()
            } else {
              ctx.beginPath()
              ctx.arc(t.x, t.y, this.size * (1 - i / this.trailLength), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(220, 38, 38, ${t.alpha * (1 - i / this.trailLength) * 0.7})`
              ctx.fill()
            }
          }
        }

        // Draw particle with occasional glitch effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * (this.glitchState ? Math.random() * 0.5 + 0.75 : 1), 0, Math.PI * 2)

        if (this.glitchState && Math.random() > 0.5) {
          // RGB split for glitch effect
          const rgbOffset = 3

          // Red channel
          ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha * 0.7})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(this.x - rgbOffset, this.y + rgbOffset, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha * 0.5})`
          ctx.fill()
        } else {
          ctx.fillStyle = this.isWave
            ? `rgba(220, 38, 38, ${this.alpha * 0.7})`
            : `rgba(220, 38, 38, ${this.alpha * 0.7})`
          ctx.fill()
        }
      }
    }

    // Create particles
    const backgroundParticles: Particle[] = []
    const waveParticles: Particle[] = []

    const initParticles = () => {
      centerX = canvas.width / 2
      centerY = canvas.height / 2

      backgroundParticles.length = 0
      waveParticles.length = 0

      // Create more background particles - increased from 60 to 100
      for (let i = 0; i < 100; i++) {
        backgroundParticles.push(new Particle(false))
      }
    }

    // Generate wave of particles
    let pulseActive = false
    let pulseSize = 0
    let pulseOpacity = 0

    const generateWave = () => {
      // Only generate a wave if the parent component is pulsing
      if (pulseRef.current.isPulsing) {
        // Trigger pulse effect
        pulseActive = true
        pulseSize = 0
        pulseOpacity = 0.8

        // Create a burst of particles - increased from 15 to 20
        for (let i = 0; i < 20; i++) {
          waveParticles.push(new Particle(true))
        }

        // Reset the pulsing state after we've processed it
        pulseRef.current.isPulsing = false
      }

      // Check again soon
      requestAnimationFrame(generateWave)
    }

    initParticles()
    generateWave()

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Occasionally add full screen glitch
      if (Math.random() > 0.995) {
        // Screen tear effect
        const tearHeight = (Math.random() * canvas.height) / 2
        const tearY = Math.random() * canvas.height
        const tearOffset = (Math.random() - 0.5) * 20

        // Copy and shift a portion of the canvas
        ctx.drawImage(canvas, 0, tearY, canvas.width, tearHeight, tearOffset, tearY, canvas.width, tearHeight)

        // Add RGB shift to some areas
        ctx.globalCompositeOperation = "screen"
        ctx.fillStyle = "rgba(255,0,0,0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "source-over"
      }

      // Update pulse effect with more dramatic visuals
      if (pulseActive) {
        pulseSize += 5
        pulseOpacity -= 0.015

        if (pulseOpacity <= 0) {
          pulseActive = false
        } else {
          // Draw multiple pulse rings for more dramatic effect
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            ctx.arc(centerX, centerY, 170 + pulseSize - i * 10, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(220, 38, 38, ${pulseOpacity * (1 - i * 0.2) * 0.7})`
            ctx.lineWidth = 2 - i * 0.5
            ctx.stroke()
          }

          // Add digital noise/static around the pulse
          if (pulseOpacity > 0.5) {
            for (let i = 0; i < 12; i++) {
              const angle = Math.random() * Math.PI * 2
              const distance = 170 + pulseSize + (Math.random() - 0.5) * 20
              const x = centerX + Math.cos(angle) * distance
              const y = centerY + Math.sin(angle) * distance

              ctx.beginPath()
              ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2)
              ctx.fillStyle =
                Math.random() > 0.5
                  ? `rgba(255, 0, 0, ${Math.random() * 0.4 + 0.2})`
                  : `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.2})`
              ctx.fill()
            }
          }
        }
      }

      // Draw halftone pattern with occasional glitches
      const patternSize = 20
      ctx.fillStyle = "rgba(220, 38, 38, 0.05)"

      for (let x = 0; x < canvas.width; x += patternSize) {
        for (let y = 0; y < canvas.height; y += patternSize) {
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

          // Add pulsing effect to the pattern
          const pulseFactor = pulseActive ? Math.max(0, 1 - Math.abs(distance - (170 + pulseSize)) / 30) * 0.5 : 0
          const radius = Math.max(0, 2 * (1 - distance / 500) + pulseFactor)

          // Add occasional glitches to the pattern
          if (Math.random() > 0.997) {
            ctx.fillStyle = "rgba(0, 255, 255, 0.2)"
            const glitchRadius = radius * (Math.random() * 3 + 1)
            ctx.beginPath()
            ctx.arc(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, glitchRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = "rgba(220, 38, 38, 0.05)"
          }

          if (radius > 0) {
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Update and draw background particles
      backgroundParticles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Update and draw wave particles
      for (let i = waveParticles.length - 1; i >= 0; i--) {
        waveParticles[i].update()
        waveParticles[i].draw()

        // Remove faded out particles
        if (waveParticles[i].alpha <= 0) {
          waveParticles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [pulseRef])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
