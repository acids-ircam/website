import "./globals.css"
import { Space_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BackgroundAnimation from "./components/BackgroundAnimation"
import type React from "react"

// Properly load fonts using Next.js font system
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "ACIDS-IRCAM | Artificial Creative Intelligence and Data Science",
  description: "Exploring musical creativity through AI and deep learning at IRCAM",
  generator: "v0.dev",
}

// Add a global particle background to ensure particles are visible throughout the site

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} ${inter.variable} min-h-screen bg-black text-white dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <BackgroundAnimation />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
