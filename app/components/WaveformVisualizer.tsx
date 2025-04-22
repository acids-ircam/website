"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface WaveformVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
}

export default function WaveformVisualizer({ audioRef, isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const sourceRef = useRef<MediaElementAudioSourceNode>()
  const dataArrayRef = useRef<Uint8Array>()

  useEffect(() => {
    if (!audioRef.current) return

    // Initialize audio context and analyzer
    const initializeAudio = () => {
      if (!audioRef.current) return

      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContext()

      // Create analyzer
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 2048

      // Connect audio element to analyzer
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)

      // Create data array for analyzer
      const bufferLength = analyserRef.current.frequencyBinCount
      dataArrayRef.current = new Uint8Array(bufferLength)
    }

    // Only initialize once
    if (!audioContextRef.current) {
      try {
        initializeAudio()
      } catch (error) {
        console.error("Error initializing audio analyzer:", error)
      }
    }

    return () => {
      // Clean up
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioRef])

  // Start/stop animation based on isPlaying
  useEffect(() => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return

    let animationFrameId: number

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Get canvas dimensions
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, "rgba(220, 38, 38, 0.6)")
      gradient.addColorStop(0.5, "rgba(220, 38, 38, 1)")
      gradient.addColorStop(1, "rgba(220, 38, 38, 0.6)")

      // Get waveform data
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

      // Draw waveform
      ctx.lineWidth = 2
      ctx.strokeStyle = gradient
      ctx.beginPath()

      const sliceWidth = width / dataArrayRef.current.length
      let x = 0

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 128.0
        const y = (v * height) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.lineTo(width, height / 2)
      ctx.stroke()

      // Add glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(220, 38, 38, 0.5)"
      ctx.stroke()

      // Continue animation loop
      animationFrameId = requestAnimationFrame(draw)
    }

    if (isPlaying) {
      draw()
    } else if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPlaying])

  return (
    <div className="relative w-full h-24 bg-gray-900/30 backdrop-blur-sm rounded-none overflow-hidden mb-4 waveform-container border border-red-900/20">
      <canvas ref={canvasRef} width={1000} height={100} className="w-full h-full" />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400 text-sm font-mono tracking-wider uppercase">Play to visualize</span>
        </div>
      )}
    </div>
  )
}
