"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import Script from "next/script"

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [scrolled, setScrolled] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Handle scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize Three.js scene after scripts are loaded
  useEffect(() => {
    if (!canvasRef.current || !scriptLoaded || typeof window.THREE === "undefined") return

    const THREE = window.THREE
    const OrbitControls = window.OrbitControls

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xff0000, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const redPointLight = new THREE.PointLight(0xff0000, 2, 10)
    redPointLight.position.set(2, 0, 2)
    scene.add(redPointLight)

    // Create the orb
    const orbGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: false,
    })
    const orb = new THREE.Mesh(orbGeometry, orbMaterial)
    scene.add(orb)

    // Create the tunnel of synthesizers
    const tunnelLength = 20
    const tunnelRadius = 4
    const synthCount = 50
    const synths = []

    // Create a simple synthesizer model
    const createSynthModel = () => {
      const synthGroup = new THREE.Group()

      // Main body
      const bodyGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.5)
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x990000 : 0x660000,
        metalness: 0.7,
        roughness: 0.3,
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      synthGroup.add(body)

      // Knobs
      for (let i = 0; i < 4; i++) {
        const knobGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16)
        const knobMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.9,
          roughness: 0.1,
        })
        const knob = new THREE.Mesh(knobGeometry, knobMaterial)
        knob.rotation.x = Math.PI / 2
        knob.position.set(-0.3 + i * 0.2, 0.15, 0)
        synthGroup.add(knob)
      }

      // Keys
      for (let i = 0; i < 8; i++) {
        const isBlackKey = [1, 3, 6].includes(i)
        const keyGeometry = new THREE.BoxGeometry(0.06, isBlackKey ? 0.1 : 0.05, 0.2)
        const keyMaterial = new THREE.MeshStandardMaterial({
          color: isBlackKey ? 0x000000 : 0xffffff,
          metalness: 0.1,
          roughness: 0.9,
        })
        const key = new THREE.Mesh(keyGeometry, keyMaterial)
        key.position.set(-0.28 + i * 0.08, isBlackKey ? 0.075 : 0.05, 0.2)
        synthGroup.add(key)
      }

      return synthGroup
    }

    // Place synthesizers in a tunnel formation
    for (let i = 0; i < synthCount; i++) {
      const synth = createSynthModel()

      // Position in a spiral tunnel
      const angle = (i / synthCount) * Math.PI * 10
      const z = -tunnelLength + (i / synthCount) * tunnelLength * 2
      const radius = tunnelRadius * (1 - Math.abs(z / tunnelLength))

      synth.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, z)

      // Random rotation
      synth.rotation.x = Math.random() * Math.PI * 2
      synth.rotation.y = Math.random() * Math.PI * 2
      synth.rotation.z = Math.random() * Math.PI * 2

      scene.add(synth)
      synths.push(synth)
    }

    // Camera position
    camera.position.z = 5

    // Controls for orb interaction
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Move red point light with mouse
      redPointLight.position.x = mouse.x * 5
      redPointLight.position.y = mouse.y * 5
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Animate orb
      orb.rotation.x += 0.001
      orb.rotation.y += 0.002

      // Animate synths in the tunnel
      synths.forEach((synth, i) => {
        // Move synths forward in the tunnel
        synth.position.z += 0.02

        // If a synth goes beyond the tunnel end, reset it to the beginning
        if (synth.position.z > tunnelLength) {
          const angle = Math.random() * Math.PI * 2
          synth.position.set(Math.cos(angle) * tunnelRadius, Math.sin(angle) * tunnelRadius, -tunnelLength)

          // Randomize rotation again
          synth.rotation.x = Math.random() * Math.PI * 2
          synth.rotation.y = Math.random() * Math.PI * 2
          synth.rotation.z = Math.random() * Math.PI * 2
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      renderer.dispose()
    }
  }, [scriptLoaded])

  return (
    <>
      {/* Load Three.js and OrbitControls from CDN */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js"
        onLoad={() => {
          // Load OrbitControls after Three.js is loaded
          const orbitScript = document.createElement("script")
          orbitScript.src = "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js"
          orbitScript.onload = () => setScriptLoaded(true)
          document.body.appendChild(orbitScript)
        }}
        strategy="beforeInteractive"
      />

      <div ref={containerRef} className="fixed inset-0 w-full h-screen bg-black z-50 overflow-hidden">
        {/* Three.js canvas for 3D effects */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay with logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/images/acids_logo_white.png"
              alt="ACIDS Logo"
              width={isMobile ? 150 : 250}
              height={isMobile ? 90 : 150}
              className="drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -10 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white text-sm font-mono mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

// Add Three.js types to the global Window interface
declare global {
  interface Window {
    THREE: any
    OrbitControls: any
  }
}
