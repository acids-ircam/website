"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import WaveformVisualizer from "./WaveformVisualizer"
import GlitchText from "./GlitchText"
import Image from "next/image"

interface AudioTrack {
  title: string
  description: string
  url: string
}

// Main audio player tracks
const audioTracks: AudioTrack[] = [
  {
    title: "RAVE Demo 1",
    description: "Timbre transfer example using RAVE",
    url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
  },
  {
    title: "RAVE Demo 2",
    description: "Voice to cello transformation",
    url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
  },
  {
    title: "FlowSynth Example",
    description: "Synthesizer preset matching from audio sample",
    url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
  },
  {
    title: "NN~ Demonstration",
    description: "Neural network audio processing in Max/MSP",
    url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
  },
]

// Music releases for the carousel
const musicReleases = [
  {
    title: "Neural Synthesis Vol. 1",
    artist: "ACIDS",
    year: "2023",
    cover: "/placeholder.svg?height=300&width=300",
    tracks: [
      {
        title: "Latent Spaces",
        description: "Exploration of RAVE latent spaces",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
      },
      {
        title: "Emergent Patterns",
        description: "Generated from environmental recordings",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
      },
    ],
  },
  {
    title: "Algorithmic Compositions",
    artist: "ACIDS & Canblaster",
    year: "2022",
    cover: "/placeholder.svg?height=300&width=300",
    tracks: [
      {
        title: "Neural Harmonics",
        description: "AI-assisted composition",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
      },
      {
        title: "Synthetic Voices",
        description: "Voice synthesis experiments",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
      },
    ],
  },
  {
    title: "Timbre Transformations",
    artist: "ACIDS & Pierce Warnecke",
    year: "2022",
    cover: "/placeholder.svg?height=300&width=300",
    tracks: [
      {
        title: "Morphologies",
        description: "Instrument morphing techniques",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
      },
      {
        title: "Spectral Landscapes",
        description: "Spectral processing experiments",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
      },
    ],
  },
  {
    title: "Generative Soundscapes",
    artist: "ACIDS & Molecule",
    year: "2021",
    cover: "/placeholder.svg?height=300&width=300",
    tracks: [
      {
        title: "Ambient Structures",
        description: "Generated ambient textures",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_violin.mp3",
      },
      {
        title: "Evolving Systems",
        description: "Self-evolving sound systems",
        url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
      },
    ],
  },
]

// Mini player component for the music releases carousel
function MiniPlayer({ release, index }: { release: any; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, currentTrack])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev === release.tracks.length - 1 ? 0 : prev + 1))
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? release.tracks.length - 1 : prev - 1))
    setIsPlaying(true)
  }

  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-md rounded-lg p-4 border border-red-900/20 shadow-lg min-w-[280px] sm:min-w-[320px] md:min-w-[350px] flex-shrink-0 mx-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex space-x-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={release.cover || "/placeholder.svg"}
            alt={release.title}
            fill
            className="object-cover rounded-md"
            sizes="96px"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{release.title}</h3>
          <p className="text-gray-400 text-sm mb-2">
            {release.artist} • {release.year}
          </p>
          <p className="text-gray-500 text-xs mb-3">
            {release.tracks.length} track{release.tracks.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center space-x-2">
            <button onClick={prevTrack} className="text-white hover:text-red-500 transition-colors">
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={nextTrack} className="text-white hover:text-red-500 transition-colors">
              <SkipForward size={16} />
            </button>
            <div className="text-gray-400 text-xs ml-2">{release.tracks[currentTrack].title}</div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={release.tracks[currentTrack].url} onEnded={nextTrack} crossOrigin="anonymous" />
    </motion.div>
  )
}

export default function ExperimentalAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [carouselPosition, setCarouselPosition] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
    }
  }, [currentTrack])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, currentTrack])

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${returnedSeconds}`
  }

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current.value)
    }
  }

  const handlePrevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? audioTracks.length - 1 : prev - 1))
    setIsPlaying(true)
  }

  const handleNextTrack = () => {
    setCurrentTrack((prev) => (prev === audioTracks.length - 1 ? 0 : prev + 1))
    setIsPlaying(true)
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = 350 // Approximate width of a card
    const currentScroll = carouselRef.current.scrollLeft

    if (direction === "left") {
      carouselRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      carouselRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="music" className="py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-red-900/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ACIDS logo with lines on both sides */}
        <div className="flex items-center justify-center mb-12">
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
            <Image src="/images/acids_logo_white.png" alt="ACIDS Logo" width={60} height={36} />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            <GlitchText text="Sound Experiments" intensity="high" />
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the sonic possibilities of our AI audio research through these interactive demonstrations
          </p>
        </motion.div>

        {/* Music Releases Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4 font-mono">
              <GlitchText text="Music Releases" intensity="medium" />
            </h3>
            <p className="text-gray-400">
              Explore our collection of experimental music releases featuring AI-generated and AI-assisted compositions
            </p>
          </motion.div>

          {/* Carousel navigation */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => scrollCarousel("left")}
              className="p-2 bg-gray-900/50 rounded-full mr-2 hover:bg-red-900/30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="p-2 bg-gray-900/50 rounded-full hover:bg-red-900/30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Releases carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {musicReleases.map((release, index) => (
              <div key={index} className="snap-start">
                <MiniPlayer release={release} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Audio Demonstrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4 font-mono">
              <GlitchText text="Audio Demonstrations" intensity="medium" />
            </h3>
            <p className="text-gray-400">
              Interactive demonstrations of our neural audio models and sound processing techniques
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-900/20 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-900/20 rounded-full blur-xl" />

          <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-red-900/20 shadow-xl relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{audioTracks[currentTrack].title}</h3>
                <p className="text-gray-400">{audioTracks[currentTrack].description}</p>
              </motion.div>
            </AnimatePresence>

            <audio
              ref={audioRef}
              src={audioTracks[currentTrack].url}
              onEnded={handleNextTrack}
              crossOrigin="anonymous"
            />

            {/* Waveform Visualization */}
            <WaveformVisualizer audioRef={audioRef} isPlaying={isPlaying} />

            <div className="mb-6">
              <input
                ref={progressBarRef}
                type="range"
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #dc2626 ${(currentTime / duration) * 100}%, #374151 ${
                    (currentTime / duration) * 100
                  }%)`,
                }}
                value={currentTime}
                max={duration}
                onChange={handleProgressChange}
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{calculateTime(currentTime)}</span>
                <span>{duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8">
              <motion.button
                onClick={handlePrevTrack}
                className="text-white hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={28} />
              </motion.button>
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </motion.button>
              <motion.button
                onClick={handleNextTrack}
                className="text-white hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={28} />
              </motion.button>
              <div className="flex items-center ml-4">
                <Volume2 size={18} className="text-gray-400 mr-2" />
                <input
                  type="range"
                  className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  min={0}
                  max={1}
                  step={0.01}
                  defaultValue={0.75}
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = Number(e.target.value)
                    }
                  }}
                />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audioTracks.map((track, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index)
                    setIsPlaying(true)
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    currentTrack === index
                      ? "bg-red-900/30 border border-red-600/50"
                      : "bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-medium text-white">{track.title}</h4>
                  <p className="text-sm text-gray-400">{track.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
