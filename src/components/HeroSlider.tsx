import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowDown, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import { PROJECTS_DATA, COMPANY_INFO } from '../data/websiteData'
import { ResponsiveMedia } from './ResponsiveMedia'
import { ProjectItem } from '../types'

interface HeroSliderProps {
  onSelectProject: (project: ProjectItem) => void
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectProject }) => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const currentProject = featuredProjects[currentIndex] || featuredProjects[0]

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 8500)
    return () => clearInterval(interval)
  }, [isAutoPlay, featuredProjects.length])

  const nextSlide = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const scrollToNext = () => {
    const el = document.getElementById('projeler')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#252c33] flex items-center justify-center overflow-hidden">
      {/* Background Media (Full-Bleed 100% Cover - No Aspect Ratio Gaps) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <ResponsiveMedia
              media={project.heroMedia}
              className="w-full h-full"
              fillContainer={true}
              showControls={false}
              overlayGradient={false}
            />
          </div>
        ))}
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

        {/* Center / Hero Typography (Emre Arolat Style) */}
        <div key={currentProject.id} className="animate-hero-fade max-w-3xl my-auto py-6 sm:py-8">
          <h1 className="font-theSeasons text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fffff1] leading-[1.05] mb-4 drop-shadow-md">
            {currentProject.title}
          </h1>

          <p className="text-base sm:text-xl text-[#fffff1]/90 font-light max-w-2xl leading-relaxed mb-6 drop-shadow">
            {currentProject.subtitle}
          </p>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-3 sm:py-4 border-t-0 border-b-0 sm:border-t sm:border-b border-[#fffff1]/15 max-w-xl text-xs sm:text-sm">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#fffff1]/50">Konum</span>
              <span className="text-[#fffff1]/90 font-medium flex items-center mt-0.5">
                <MapPin size={13} className="mr-1 text-[#fffff1]" /> Karasu Sahili
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#fffff1]/50">Ödeme Modeli</span>
              <span className="text-[#fffff1] font-semibold mt-0.5 block">
                Elden Senet
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[10px] uppercase tracking-wider text-[#fffff1]/50">Proje Durumu</span>
              <span className="text-[#fffff1]/90 font-medium mt-0.5 block">
                {currentProject.status}
              </span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="px-6 py-3.5 bg-[#313941] hover:bg-[#3a444e] text-[#fffff1] border border-[#fffff1]/20 font-semibold text-xs uppercase tracking-widest rounded transition-all shadow-lg hover:shadow-xl hover:border-[#fffff1]/40 hover:scale-105 active:scale-95"
            >
              Proje Detayları & Kat Planları
            </button>

            <a
              href="#tanitim-turu"
              className="glass-blur-box px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 text-xs uppercase tracking-widest rounded transition-all hover:scale-105 active:scale-95 hover:border-[#fffff1]/40"
            >
              Ücretsiz Tanıtım Turu
            </a>
          </div>
        </div>

        {/* Bottom Bar: Slider Controls & Scroll Down */}
        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t-0 sm:border-t border-[#fffff1]/10">
          {/* Architectural Scroll / Discovery Indicator */}
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-3 text-[#fffff1]/70 hover:text-[#fffff1] transition-all group"
            aria-label="Projeleri Keşfedin"
          >
            <div className="w-5 h-8 rounded-full border border-[#fffff1]/30 group-hover:border-[#fffff1] flex justify-center pt-1.5 transition-colors">
              <div className="w-1 h-2 rounded-full bg-[#fffff1] animate-scroll-dot" />
            </div>
            <span className="text-[11px] tracking-[0.25em] font-medium uppercase text-[#fffff1]/80 group-hover:text-[#fffff1] transition-colors">
              Projeleri Keşfedin
            </span>
          </button>

          {/* Arrow navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              aria-label="Önceki Proje"
              className="w-10 h-10 rounded-full border border-[#fffff1]/20 bg-black/40 hover:bg-[#313941] hover:border-[#fffff1]/40 text-[#fffff1] flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Proje"
              className="w-10 h-10 rounded-full border border-[#fffff1]/20 bg-black/40 hover:bg-[#313941] hover:border-[#fffff1]/40 text-[#fffff1] flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
