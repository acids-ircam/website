"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import ProjectSection from "./ProjectSection"
import GlitchText from "./GlitchText"
import Image from "next/image"

export default function CreativeProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      id: "project-01",
      title: "Artistic Creations",
      description: "Collaborations with renowned composers and artists",
      details:
        "We've collaborated with visionary artists like Pierce Warnecke, Canblaster, and Molecule to create groundbreaking musical performances showcased at the world's most prestigious venues. Our technologies enable artists to push the boundaries of musical expression, creating immersive experiences that blend cutting-edge AI with artistic vision.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Live performance at iconic venue",
          position: "right",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Collaboration with Pierce Warnecke",
          position: "left",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Canblaster performance",
          position: "bottom",
        },
      ],
      links: [
        { text: "View Performances", url: "/projects/artistic-creations" },
        { text: "Artist Collaborations", url: "/projects/collaborations" },
      ],
      accentColor: "#dc2626",
    },
    {
      id: "project-02",
      title: "Interactive Installations",
      description: "Audio-reactive experiences in prestigious galleries",
      details:
        "Our interactive installations have been featured in world-renowned venues including the Centre Pompidou with Björk and the Serpentine Gallery with Holly Herndon. These immersive experiences combine real-time audio processing, machine learning, and responsive visual systems to create unique environments where sound, space, and audience interaction converge.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Centre Pompidou installation with Björk",
          position: "left",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Serpentine Gallery with Holly Herndon",
          position: "right",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Interactive audio-visual installation",
          position: "top",
        },
      ],
      links: [
        { text: "Explore Installations", url: "/projects/installations" },
        { text: "Gallery Collaborations", url: "/projects/galleries" },
      ],
      accentColor: "#991b1b",
    },
    {
      id: "project-03",
      title: "Neural Audio Synthesis",
      description: "Pioneering AI models for sound generation",
      details:
        "Our research in neural audio synthesis has produced groundbreaking models that redefine what's possible in sound design and music production. These technologies enable real-time audio generation and transformation with unprecedented quality and control, allowing artists to explore entirely new sonic territories while maintaining creative agency.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Neural audio synthesis visualization",
          position: "right",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "RAVE model architecture",
          position: "left",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "NN~ interface",
          position: "bottom",
        },
      ],
      links: [
        { text: "Explore NN~", url: "https://acids-ircam.github.io/nn_tilde/" },
        { text: "Explore RAVE", url: "https://github.com/acids-ircam/RAVE" },
        { text: "Explore AFTER", url: "https://github.com/acids-ircam/AFTER" },
      ],
      accentColor: "#b91c1c",
    },
    {
      id: "project-04",
      title: "Hardware Synthesizer and Control",
      description: "Bridging AI models with physical instruments",
      details:
        "We've developed innovative hardware solutions that bring neural audio models into the physical realm of modular synthesis and hardware instruments. Our technologies enable musicians to integrate AI-generated sounds into their analog setups, creating intuitive interfaces for controlling complex models through familiar hardware paradigms.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=800",
          alt: "Hardware synthesizer prototype",
          position: "left",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "FlowSynth interface",
          position: "right",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Modular synthesizer integration",
          position: "top",
        },
      ],
      links: [
        { text: "Explore FlowSynth", url: "https://github.com/acids-ircam/flow_synthesizer" },
        { text: "Hardware Projects", url: "/projects/hardware" },
      ],
      accentColor: "#7f1d1d",
    },
  ]

  return (
    <div ref={containerRef} id="projects" className="relative">
      <motion.div
        className="py-12 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* ACIDS logo with lines on both sides */}
          <div className="flex items-center justify-center mb-8">
            <motion.div
              className="h-px bg-white flex-1 max-w-xs"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 0.7 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />

            <motion.div
              className="mx-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={60} height={36} />
            </motion.div>

            <motion.div
              className="h-px bg-white flex-1 max-w-xs"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 0.7 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="flex items-center mb-4">
            <div className="h-px w-12 bg-red-600 mr-4"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500">Research</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <GlitchText text="Creative Projects" intensity="high" />
          </h2>
          <p className="text-gray-400 max-w-2xl font-mono">
            Our research explores the intersection of artificial intelligence, deep learning, and musical creativity.
          </p>
        </div>

        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            details={project.details}
            images={project.images}
            links={project.links}
            reverse={index % 2 !== 0}
            accentColor={project.accentColor}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  )
}
