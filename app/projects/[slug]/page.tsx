import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"
import GlitchText from "@/components/GlitchText"

// This would typically come from a database or CMS
const projectsData = [
  {
    slug: "neural-harmonics",
    title: "Neural Harmonics",
    description: "Live performance featuring AI-generated soundscapes responding to acoustic instruments in real-time",
    fullDescription: `Neural Harmonics is a groundbreaking concert that explores the creative possibilities of AI-human musical collaboration. The performance features an ensemble of acoustic musicians whose playing is analyzed in real-time by our custom neural networks, which then generate complementary soundscapes that respond to the musical gestures, harmonies, and textures being performed live.

The system creates a dialogue between human musicians and AI, where each influences and inspires the other in real-time. This creates a unique performance every time, as the AI adapts to the specific nuances and improvisations of the musicians.

Developed in collaboration with Pierce Warnecke and Ensemble Intercontemporain, Neural Harmonics premiered at the Philharmonie de Paris in May 2023 to critical acclaim. The project demonstrates how AI can extend rather than replace human creativity, creating new possibilities for musical expression that neither humans nor machines could achieve alone.`,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    date: "2023-05-15",
    location: "Philharmonie de Paris, France",
    collaborators: ["Pierce Warnecke", "Ensemble Intercontemporain"],
    technologies: ["Real-time Audio Analysis", "Neural Audio Synthesis", "Custom Performance Interface"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "resonant-spaces",
    title: "Resonant Spaces",
    description: "Interactive sound installation that transforms visitor movements into evolving musical compositions",
    fullDescription: `Resonant Spaces is an interactive sound installation that transforms the movements of visitors into evolving musical compositions. Using a network of depth cameras and custom motion tracking software, the installation maps the positions and gestures of people in the space, translating this data into parameters that control a complex generative music system.

The installation creates a direct relationship between physical movement and sound, encouraging visitors to explore how their actions shape the sonic environment. As multiple people interact with the space simultaneously, their movements create a collaborative composition that evolves continuously.

Developed in collaboration with Björk and IRCAM, Resonant Spaces was installed at Centre Pompidou in Paris from November 2022 to February 2023. The project explores themes of embodiment, collective creativity, and the relationship between physical and sonic architectures.`,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    date: "2022-11-03",
    location: "Centre Pompidou, Paris, France",
    collaborators: ["Björk", "IRCAM"],
    technologies: ["Computer Vision", "Motion Tracking", "Generative Audio", "Spatial Sound"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 font-mono">
              <GlitchText text={project.title} intensity="medium" />
            </h1>
            <p className="text-red-500 font-mono mb-6">{project.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-start text-gray-400">
                <Users className="h-5 w-5 mr-2 mt-0.5" />
                <span>{project.collaborators.join(", ")}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-2 font-mono">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 font-mono">About the Project</h2>
          <div className="prose prose-invert max-w-none">
            {project.fullDescription.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Video */}
        {project.videoUrl && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">Video Documentation</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title={`${project.title} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 font-mono">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-gray-900/30 rounded-lg p-8 border border-red-900/20">
          <h2 className="text-2xl font-bold text-white mb-4 font-mono">Interested in Collaboration?</h2>
          <p className="text-gray-300 mb-6">
            Contact us to discuss potential collaborations or to learn more about our creative projects.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-mono"
          >
            Get in Touch
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
