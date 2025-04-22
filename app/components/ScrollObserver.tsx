"use client"

import { useEffect, useState } from "react"

export default function ScrollObserver() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hasPassedLanding, setHasPassedLanding] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)

      // Check if we've scrolled past the landing page
      if (position > window.innerHeight * 0.7) {
        setHasPassedLanding(true)
      } else {
        setHasPassedLanding(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { scrollPosition, hasPassedLanding }
}
