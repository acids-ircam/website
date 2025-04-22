"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import WaveformVisualizer from "./WaveformVisualizer"

interface AudioTrack {
  title: string
  description: string
  url: string
}

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
    title: "Neurorack Demo",
    description: "Neural vocoder in a modular synthesizer",
    url: "https://acids-ircam.github.io/files_rave_is_all_you_need/audio/voice_to_cello.mp3",
  },
]

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

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

  return (
    <section className="py-32 bg-black noise-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center mb-4">
            <div className="h-px w-12 bg-red-600 mr-4"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500">Listen</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">Audio Experiments</h2>
          <p className="text-gray-400 font-mono">
            Sonic explorations through AI-generated audio and music transformations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm p-6 shadow-lg border border-red-900/20"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white font-mono">{audioTracks[currentTrack].title}</h3>
            <p className="text-gray-400 text-sm font-mono">{audioTracks[currentTrack].description}</p>
          </div>

          <audio ref={audioRef} src={audioTracks[currentTrack].url} onEnded={handleNextTrack} crossOrigin="anonymous" />

          {/* Waveform Visualization */}
          <WaveformVisualizer audioRef={audioRef} isPlaying={isPlaying} />

          <div className="mb-4">
            <input
              ref={progressBarRef}
              type="range"
              className="w-full h-1 bg-gray-800 rounded-none appearance-none cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #dc2626 0%, #dc2626 " +
                  (currentTime / duration) * 100 +
                  "%, #1f2937 " +
                  (currentTime / duration) * 100 +
                  "%, #1f2937 100%)",
              }}
              value={currentTime}
              max={duration}
              onChange={handleProgressChange}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1 font-mono">
              <span>{calculateTime(currentTime)}</span>
              <span>{duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <button onClick={handlePrevTrack} className="text-white hover:text-red-500 transition-colors">
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-red-600 text-white p-3 rounded-none hover:bg-red-700 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={handleNextTrack} className="text-white hover:text-red-500 transition-colors">
              <SkipForward size={24} />
            </button>
            <div className="flex items-center ml-4">
              <Volume2 size={18} className="text-gray-400 mr-2" />
              <input
                type="range"
                className="w-24 h-1 bg-gray-800 rounded-none appearance-none cursor-pointer"
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

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audioTracks.map((track, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  setCurrentTrack(index)
                  setIsPlaying(true)
                }}
                className={`p-3 cursor-pointer transition-colors ${
                  currentTrack === index
                    ? "bg-red-900/30 border border-red-600/50"
                    : "bg-gray-800/50 hover:bg-gray-700/50"
                }`}
                whileHover={{ x: 5 }}
              >
                <h4 className="font-mono text-white">{track.title}</h4>
                <p className="text-sm text-gray-400 font-mono">{track.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
