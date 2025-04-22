"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateTransform = (axis: "x" | "y", intensity = 0.02) => {
    const center = axis === "x" ? window.innerWidth / 2 : window.innerHeight / 2
    const position = axis === "x" ? mousePosition.x : mousePosition.y
    return (position - center) * intensity
  }

  return (
    <div className="relative isolate overflow-hidden bg-black min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-fixed" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />

      {/* Animated circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-red-600/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          top: "20%",
          left: "15%",
        }}
      />

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-red-800/10 blur-3xl"
        animate={{
          x: [0, -70, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          bottom: "10%",
          right: "10%",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-4 inline-block"
            >
              <span className="text-xs uppercase tracking-widest text-red-500 font-mono border border-red-800 px-3 py-1">
                Artificial Creative Intelligence
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 font-mono leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block glitch">ACIDS</span>
              <span className="block text-outline">IRCAM</span>
            </motion.h1>

            <motion.div
              className="h-px w-24 bg-red-600 mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.p
              className="text-lg leading-relaxed text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Exploring the boundaries of musical creativity through probabilistic learning approaches, multivariate
              time series, and deep AI models applied to creative materials.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="#projects" className="art-button">
                Explore Projects
              </a>
              <a
                href="https://acids-ircam.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono uppercase tracking-wider text-white border-b border-red-600 pb-1 hover:text-red-400 transition-colors"
              >
                Visit Official Site →
              </a>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 relative"
            style={{
              transform: `translate(${calculateTransform("x")}px, ${calculateTransform("y")}px)`,
            }}
          >
            <div className="relative">
              {/* Waveform visualization */}
              <svg viewBox="0 0 800 400" width="100%" height="100%" className="text-red-600/80">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="50%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>

                {/* Waveform paths */}
                <motion.path
                  d="M0,200 Q200,100 400,200 Q600,300 800,200"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                <motion.path
                  d="M0,200 Q200,300 400,200 Q600,100 800,200"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.7 }}
                />

                {/* Animated circles */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={160 * (i + 1)}
                    cy={200}
                    r={4}
                    fill="#fff"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      cy: [200, 180 + ((i * 10) % 40), 200],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </svg>

              {/* Hexagon logo */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1, type: "spring" }}
              >
                <svg viewBox="0 0 200 200" width="180" height="180" className="text-red-600">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M80,30 L120,30 L160,70 L160,130 L120,170 L80,170 L40,130 L40,70 Z"
                  />
                  <path
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    d="M60,70 L80,90 M120,90 L140,70 M80,110 L60,130 M140,130 L120,110 M80,90 L120,90 M80,110 L120,110"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Diagonal divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-black"
        style={{ clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0% 100%)" }}
      />
    </div>
  )
}
