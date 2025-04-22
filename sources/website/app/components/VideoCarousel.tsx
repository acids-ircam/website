"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import GlitchText from "@/components/GlitchText"

interface Video {
  id: string
  title: string
  type: "youtube" | "soundcloud"
}

const videos: Video[] = [
  {
    id: "UqHZoMybhpw",
    title: "RAVE: A variational autoencoder for fast and high-quality neural audio synthesis",
    type: "youtube",
  },
  {
    id: "Kx_cJRYYYIU",
    title: "IRCAM Forum Workshop: RAVE - Real-time Audio Variational autoEncoder",
    type: "youtube",
  },
  {
    id: "dMZs04TzxUI",
    title: "IRCAM Forum Workshop: FlowSynth - Matching synthesizer presets from audio samples",
    type: "youtube",
  },
  {
    id: "VXQp4eDnXoQ",
    title: "Neurorack: A neural vocoder in a modular synthesizer",
    type: "youtube",
  },
  {
    id: "Kx_cJRYYYIU",
    title: "IRCAM Forum Workshop: RAVE - Real-time Audio Variational autoEncoder",
    type: "youtube",
  },
  {
    id: "dMZs04TzxUI",
    title: "IRCAM Forum Workshop: FlowSynth - Matching synthesizer presets from audio samples",
    type: "youtube",
  },
]

export default function VideoCarousel() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  return (
    <section id="music" className="video-carousel py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center mb-4">
            <div className="h-px w-12 bg-red-600 mr-4"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500">Experiments</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
            <GlitchText text="Music & Media" intensity="high" />
          </h2>
          <p className="text-gray-400 max-w-2xl font-mono">
            Explore our research through videos, demonstrations, and musical examples created with our AI tools.
          </p>
        </motion.div>

        <motion.div ref={carousel} className="overflow-hidden cursor-grab relative" whileTap={{ cursor: "grabbing" }}>
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-4 md:gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] bg-gray-900/50 backdrop-blur-sm overflow-hidden shadow-lg"
                style={{
                  transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})`,
                  border: "1px solid rgba(220, 38, 38, 0.2)",
                }}
                whileHover={{
                  scale: 1.02,
                  rotate: 0,
                  borderColor: "rgba(220, 38, 38, 0.5)",
                }}
              >
                <div className="aspect-video relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-mono text-sm line-clamp-2">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for scroll indication */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </motion.div>

        <div className="mt-8 text-center">
          <span className="text-xs font-mono text-gray-500">← Drag to explore →</span>
        </div>
      </div>
    </section>
  )
}
