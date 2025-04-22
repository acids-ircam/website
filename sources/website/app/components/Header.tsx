"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Mail } from "lucide-react"
import ScrollObserver from "./ScrollObserver"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { hasPassedLanding } = ScrollObserver()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = ["projects", "services", "music", "articles", "contact"]

  // Only show header after scrolling past landing page
  if (!hasPassedLanding && mounted) {
    return null
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-4 md:py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">ACIDS</span>
              <div className="flex items-center">
                {/* ACIDS Logo */}
                <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={40} height={24} className="mr-2" />
                <span className="font-mono font-bold text-xl tracking-tighter">ACIDS</span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-white"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                ></motion.span>
                <motion.span className="w-full h-0.5 bg-white" animate={{ opacity: menuOpen ? 0 : 1 }}></motion.span>
                <motion.span
                  className="w-full h-0.5 bg-white"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                ></motion.span>
              </div>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-x-8 items-center">
            {menuItems.map((item, index) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-mono uppercase tracking-wider text-white hover:text-red-500 transition-colors relative group elegant-hover"
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.span>
              </a>
            ))}

            {/* Social media links */}
            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://github.com/acids-ircam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a href="mailto:contact@acids.fr" className="text-white hover:text-red-500 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 bg-black z-40 flex items-center justify-center"
        initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          clipPath: menuOpen ? "circle(150% at top right)" : "circle(0% at top right)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-8">
          {/* ACIDS Logo in mobile menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
            transition={{ delay: menuOpen ? 0.1 : 0 }}
            className="mb-8"
          >
            <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={80} height={48} />
          </motion.div>

          {menuItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -50 }}
              transition={{ delay: menuOpen ? index * 0.1 + 0.2 : 0 }}
            >
              <a
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-2xl font-mono uppercase tracking-wider text-white hover:text-red-500 transition-colors"
              >
                {item}
              </a>
            </motion.div>
          ))}

          {/* Mobile social links */}
          <motion.div
            className="flex space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: menuOpen ? 0.6 : 0 }}
          >
            <a
              href="https://github.com/acids-ircam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a href="mailto:contact@acids.fr" className="text-white hover:text-red-500 transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
