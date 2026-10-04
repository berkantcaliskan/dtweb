import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PROJECTS_DATA, COMPANY_INFO } from '../data/websiteData'
import { ResponsiveMedia } from './ResponsiveMedia'
import { ProjectItem } from '../types'

interface HeroSliderProps {
  onSelectProject: (project: ProjectItem) => void
  onOpenTour?: () => void
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectProject, onOpenTour }) => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [timerKey, setTimerKey] = useState(0)

  const currentProject = featuredProjects[currentIndex] || featuredProjects[0]

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex)
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [currentIndex, timerKey, featuredProjects.length])

  useEffect(() => {
    if (previousIndex === null) return
    const timeout = setTimeout(() => {
      setPreviousIndex(null)
    }, 1100)
    return () => clearTimeout(timeout)
  }, [previousIndex])

  const nextSlide = () => {
    setPreviousIndex(currentIndex)
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    setTimerKey((k) => k + 1)
  }

  const prevSlide = () => {
    setPreviousIndex(currentIndex)
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
    setTimerKey((k) => k + 1)
  }

  const scrollToNext = () => {
    const el = document.getElementById('projeler')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#252c33] flex items-center justify-center overflow-hidden">
      {/* Background Media (Full-Bleed 100% Cover - No Aspect Ratio Gaps) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {featuredProjects.map((project, idx) => {
          const isActive = idx === currentIndex
          const isOutgoing = idx === previousIndex

          return (
            <div
              key={project.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <ResponsiveMedia
                media={project.heroMedia}
                className="w-full h-full"
                imageClassName={isActive || isOutgoing ? 'animate-hero-mobile-pan' : ''}
                fillContainer={true}
                showControls={false}
                overlayGradient={false}
              />
            </div>
          )
        })}
      </div>

      {/* Hero Dark/Architectural Vignette Overlays - Softened for brighter visual presence */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#252c33] via-transparent to-black/35 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* Main Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] w-full pt-28 pb-10 sm:pb-12 flex flex-col justify-between min-h-[100dvh]">
        {/* Top Badges - Only slider index */}
        <div className="flex items-center justify-end text-xs text-[#fffff1]/80 tracking-widest uppercase">
          <div className="hidden sm:flex items-center space-x-3">
            <span className="text-[#fffff1] font-semibold">0{currentIndex + 1}</span>
            <div className="w-12 h-[1px] bg-[#fffff1]/30">
              <div
                className="h-full bg-[#fffff1] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / featuredProjects.length) * 100}%` }}
              />
            </div>
            <span className="text-[#fffff1]/40">0{featuredProjects.length}</span>
          </div>
        </div>

        {/* Center / Hero Typography */}
        <div key={currentProject.id} className="animate-hero-fade max-w-3xl my-auto py-6 sm:py-8">
          <h1 className="font-theSeasons text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fffff1] leading-[1.05] mb-4 drop-shadow-md">
            {currentProject.title}
          </h1>

          <p className="text-lg sm:text-2xl text-[#fffff1]/95 font-light max-w-2xl leading-relaxed mb-8 drop-shadow">
            {currentProject.subtitle}
          </p>

          {/* Call to Actions (Mobile: stacked vertically, Proje Detayları -2px, Tur +4px; Desktop: untouched) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onSelectProject(currentProject)}
              className="px-3 py-1.5 sm:px-6 sm:py-3.5 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-[9.5px] sm:text-sm uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-center justify-center flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
            >
              <span>Proje Detayları</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenTour) {
                  onOpenTour()
                } else {
                  const el = document.getElementById('tanitim-turu')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="glass-blur-box px-5 py-3.5 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 font-medium text-[13px] sm:text-sm uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 hover:border-[#fffff1]/40 cursor-pointer text-center justify-center flex items-center flex-shrink-0"
            >
              Ücretsiz Tanıtım Turu
            </button>
          </div>
        </div>

        {/* Bottom Bar: Slider Controls & Scroll Down */}
        {/* 1. MOBILE CONTROLS (Single row: Left = Discover, Center = < >, Right = Stacked Social Icons) */}
        <div className="flex sm:hidden items-end justify-between w-full pt-4">
          {/* Left: Architectural Scroll / Discovery Indicator */}
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 text-[#fffff1]/80 hover:text-[#fffff1] transition-all group cursor-pointer pb-0.5"
            aria-label="Projeleri Keşfedin"
          >
            <div className="w-4 h-7 rounded-full border border-[#fffff1]/30 flex justify-center pt-1 transition-colors">
              <div className="w-1 h-1.5 rounded-full bg-[#fffff1] animate-scroll-dot" />
            </div>
            <span className="text-[10px] tracking-[0.14em] font-medium uppercase text-[#fffff1]/85">
              Projeleri Keşfedin
            </span>
          </button>

          {/* Center: Prev / Next Navigation Arrows */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevSlide}
              aria-label="Önceki Proje"
              className="w-8 h-8 rounded-xl border border-[#fffff1]/20 bg-black/40 text-[#fffff1] flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Proje"
              className="w-8 h-8 rounded-xl border border-[#fffff1]/20 bg-black/40 text-[#fffff1] flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right: Vertically Stacked Social Icons (Bottom aligns flush with arrow buttons) */}
          <div className="flex flex-col items-center space-y-1">
            {/* 1. Instagram */}
            <a
              href={COMPANY_INFO.social?.instagram || 'https://www.instagram.com/demirturkinsaat'}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram: @demirturkinsaat"
              className="p-1 text-[#fffff1]/80 hover:text-white transition-all flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 stroke-current fill-none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* 2. Sahibinden */}
            <a
              href={COMPANY_INFO.social?.sahibinden || 'https://karasudemirturk.sahibinden.com/'}
              target="_blank"
              rel="noreferrer"
              aria-label="Sahibinden.com"
              title="Sahibinden.com Mağazamız"
              className="p-1 text-[#fffff1]/80 hover:text-white transition-all flex items-center justify-center"
            >
              <svg viewBox="4.5 4.5 22 22" className="w-[14px] h-[14px] fill-current" aria-hidden="true">
                <path d="M15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z"/>
              </svg>
            </a>

            {/* 3. Hepsi Emlak */}
            <a
              href={COMPANY_INFO.social?.hepsiemlak || 'https://www.hepsiemlak.com/emlak-ofisi/demirturk-yapi-insaat-sanayi-ve-ticaret-limited-si-159946'}
              target="_blank"
              rel="noreferrer"
              aria-label="Hepsiemlak"
              title="Hepsiemlak Mağazamız"
              className="p-1 text-[#fffff1]/80 hover:text-white transition-all flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-none stroke-current"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. DESKTOP CONTROLS (Preserved 100% untouched) */}
        <div className="hidden sm:flex flex-row items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-[#fffff1]/10">
          {/* Architectural Scroll / Discovery Indicator */}
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-3 text-[#fffff1]/70 hover:text-[#fffff1] transition-all group cursor-pointer"
            aria-label="Projeleri Keşfedin"
          >
            <div className="w-5 h-8 rounded-full border border-[#fffff1]/30 group-hover:border-[#fffff1] flex justify-center pt-1.5 transition-colors">
              <div className="w-1 h-2 rounded-full bg-[#fffff1] animate-scroll-dot" />
            </div>
            <span className="text-xs tracking-[0.2em] font-medium uppercase text-[#fffff1]/80 group-hover:text-[#fffff1] transition-colors">
              Projeleri Keşfedin
            </span>
          </button>

          {/* Right Controls: Portal Links + Arrow navigation */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* 1. Instagram */}
            <a
              href={COMPANY_INFO.social?.instagram || 'https://www.instagram.com/demirturkinsaat'}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram: @demirturkinsaat"
              className="p-1.5 text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* 2. Sahibinden */}
            <a
              href={COMPANY_INFO.social?.sahibinden || 'https://karasudemirturk.sahibinden.com/'}
              target="_blank"
              rel="noreferrer"
              aria-label="Sahibinden.com"
              title="Sahibinden.com Mağazamız"
              className="p-1.5 text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
            >
              <svg viewBox="4.5 4.5 22 22" className="w-[20px] h-[20px] fill-current" aria-hidden="true">
                <path d="M15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z"/>
              </svg>
            </a>

            {/* 3. Hepsi Emlak */}
            <a
              href={COMPANY_INFO.social?.hepsiemlak || 'https://www.hepsiemlak.com/emlak-ofisi/demirturk-yapi-insaat-sanayi-ve-ticaret-limited-si-159946'}
              target="_blank"
              rel="noreferrer"
              aria-label="Hepsiemlak"
              title="Hepsiemlak Mağazamız"
              className="p-1.5 text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </a>

            {/* Divider */}
            <div className="h-5 w-[1px] bg-[#fffff1]/20 mx-1" />

            {/* Arrow navigation (soft rounded squircle) */}
            <button
              onClick={prevSlide}
              aria-label="Önceki Proje"
              className="w-10 h-10 rounded-2xl border border-[#fffff1]/20 bg-black/40 hover:bg-white/10 hover:border-[#fffff1]/40 text-[#fffff1] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Proje"
              className="w-10 h-10 rounded-2xl border border-[#fffff1]/20 bg-black/40 hover:bg-white/10 hover:border-[#fffff1]/40 text-[#fffff1] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
