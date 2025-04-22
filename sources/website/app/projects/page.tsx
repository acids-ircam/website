"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import GlitchText from "@/components/GlitchText"

// Project data structure
interface Project {
  id: string
  title: string
  description: string
  image: string
  category: "concert" | "installation" | "exhibition"
  date: string
  location: string
  collaborators: string[]
  link: string
}

// Sample project data
const projects: Project[] = [
  {
    id: "project-01",
    title: "Neural Harmonics",
    description: "Live performance featuring AI-generated soundscapes responding to acoustic instruments in real-time",
    image: "/placeholder.svg?height=400&width=600",
    category: "concert",
    date: "2023-05-15",
    location: "Philharmonie de Paris, France",
    collaborators: ["Pierce Warnecke", "Ensemble Intercontemporain"],
    link: "/projects/neural-harmonics",
  },
  {
    id: "project-02",
    title: "Resonant Spaces",
    description: "Interactive sound installation that transforms visitor movements into evolving musical compositions",
    image: "/placeholder.svg?height=400&width=600",
    category: "installation",
    date: "2022-11-03",
    location: "Centre Pompidou, Paris, France",
    collaborators: ["Björk", "IRCAM"],
    link: "/projects/resonant-spaces",
  },
  {
    id: "project-03",
    title: "Synthetic Voices",
    description: "Exhibition exploring the boundary between human and machine-generated vocal expressions",
    image: "/placeholder.svg?height=400&width=600",
    category: "exhibition",
    date: "2023-02-18",
    location: "Serpentine Gallery, London, UK",
    collaborators: ["Holly Herndon", "Mat Dryhurst"],
    link: "/projects/synthetic-voices",
  },
  {
    id: "project-04",
    title: "Latent Landscapes",
    description: "Immersive audiovisual installation generated from environmental field recordings",
    image: "/placeholder.svg?height=400&width=600",
    category: "installation",
    date: "2022-09-10",
    location: "ZKM Center for Art and Media, Karlsruhe, Germany",
    collaborators: ["Ryoji Ikeda", "Carsten Nicolai"],
    link: "/projects/latent-landscapes",
  },
  {
    id: "project-05",
    title: "Algorithmic Orchestra",
    description: "Concert featuring AI systems performing alongside traditional orchestral musicians",
    image: "/placeholder.svg?height=400&width=600",
    category: "concert",
    date: "2023-07-22",
    location: "Barbican Centre, London, UK",
    collaborators: ["London Symphony Orchestra", "Canblaster"],
    link: "/projects/algorithmic-orchestra",
  },
  {
    id: "project-06",
    title: "Neural Artifacts",
    description: "Exhibition of physical objects generated from neural network latent spaces",
    image: "/placeholder.svg?height=400&width=600",
    category: "exhibition",
    date: "2022-12-05",
    location: "MoMA PS1, New York, USA",
    collaborators: ["Refik Anadol", "Casey Reas"],
    link: "/projects/neural-artifacts",
  },
  {
    id: "project-07",
    title: "Synthetic Memories",
    description: "Interactive installation exploring AI-generated narratives and soundscapes",
    image: "/placeholder.svg?height=400&width=600",
    category: "installation",
    date: "2023-03-15",
    location: "Ars Electronica Center, Linz, Austria",
    collaborators: ["Molecule", "ARS Electronica Futurelab"],
    link: "/projects/synthetic-memories",
  },
  {
    id: "project-08",
    title: "Emergent Rhythms",
    description: "Live performance featuring neural networks trained on global percussion traditions",
    image: "/placeholder.svg?height=400&width=600",
    category: "concert",
    date: "2023-06-30",
    location: "MUTEK Festival, Montreal, Canada",
    collaborators: ["Arca", "Jlin"],
    link: "/projects/emergent-rhythms",
  },
  {
    id: "project-09",
    title: "Digital Ecosystems",
    description: "Exhibition of self-evolving audiovisual systems responding to environmental data",
    image: "/placeholder.svg?height=400&width=600",
    category: "exhibition",
    date: "2022-10-12",
    location: "Tate Modern, London, UK",
    collaborators: ["Brian Eno", "Daito Manabe"],
    link: "/projects/digital-ecosystems",
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter projects based on selected category
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  // Category options with counts
  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    { id: "concert", name: "Concerts", count: projects.filter((p) => p.category === "concert").length },
    { id: "installation", name: "Installations", count: projects.filter((p) => p.category === "installation").length },
    { id: "exhibition", name: "Exhibitions", count: projects.filter((p) => p.category === "exhibition").length },
  ]

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 font-mono">
            <GlitchText text="Creative Projects" intensity="medium" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of concerts, installations, and exhibitions at the intersection of art, technology,
            and sound.
          </p>
        </div>

        {/* Filter section */}
        <div className="mb-12">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 rounded-lg text-white"
            >
              <span>Filter: {categories.find((c) => c.id === filter)?.name}</span>
              <Filter size={18} />
            </button>
          </div>

          {/* Filter options - mobile dropdown */}
          <motion.div
            className="md:hidden mb-6 overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: isFilterOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setFilter(category.id)
                    setIsFilterOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filter === category.id ? "bg-red-900/30 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Desktop filter tabs */}
          <div className="hidden md:flex justify-center space-x-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-mono transition-colors ${
                  filter === category.id ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 h-full flex flex-col hover:border-red-600/30 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-mono py-1 px-2 rounded">
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-sm mb-3 font-mono">
                  <span className="mr-4">{project.date}</span>
                  <span>{project.location}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 font-mono line-clamp-2">{project.title}</h2>
                <p className="text-gray-400 mb-4 flex-grow line-clamp-3">{project.description}</p>

                {/* Collaborators */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Collaborators:</p>
                  <p className="text-xs text-gray-400">{project.collaborators.join(", ")}</p>
                </div>

                <Link
                  href={project.link}
                  className="text-red-500 hover:text-red-400 inline-flex items-center font-mono text-sm group mt-auto"
                >
                  View Project
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No projects found in this category.</p>
            <button onClick={() => setFilter("all")} className="text-red-500 hover:text-red-400 font-mono">
              View all projects
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
