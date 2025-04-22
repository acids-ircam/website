"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Twitter, Mail, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900/20 py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <motion.div
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={60} height={36} className="mr-3" />
              <h3 className="text-white font-mono text-lg">ACIDS</h3>
            </motion.div>
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Artificial Creative Intelligence and Data Science, exploring the boundaries of musical creativity through
              AI.
            </motion.p>
          </div>

          <div>
            <motion.h3
              className="text-white font-mono text-lg mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Links
            </motion.h3>
            <ul className="space-y-2">
              {["Projects", "Services", "Music", "Contact", "GitHub"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors font-mono elegant-hover"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <motion.h3
              className="text-white font-mono text-lg mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Connect
            </motion.h3>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a
                href="https://github.com/acids-ircam"
                className="text-gray-400 hover:text-red-500 transition-colors subtle-animation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
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
                className="text-gray-400 hover:text-red-500 transition-colors subtle-animation"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors subtle-animation"
              >
                <Twitter size={20} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors subtle-animation"
              >
                <Youtube size={20} />
              </a>

              <a
                href="mailto:contact@acids.fr"
                className="text-gray-400 hover:text-red-500 transition-colors subtle-animation"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 border-t border-red-900/10 pt-8">
          <div className="flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-mono bg-gradient-to-r from-red-900 via-red-500 to-red-900 bg-clip-text text-transparent">
                <span className="text-lg font-bold">A</span>rt ·<span className="text-lg font-bold">C</span>reation ·
                <span className="text-lg font-bold">I</span>nnovation ·<span className="text-lg font-bold">D</span>esign
                ·<span className="text-lg font-bold">S</span>ynthesis
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
