import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
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
  {
    slug: "ai-in-live-performance",
    title: "AI in Live Performance: Challenges and Opportunities",
    excerpt:
      "Exploring how artificial intelligence is being integrated into live music and performance art, and the unique considerations for artists working in real-time contexts.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-09-15",
    readTime: "7 min read",
    category: "Performance",
  },
  {
    slug: "ethics-of-ai-art",
    title: "The Ethics of AI Art: Ownership, Attribution, and Bias",
    excerpt:
      "A critical examination of the ethical questions surrounding AI-generated and AI-assisted art, including issues of copyright, creative attribution, and algorithmic bias.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-08-28",
    readTime: "9 min read",
    category: "Ethics & Philosophy",
  },
  {
    slug: "sound-design-for-installations",
    title: "Sound Design for Interactive Installations: A Technical Guide",
    excerpt:
      "Technical considerations and best practices for creating effective sound design for interactive art installations, including spatial audio, sensor integration, and environmental factors.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "2023-08-10",
    readTime: "11 min read",
    category: "Sound Design",
  },
]

const categories = [
  "All",
  "Audio Technology",
  "Art & Technology",
  "Instrument Design",
  "Performance",
  "Ethics & Philosophy",
  "Sound Design",
]

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 font-mono">Blog & Articles</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest thoughts, research findings, and tutorials on creative technology, AI, and sound design.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                category === "All" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 h-full flex flex-col hover:border-red-600/30 transition-colors group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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

                <h2 className="text-xl font-bold text-white mb-3 font-mono line-clamp-2">{post.title}</h2>
                <p className="text-gray-400 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-red-500 hover:text-red-400 inline-flex items-center font-mono text-sm group mt-auto"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
