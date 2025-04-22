"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ArtisticProjectCardProps {
  title: string
  description: string
  details: string
  image: string
  link: string
  index: number
}

export default function ArtisticProjectCard({
  title,
  description,
  details,
  image,
  link,
  index,
}: ArtisticProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Alternate layout for odd/even indexes
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`relative w-full md:w-[80%] lg:w-[70%] mx-auto mb-32 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative z-10 bg-gray-900/80 backdrop-blur-md p-8 rounded-xl border border-red-900/30 shadow-xl ${
          isEven ? "md:ml-16" : "md:mr-16"
        }`}
      >
        <h2 className="text-4xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-red-500 font-medium mb-4">{description}</p>
        <p className="text-gray-300 mb-6">{details}</p>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
        >
          Explore
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      <motion.div
        className={`absolute top-0 ${isEven ? "right-0 md:-right-16" : "left-0 md:-left-16"} w-full md:w-[60%] h-full -z-10`}
        animate={{
          x: isHovered ? (isEven ? -10 : 10) : 0,
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover rounded-xl opacity-70"
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className={`absolute ${isEven ? "-left-4 bottom-4" : "-right-4 top-4"} w-16 h-16 rounded-full bg-red-600/30 blur-xl -z-20`}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className={`absolute ${isEven ? "left-8 -top-4" : "right-8 -bottom-4"} w-24 h-24 rounded-full bg-red-900/20 blur-xl -z-20`}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      />
    </motion.div>
  )
}
