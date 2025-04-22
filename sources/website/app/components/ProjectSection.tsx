"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import GlitchText from "./GlitchText"

interface ProjectImage {
  src: string
  alt: string
  position: "left" | "right" | "top" | "bottom"
}

interface ProjectSectionProps {
  id: string
  title: string
  description: string
  details: string
  images: ProjectImage[]
  links?: { text: string; url: string }[]
  reverse?: boolean
  accentColor?: string
  index: number
}

export default function ProjectSection({
  id,
  title,
  description,
  details,
  images,
  links = [],
  reverse = false,
  accentColor = "rgb(220 38 38)", // red-600
  index,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0])

  // Calculate transforms for images based on their position
  const getImageTransform = (position: string) => {
    switch (position) {
      case "left":
        return { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } }
      case "right":
        return { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } }
      case "top":
        return { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } }
      case "bottom":
        return { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } }
      default:
        return { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } }
    }
  }

  return (
    <motion.section
      id={id}
      className="min-h-[80vh] flex items-center py-16 relative overflow-hidden" // Changed from min-h-screen to min-h-[80vh] and py-20 to py-16
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1"
        style={{
          background: accentColor,
          scaleY: scrollYProgress,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}>
          {/* Images section - now larger */}
          <motion.div
            style={{
              opacity: imageOpacity,
            }}
            className="w-full md:w-1/2 space-y-4" // Changed from md:w-3/5 to md:w-1/2 and space-y-6 to space-y-4
            initial={{ x: reverse ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Main image - reduced size */}
            <motion.div
              className="w-full overflow-hidden rounded-lg shadow-2xl border border-red-900/20"
              style={{ scale: imageScale }}
            >
              <Image
                src={images[0]?.src || "/placeholder.svg"}
                alt={images[0]?.alt || title}
                width={800}
                height={500} // Reduced height
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Only show 2 additional images instead of all remaining images */}
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1, 3).map((image, i) => {
                const transform = getImageTransform(image.position)
                return (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-lg shadow-lg border border-red-900/20"
                    initial={transform.initial}
                    whileInView={transform.animate}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt || `${title} image ${i + 2}`}
                      width={300} // Reduced width
                      height={200} // Reduced height
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Text section - now smaller */}
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
            }}
            className="w-full md:w-1/2 space-y-3 pt-0 md:pt-0" // Changed from space-y-4 to space-y-3 and added pt-0
            initial={{ x: reverse ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Project number */}
            <div className="mb-2 flex items-center">
              {" "}
              {/* Reduced from mb-3 */}
              <div className="text-xs font-mono tracking-wider text-red-500 uppercase">{id}</div>
              <div className="ml-3 h-px flex-1 bg-red-900/30"></div>
            </div>
            {/* Title with glitch effect */}
            <h2 className="text-2xl font-bold text-white font-mono">
              {" "}
              {/* Reduced from text-3xl */}
              <GlitchText text={title} intensity="low" />
            </h2>
            <p className="text-red-500 font-mono mb-1 tracking-tight text-xs">
              {" "}
              {/* Reduced from mb-2 and text-sm to text-xs */}
              {description}
            </p>
            <div className="h-px w-12 bg-red-600 mb-2"></div> {/* Reduced from mb-3 */}
            <p className="text-gray-300 font-mono leading-relaxed text-xs">
              {" "}
              {/* Reduced from text-sm to text-xs */}
              {details}
            </p>
            {/* Multiple links stacked vertically if provided */}
            {links.length > 0 && (
              <div className="mt-4 flex flex-col space-y-2">
                {" "}
                {/* Changed from flex flex-wrap gap-4 to flex flex-col space-y-2 */}
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="text-red-500 hover:text-red-400 inline-flex items-center font-mono uppercase tracking-wider text-xs group elegant-hover"
                  >
                    <span className="relative">{link.text}</span>
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
