"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { Code, Paintbrush, Music, Cpu, Wrench, Lightbulb } from "lucide-react"
import GlitchText from "./GlitchText"
import Link from "next/link"

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
  bulletPoints: string[]
  pageLink: string
  index: number
  color: string
}

function ServiceItem({ icon, title, description, bulletPoints, pageLink, index, color }: ServiceItemProps) {
  // Calculate staggered positions for experimental layout
  const isEven = index % 2 === 0
  const isThird = index % 3 === 0

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{
        zIndex: 10 - index,
      }}
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-transparent via-red-900/20 to-transparent rounded-lg blur-lg"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3 + index,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="relative flex items-start space-x-4 p-4">
        <motion.div
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-black border border-red-600/30"
          whileHover={{ scale: 1.1, borderColor: "rgba(220, 38, 38, 0.8)" }}
          animate={{
            boxShadow: ["0 0 0 rgba(220, 38, 38, 0)", "0 0 15px rgba(220, 38, 38, 0.5)", "0 0 0 rgba(220, 38, 38, 0)"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="text-red-500">{icon}</div>
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 font-mono">
            <GlitchText text={title} intensity="low" />
          </h3>

          <motion.div
            className="h-px w-12 bg-red-600/50 mb-2"
            animate={{
              width: ["30%", "60%", "30%"],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <p className="text-gray-400 text-sm">{description}</p>

          {/* Removed bullet points and individual service links */}
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className={`absolute ${isEven ? "-right-2" : "-left-2"} ${isThird ? "top-1/2" : "bottom-0"} w-1 h-12 bg-red-600/30`}
        animate={{
          height: ["30px", "60px", "30px"],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: index * 0.2,
        }}
      />

      {/* Add subtle floating particles for experimental effect */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`particle-${index}-${i}`}
          className="absolute w-1 h-1 rounded-full bg-red-500/70"
          style={{
            left: `${20 + i * 30}%`,
            top: `${isEven ? 80 - (i * 30) : 20 + (i * 30)}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.1 + i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )
}

export default function ServicesSection() {
  const services = [
    {
      icon: <Paintbrush size={24} />,
      title: "Art Installations",
      description:
        "Interactive and immersive art installations that blend technology with creative expression, designed for galleries, events, and public spaces.",
      bulletPoints: [
        "Custom interactive installations for museums and galleries",
        "Audio-reactive visual experiences for performances",
        "Immersive environments with audience participation",
      ],
      pageLink: "/services/art-installations",
      color: "#dc2626",
    },
    {
      icon: <Wrench size={24} />,
      title: "Customized Instruments",
      description:
        "Bespoke electronic and digital instruments tailored to artists' specific needs, combining traditional craftsmanship with cutting-edge technology.",
      bulletPoints: [
        "Custom MIDI controllers for specific performance needs",
        "Neural network-powered synthesizers and processors",
        "Hardware interfaces for AI audio models",
      ],
      pageLink: "/services/customized-instruments",
      color: "#991b1b",
    },
    {
      icon: <Music size={24} />,
      title: "Sound Design",
      description:
        "Professional sound design services for films, games, installations, and performances, creating unique sonic identities and immersive audio experiences.",
      bulletPoints: [
        "AI-assisted sound design for film and media",
        "Generative audio systems for interactive applications",
        "Spatial audio design for immersive experiences",
      ],
      pageLink: "/services/sound-design",
      color: "#b91c1c",
    },
    {
      icon: <Cpu size={24} />,
      title: "Model Training",
      description:
        "Custom AI model development and training for creative applications, from audio synthesis to generative art and interactive experiences.",
      bulletPoints: [
        "Custom neural audio models trained on specific datasets",
        "Fine-tuning of existing models for specialized applications",
        "Development of real-time inference systems",
      ],
      pageLink: "/services/model-training",
      color: "#dc2626",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Consulting",
      description:
        "Expert guidance on implementing AI in creative workflows, helping artists and organizations leverage technology for innovative expression.",
      bulletPoints: [
        "Technical assessment and implementation planning",
        "Artist-specific workflow integration strategies",
        "Workshops and training for creative teams",
      ],
      pageLink: "/services/consulting",
      color: "#991b1b",
    },
    {
      icon: <Code size={24} />,
      title: "Custom Software",
      description:
        "Bespoke software solutions for creative professionals, including audio plugins, interactive applications, and specialized creative tools.",
      bulletPoints: [
        "Custom audio plugins (VST/AU) for unique processing",
        "Interactive applications for performances and installations",
        "Integration of AI models with existing creative software",
      ],
      pageLink: "/services/custom-software",
      color: "#b91c1c",
    },
  ]

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Artistic background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute top-0 bottom-0 w-[1px] bg-red-600/30"
            style={{ left: `${(i / 20) * 100}%` }}
            animate={{
              height: ["70%", "90%", "70%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Horizontal lines */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`hline-${i}`}
            className="absolute left-0 right-0 h-[1px] bg-red-600/20"
            style={{ top: `${(i / 10) * 100}%` }}
            animate={{
              width: ["70%", "90%", "70%"],
              opacity: [0.1, 0.2, 0.1],
              left: ["15%", "5%", "15%"],
            }}
            transition={{
              duration: 7 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Floating circles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-red-600/10"
            style={{
              width: `${20 + Math.random() * 100}px`,
              height: `${20 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(10px)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            {/* ACIDS logo with lines on both sides */}
            <div className="flex items-center justify-center mb-8 w-full">
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
                <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={60} height={36} className="mb-4" />
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
              className="mb-6"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-red-500 border border-red-800/30 px-4 py-2">
                Artistic Offerings
              </span>
            </motion.div>

            <h2 className="text-5xl font-bold text-white mb-3 font-mono text-center">
              <GlitchText text="Our Services" intensity="high" />
            </h2>

            <motion.div
              className="h-px w-24 bg-red-600 mx-auto mb-3"
              animate={{
                width: ["60px", "120px", "60px"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-center mb-6">
              Experimental tools and creative solutions at the intersection of art, technology, and sound
            </p>
          </div>
        </motion.div>

        {/* Services grid - restore the original grid but with experimental elements */}
        <div className="space-y-8 relative z-10">
          {services.map((service, index) => (
            <ServiceItem
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              bulletPoints={service.bulletPoints}
              pageLink={service.pageLink}
              index={index}
              color={service.color}
            />
          ))}
        </div>

        {/* Add a single "Explore Services" button */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/services"
            className="px-8 py-4 bg-transparent border-2 border-red-600 text-white font-mono uppercase tracking-wider transition-all duration-300 hover:bg-red-600/10 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Services</span>
            <motion.div
              className="absolute inset-0 bg-red-600/10 -z-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        {/* Add connecting lines for experimental effect */}
        <svg
          className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <motion.path
            d="M100,100 C200,150 300,50 400,200 C500,350 600,250 700,300"
            fill="none"
            stroke="#dc2626"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M150,300 C250,200 350,250 450,150 C550,50 650,100 750,50"
            fill="none"
            stroke="#991b1b"
            strokeWidth="0.5"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
      </div>
    </section>
  )
}
