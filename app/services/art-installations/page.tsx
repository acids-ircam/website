import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import GlitchText from "@/components/GlitchText"

export default function ArtInstallationsPage() {
  return (
    <div className="bg-black min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/#services"
          className="inline-flex items-center text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to services
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-mono">
            <GlitchText text="Art Installations" intensity="medium" />
          </h1>
          <div className="h-px w-24 bg-red-600 mb-8"></div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            We create immersive, interactive art installations that blend cutting-edge technology with artistic vision,
            designed for galleries, museums, public spaces, and events.
          </p>
        </div>

        {/* Main content with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="prose prose-invert max-w-none">
              <p>
                Our art installations combine advanced technologies like real-time audio processing, machine learning,
                computer vision, and responsive visual systems to create unique environments where sound, space, and
                audience interaction converge.
              </p>
              <p>
                We work closely with artists, curators, and venues to develop installations that engage audiences in
                meaningful ways, creating memorable experiences that challenge perceptions and inspire new ways of
                thinking about technology and art.
              </p>
              <p>
                From small gallery pieces to large-scale public installations, we handle every aspect of the development
                process, from initial concept to final implementation and maintenance.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">Our Approach</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-red-500 mr-3 font-bold">01.</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">Concept Development</h3>
                    <p className="text-gray-400 text-sm">
                      We work with you to develop a concept that aligns with your artistic vision, technical
                      requirements, and the specific context of the installation space.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-red-500 mr-3 font-bold">02.</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">Technical Design</h3>
                    <p className="text-gray-400 text-sm">
                      Our team designs the technical architecture of the installation, selecting appropriate
                      technologies and developing custom solutions as needed.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-red-500 mr-3 font-bold">03.</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">Implementation & Installation</h3>
                    <p className="text-gray-400 text-sm">
                      We handle the development, testing, and installation of all components, ensuring a seamless and
                      reliable experience for audiences.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-24">
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Interactive art installation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[150px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Installation detail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[150px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Audience interaction"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured projects section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 font-mono">Featured Installations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900/50 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Installation+${i}`}
                    alt={`Featured installation ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-1">Installation Project {i}</h3>
                  <p className="text-gray-400 text-sm mb-2">Location • Year</p>
                  <Link
                    href={`/projects/installation-${i}`}
                    className="text-red-500 text-sm hover:text-red-400 inline-flex items-center"
                  >
                    View details
                    <svg
                      className="w-4 h-4 ml-1"
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
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-gray-900/30 rounded-lg p-8 border border-red-900/20">
          <h2 className="text-2xl font-bold text-white mb-4 font-mono">Interested in an Installation?</h2>
          <p className="text-gray-300 mb-6">
            Contact us to discuss your project ideas and how we can help bring your vision to life.
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
