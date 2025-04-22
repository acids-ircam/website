"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import ParticleNetwork from "./ParticleNetwork"
import GlitchText from "./GlitchText"

export default function ExperimentalHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative isolate overflow-hidden bg-black min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />

      {/* Full screen particle network */}
      <ParticleNetwork
        particleCount={120}
        connectionDistance={80} // Reduced from 150 to 80 to make particles connect only when very close
        color="#dc2626"
        speed={0.3}
        interactive={true}
        fullScreen={true}
      />

      {/* Interactive cursor effect */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-red-600/10 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-4 inline-block"
            >
              <span className="text-xs uppercase tracking-widest text-red-500 font-mono border border-red-800 px-3 py-1 inline-block">
                Artificial Creative Intelligence
              </span>
            </motion.div>

            <motion.div
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={100} height={60} className="mr-4" />
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white font-mono leading-none">
                <GlitchText text="ACIDS" className="text-7xl sm:text-8xl font-bold" intensity="high" />
              </h1>
            </motion.div>

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
              className="flex flex-wrap gap-4 justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="#projects" className="art-button subtle-animation">
                Explore Projects
              </a>
              <a
                href="https://discord.gg/acids"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono uppercase tracking-wider text-white border-b border-red-600 pb-1 hover:text-red-400 transition-colors elegant-hover flex items-center justify-center"
              >
                Visit our community
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 relative h-[300px] md:h-[400px] w-full overflow-visible"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Removed the clipping by making the container overflow-visible and ensuring the canvas fills the space */}
            <div className="absolute inset-0 w-full h-full">
              <ParticleNetwork particleCount={80} connectionDistance={60} color="#dc2626" speed={0.3} />
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
