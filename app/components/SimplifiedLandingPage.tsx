"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import ParticleWaves from "./ParticleWaves"

export default function SimplifiedLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  // Share pulsing state with ParticleWaves component
  const pulseRef = useRef({ isPulsing: false, timestamp: 0 })

  // Immediately show the logo, then load animations after a short delay
  useEffect(() => {
    // Set loaded state after a minimal delay to ensure the logo is visible first
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Handle orb pulsation in sync with particle waves
  useEffect(() => {
    if (!isLoaded) return

    // Start the pulsation cycle
    const pulseCycle = () => {
      // Contract phase
      setIsPulsing(true)
      pulseRef.current = { isPulsing: true, timestamp: Date.now() }

      // After contraction, expand and emit particles
      setTimeout(() => {
        setIsPulsing(false)
        // Schedule next pulse
        setTimeout(pulseCycle, 1200 + Math.random() * 400)
      }, 600)
    }

    // Start the first pulse after a short delay
    const initialTimer = setTimeout(pulseCycle, 500)

    return () => clearTimeout(initialTimer)
  }, [isLoaded])

  // Handle scroll to reveal content with smoother transition
  useEffect(() => {
    const handleScroll = () => {
      // Use a higher threshold for a more gradual fade (40% of viewport height)
      const scrollThreshold = window.innerHeight * 0.4
      const rawProgress = Math.min(window.scrollY / scrollThreshold, 1)

      // Apply a gentler easing curve for smoother transition
      const easedProgress = Math.pow(rawProgress, 1.5)
      setScrollProgress(easedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle scroll to content
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.5,
      behavior: "smooth",
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen bg-black z-50 transition-all duration-300 ease-out"
      style={{
        opacity: 1 - scrollProgress * 0.8,
        filter: `blur(${scrollProgress * 3}px)`,
        transform: `scale(${1 + scrollProgress * 0.03})`,
        pointerEvents: scrollProgress >= 0.95 ? "none" : "auto",
      }}
    >
      {/* Particle waves effect - only render when loaded */}
      {isLoaded && <ParticleWaves pulseRef={pulseRef} />}

      {/* Interactive orb with ACIDS logo centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative rounded-full bg-gradient-to-br from-black to-gray-900 orb-glow"
          style={{
            boxShadow: "0 0 50px rgba(220, 38, 38, 0.7), inset 0 0 50px rgba(220, 38, 38, 0.5)",
            width: isMobile ? "260px" : "340px",
            height: isMobile ? "260px" : "340px",
          }}
          animate={{
            x: mousePosition.x * 10,
            y: mousePosition.y * 10,
            rotateX: mousePosition.y * 5,
            rotateY: -mousePosition.x * 5,
            // Pulsate the orb - contract before emission, expand after
            scale: isPulsing ? 0.95 : [1, 1.05, 1],
            filter: isPulsing
              ? "drop-shadow(0 0 40px rgba(220, 38, 38, 0.6))"
              : [
                  "drop-shadow(0 0 50px rgba(220, 38, 38, 0.7))",
                  "drop-shadow(0 0 60px rgba(220, 38, 38, 0.9))",
                  "drop-shadow(0 0 50px rgba(220, 38, 38, 0.7))",
                ],
          }}
          transition={{
            x: { type: "spring", damping: 15 },
            y: { type: "spring", damping: 15 },
            rotateX: { type: "spring", damping: 15 },
            rotateY: { type: "spring", damping: 15 },
            scale: isPulsing
              ? { duration: 0.6, ease: "easeInOut" }
              : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            filter: isPulsing
              ? { duration: 0.6, ease: "easeInOut" }
              : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          {/* Add glitch effect to the orb - only when loaded */}
          {isLoaded && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-600/10"
              animate={{
                x: [0, -5, 3, -2, 0],
                opacity: [0, 0.3, 0.1, 0.2, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: Math.random() * 5 + 3,
              }}
            />
          )}

          {/* Orb details */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-red-600/20 to-transparent" />
            <div
              className="absolute w-full h-full opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, transparent 0%, rgba(220, 38, 38, 0.3) 70%, transparent 100%)",
                animation: isLoaded ? "pulse 4s infinite alternate" : "none",
              }}
            />
          </div>

          {/* Centered ACIDS Logo - always visible immediately */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/acids_logo_white.png"
              alt="ACIDS Logo"
              width={isMobile ? 120 : 180}
              height={isMobile ? 72 : 108}
              className="drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]"
              priority={true}
            />
          </div>
        </motion.div>
      </div>

      {/* Responsive pulsating circles that resize properly */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {isPulsing && (
            <motion.div
              key="pulse-circle"
              className="absolute rounded-full border border-red-600/30"
              initial={{ width: "0%", height: "0%", opacity: 0 }}
              animate={{
                width: ["0%", "120%", "200%"],
                height: ["0%", "120%", "200%"],
                opacity: [0, 0.6, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              style={{
                maxWidth: "1200px",
                maxHeight: "1200px",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator at bottom of page */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 - scrollProgress * 2 : 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={scrollToContent}
          style={{ cursor: "pointer" }}
        >
          <span className="text-white text-sm font-mono mb-2 block text-center">Scroll Down</span>
          <motion.div
            className="flex justify-center"
            animate={isLoaded ? { y: [0, 10, 0] } : { y: 0 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
