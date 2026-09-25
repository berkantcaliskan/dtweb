import React, { useRef, useState, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react'
import { ProjectMedia } from '../types'

interface ResponsiveMediaProps {
  media: ProjectMedia
  className?: string
  priority?: boolean
  showControls?: boolean
  overlayGradient?: boolean
  fillContainer?: boolean
}

export const ResponsiveMedia: React.FC<ResponsiveMediaProps> = ({
  media,
  className = '',
  showControls = true,
  overlayGradient = true,
  fillContainer = false,
}) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (desktopVideoRef.current) desktopVideoRef.current.muted = newMuted
    if (mobileVideoRef.current) mobileVideoRef.current.muted = newMuted
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const activeRef = isMobile ? mobileVideoRef.current : desktopVideoRef.current
    if (activeRef) {
      if (isPlaying) {
        activeRef.pause()
        setIsPlaying(false)
      } else {
        activeRef.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  if (media.type === 'image') {
    if (fillContainer) {
      return (
        <div className={`relative overflow-hidden w-full h-full ${className}`}>
          <img
            src={isMobile && media.mobileSrc ? media.mobileSrc : media.desktopSrc}
            alt={media.alt}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {overlayGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          )}
        </div>
      )
    }

    return (
      <div className={`relative overflow-hidden w-full ${className}`}>
        {/* Mobile Vertical (9:16 or 4:5) */}
        <div className="block md:hidden w-full aspect-[9/16] sm:aspect-[4/5] relative overflow-hidden">
          <img
            src={media.mobileSrc || media.desktopSrc}
            alt={media.alt}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Desktop Horizontal (16:9) */}
        <div className="hidden md:block w-full aspect-[16/9] relative overflow-hidden">
          <img
            src={media.desktopSrc}
            alt={media.alt}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        )}
      </div>
    )
  }

  if (fillContainer) {
    return (
      <div className={`relative overflow-hidden w-full h-full group ${className}`}>
        <video
          ref={desktopVideoRef}
          src={isMobile && media.mobileSrc ? media.mobileSrc : media.desktopSrc}
          poster={media.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden w-full group ${className}`}>
      {/* MOBİL: 9:16 Dikey Mimari Video */}
      <div className="block md:hidden w-full aspect-[9/16] relative bg-[#252c33] overflow-hidden">
        <video
          ref={mobileVideoRef}
          src={media.mobileSrc}
          poster={media.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* MASAÜSTÜ: 16:9 Yatay Mimari Video */}
      <div className="hidden md:block w-full aspect-[16/9] relative bg-[#252c33] overflow-hidden">
        <video
          ref={desktopVideoRef}
          src={media.desktopSrc}
          poster={media.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Elegant Dark Vignette / Gradient */}
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />
      )}

      {/* Video Controls (Mute & Play/Pause) */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-30 flex items-center space-x-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Videoyu duraklat' : 'Videoyu oynat'}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:border-[#fffff1]/60 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:border-[#fffff1]/60 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      )}
    </div>
  )
}
