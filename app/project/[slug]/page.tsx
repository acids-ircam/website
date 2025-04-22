import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const projects = [
  {
    slug: "artistic-creations",
    title: "Artistic Creations",
    description: "Collaborations with renowned composers and artists",
    details:
      "We've collaborated with visionary artists like Pierce Warnecke, Canblaster, and Molecule to create groundbreaking musical performances showcased at the world's  Canblaster, and Molecule to create groundbreaking musical performances showcased at the world's most prestigious venues. Our technologies enable these artists to push the boundaries of musical expression through innovative interfaces, real-time audio processing, and AI-driven sound generation.\n\nOur collaborations span from experimental electronic music to contemporary classical compositions, providing artists with tools that enhance their creative vision while maintaining their unique artistic voice. These partnerships have resulted in performances at venues like the Philharmonie de Paris, Barbican Centre, and major international festivals.\n\nWe provide both technical development and artistic consultation, working closely with composers and performers to create custom solutions that address their specific creative needs. This collaborative approach ensures that our technologies serve the artistic vision rather than constraining it.",
    fullDescription:
      "At ACIDS-IRCAM, we believe that the most exciting innovations happen at the intersection of art and technology. Our artistic collaborations represent the practical application of our research, bringing cutting-edge AI and audio processing techniques to the stage through partnerships with visionary artists.\n\nPierce Warnecke's work explores the boundaries between visual art and sound, using our technologies to create responsive environments where audio and visuals interact in real-time. Canblaster has incorporated our neural audio synthesis tools into his performances, creating hybrid sets that blend traditional electronic music production with AI-generated elements. Molecule has used our spatial audio processing systems to create immersive sonic experiences that transform concert venues into dynamic sound environments.\n\nThese collaborations are not just showcases for our technology—they're genuine artistic partnerships that push both the artists and our research in new directions. By working directly with performers and composers, we gain valuable insights into how our tools function in real-world creative contexts, which in turn informs our ongoing research and development.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["Real-time Audio Processing", "Machine Learning", "Custom Interface Design", "Spatial Audio"],
    link: "https://github.com/acids-ircam",
    year: "2018-Present",
  },
  {
    slug: "interactive-installations",
    title: "Interactive Installations",
    description: "Audio-reactive experiences in prestigious galleries",
    details:
      "Our interactive installations have been featured in world-renowned venues including the Centre Pompidou with Björk and the Serpentine Gallery with Holly Herndon. These immersive experiences combine real-time audio processing, machine learning, and responsive visual systems to create unique environments where sound, space, and audience interaction converge.",
    fullDescription:
      "Our interactive installations represent the convergence of artistic vision, spatial design, and technological innovation. Each installation is conceived as a unique ecosystem where sound, visuals, and audience interaction create emergent experiences that evolve over time.\n\nAt the Centre Pompidou, our collaboration with Björk resulted in an immersive environment where visitors' movements influenced both the sonic and visual elements of the space. The installation used machine learning to analyze movement patterns and translate them into evolving soundscapes that responded to collective audience behavior.\n\nOur work with Holly Herndon at the Serpentine Gallery explored the relationship between human and artificial voices, creating an installation where visitors could interact with a neural network trained on Holly's vocal performances. The system responded to spoken input, creating a dialogue between human visitors and the AI that blurred the boundaries between human and machine expression.\n\nThese installations demonstrate our commitment to creating meaningful interactions between technology and human experience, using AI not as a replacement for human creativity but as a tool for expanding the possibilities of artistic expression and audience engagement.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["Interactive Design", "Spatial Audio", "Computer Vision", "Machine Learning"],
    link: "https://github.com/acids-ircam",
    year: "2019-Present",
  },
  {
    slug: "neural-audio-synthesis",
    title: "Neural Audio Synthesis",
    description: "Pioneering AI models for sound generation",
    details:
      "Our research in neural audio synthesis has produced groundbreaking models that redefine what's possible in sound design and music production. These technologies enable real-time audio generation and transformation with unprecedented quality and control, allowing artists to explore entirely new sonic territories while maintaining creative agency.",
    fullDescription:
      "Our work in neural audio synthesis represents a significant advancement in how AI can be applied to sound generation and transformation. We've developed several key technologies that have become standard tools for artists and researchers working at the intersection of AI and audio.\n\nRAVE (Real-time Audio Variational autoEncoder) is our flagship model for high-quality, real-time audio synthesis. Unlike many neural audio models that require significant computational resources, RAVE is optimized for real-time performance on consumer hardware, making it accessible to musicians and sound designers for live performance and studio work.\n\nNN~ brings neural networks directly into the Max/MSP environment, allowing artists to integrate machine learning models into their existing workflows without leaving the tools they're already familiar with. This bridge between traditional computer music environments and cutting-edge AI has enabled new forms of hybrid creativity.\n\nAFTER (Audio Feature Transformer with Encoded RAVE) combines the strengths of transformer architectures with our RAVE model to create a system that can generate longer, more coherent audio sequences while maintaining the real-time performance that makes RAVE so useful in creative contexts.\n\nThese technologies share a common philosophy: AI should augment human creativity rather than replace it. We design our tools to be responsive to human input, providing artists with new sonic possibilities while keeping them in control of the creative process.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["PyTorch", "Python", "C++", "CUDA", "Audio DSP"],
    link: "https://github.com/acids-ircam/RAVE",
    year: "2020-Present",
  },
  {
    slug: "hardware-synthesizer-control",
    title: "Hardware Synthesizer and Control",
    description: "Bridging AI models with physical instruments",
    details:
      "We've developed innovative hardware solutions that bring neural audio models into the physical realm of modular synthesis and hardware instruments. Our technologies enable musicians to integrate AI-generated sounds into their analog setups, creating intuitive interfaces for controlling complex models through familiar hardware paradigms.",
    fullDescription:
      "Our hardware projects represent our commitment to bringing AI out of the computer and into the physical world of music-making. We believe that the tactile experience of interacting with physical controls is an essential part of musical expression, and our hardware designs aim to combine this physicality with the sonic possibilities of neural audio models.\n\nFlowSynth addresses a common challenge in music production: recreating a specific sound heard in a recording using available synthesizers. By leveraging normalizing flows, a type of generative model, FlowSynth learns the relationship between synthesizer parameters and the resulting audio. When presented with a target sound, it can suggest parameter settings that produce similar sonic results.\n\nOur hardware controllers for neural audio models provide musicians with physical interfaces for interacting with complex AI systems. These controllers translate familiar musical gestures—turning knobs, moving faders, playing notes—into parameters that control neural networks, creating an intuitive bridge between traditional musicianship and cutting-edge AI.\n\nThese projects demonstrate our approach to technology development: we start with the needs and practices of artists, then design technologies that enhance their creative process rather than disrupting it. By bringing AI into familiar musical contexts, we make these advanced technologies accessible to a wider range of musicians and sound designers.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["Embedded Systems", "C++", "Python", "PCB Design", "Digital Signal Processing"],
    link: "https://github.com/acids-ircam/flow_synthesizer",
    year: "2019-Present",
  },
]

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 font-mono">{project.title}</h1>
            <p className="text-red-500 font-mono mb-6">{project.description}</p>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-gray-300">{project.fullDescription}</p>
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

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-2 font-mono">Year</h2>
              <p className="text-gray-300">{project.year}</p>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-mono"
            >
              View Project
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-red-900/20">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-red-900/20">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
