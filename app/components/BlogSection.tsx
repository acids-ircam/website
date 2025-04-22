"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import GlitchText from "./components/GlitchText"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  readTime: string
  category: string
}

const featuredPosts: BlogPost[] = [
  {
    slug: "exploring-neural-audio-synthesis",
    title: "Exploring Neural Audio Synthesis: The Future of Sound Design",
    excerpt:
      "An in-depth look at how neural networks are revolutionizing sound design and audio synthesis, with practical examples and future directions.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-11-15",
    readTime: "8 min read",
    category: "Audio Technology",
  },
  {
    slug: "creative-applications-of-ai",
    title: "Creative Applications of AI in Contemporary Art",
    excerpt:
      "How artists are leveraging artificial intelligence to push the boundaries of creative expression and redefine artistic practices.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-10-22",
    readTime: "6 min read",
    category: "Art & Technology",
  },
  {
    slug: "building-custom-instruments",
    title: "Building Custom Digital Instruments: From Concept to Performance",
    excerpt:
      "A practical guide to designing and building custom digital instruments that bridge the gap between traditional musicianship and cutting-edge technology.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-09-30",
    readTime: "10 min read",
    category: "Instrument Design",
  },
]

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

export default function BlogSection() {
  return (
    <section id="articles" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ACIDS logo with lines on both sides */}
        <div className="flex items-center justify-center mb-12">
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

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-red-600 mr-4"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500">Knowledge</span>
            <div className="h-px w-12 bg-red-600 ml-4"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <GlitchText text="Articles & Insights" intensity="high" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest thoughts, research findings, and tutorials on creative technology, AI, and sound design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(220, 38, 38, 0.5)" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-mono py-1 px-2 rounded">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-sm mb-3 font-mono">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-4">{formatDate(post.date)}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-mono line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-red-500 hover:text-red-400 inline-flex items-center font-mono text-sm group mt-auto"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center bg-transparent border border-red-600 text-white hover:bg-red-600/10 px-6 py-3 rounded-lg transition-colors font-mono"
          >
            View All Articles
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
