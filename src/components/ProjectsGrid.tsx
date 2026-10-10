import React, { useState, useMemo } from 'react'
import { ArrowUpRight, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { PROJECTS_DATA } from '../data/websiteData'
import { ProjectItem } from '../types'

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void
}

type FilterCategory = 'all' | 'ongoing' | 'completed'

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all')
  const [showAll, setShowAll] = useState(false)

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'TÜM PROJELER' },
    { id: 'ongoing', label: 'SATIŞTA & DEVAM EDENLER' },
    { id: 'completed', label: 'TAMAMLANANLAR' },
  ]

  const handleFilterChange = (tabId: FilterCategory) => {
    setSelectedFilter(tabId)
    setShowAll(false)
  }

  const filteredProjects = useMemo(() => {
    const visible = PROJECTS_DATA.filter((p) => !p.hidden)
    if (selectedFilter === 'all') return visible
    if (selectedFilter === 'ongoing') {
      return visible.filter((p) => p.status === 'Satışta' || p.status === 'Yapım Aşamasında' || p.status === 'Satışta & Devam Ediyor' || p.status === 'Satışta, Devam Ediyor' || p.status === 'Devam Ediyor')
    }
    if (selectedFilter === 'completed') {
      return visible.filter((p) => p.status === 'Tamamlandı' || p.category === 'completed')
    }
    return visible
  }, [selectedFilter])

  const standardProjects = useMemo(() => {
    return filteredProjects.filter((p) => p.cardSize !== 'compact')
  }, [filteredProjects])

  const compactProjects = useMemo(() => {
    return filteredProjects.filter((p) => p.cardSize === 'compact')
  }, [filteredProjects])

  // Show first 4 standard projects (Asel, Almina, Seaside, Yeni Şehir) by default when filter is 'all' and !showAll
  const displayedStandardProjects = useMemo(() => {
    if (selectedFilter === 'all' && !showAll) {
      return standardProjects.slice(0, 4)
    }
    return standardProjects
  }, [standardProjects, selectedFilter, showAll])

  const displayedCompactProjects = useMemo(() => {
    if (selectedFilter === 'all' && !showAll) {
      return []
    }
    return compactProjects
  }, [compactProjects, selectedFilter, showAll])

  return (
    <section id="projeler" className="py-10 sm:py-16 md:py-24 bg-transparent text-[#fffff1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Architectural Section Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>MİMARİ PORTFÖY / WORKS</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fffff1] md:whitespace-nowrap">
            Karasu'da Hayat Bulan Projelerimiz
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#fffff1]/80 max-w-2xl font-light leading-relaxed">
            Her biri kendine özgü mimari kimliğe sahip, doğayla uyumlu, havuzlu ve kredisiz elden senetli konut projelerimizi keşfedin.
          </p>
        </div>

        {/* Filters (Slightly smaller on mobile, side-by-side maintained) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilterChange(tab.id)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm tracking-normal sm:tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-[#fffff1] text-[#252c33] border border-[#fffff1] font-semibold shadow-md'
                  : 'bg-white/5 text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/10 border border-[#fffff1]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Flagship / Standard Projects Grid */}
        {displayedStandardProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayedStandardProjects.map((project, index) => {
              const isWide = index % 3 === 0
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-[#fffff1]/15 hover:border-[#fffff1]/45 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${
                    isWide ? 'lg:col-span-2' : 'col-span-1'
                  } min-h-[155px] sm:min-h-[440px]`}
                >
                  {/* 100% Full-Bleed Background Image */}
                  <img
                    src={project.heroMedia.poster || project.gallery[0]?.url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle Top Vignette (for status badges contrast) */}
                  <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                  {/* Top Bar: Quick Arrow */}
                  <div className="relative z-10 p-2.5 sm:p-5 flex items-start justify-end">
                    <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                      <ArrowUpRight size={13} className="sm:hidden" />
                      <ArrowUpRight size={16} className="hidden sm:block" />
                    </div>
                  </div>

                  {/* Progressive Gradient Blur Layer (Seamless fade - No hard cut) */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                    style={{
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                    }}
                  />

                  {/* Soft Architectural Darkening Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none bg-gradient-to-t from-black/95 via-[#161a1f]/80 via-40% to-transparent" />

                  {/* Bottom Content Details */}
                  <div className="relative z-10 pt-2 pb-2.5 px-3 sm:pt-10 sm:pb-6 sm:px-6">
                    <h3 className="font-theSeasons text-lg sm:text-3xl font-bold text-[#fffff1] leading-tight mb-0.5 sm:mb-1 drop-shadow-md group-hover:translate-x-1 transition-transform">
                      {project.title}
                    </h3>

                    {/* Series & Progression Info (No shape, clean text) */}
                    {project.seriesInfo && (
                      <p className="text-[10px] sm:text-sm text-[#fffff1]/85 font-medium tracking-wide mb-0.5 sm:mb-2 drop-shadow">
                        {project.seriesInfo}
                      </p>
                    )}

                    {/* Satış durumu ibaresi */}
                    {(project.status === 'Satışta' || project.status === 'Satışta & Devam Ediyor' || project.status === 'Satışta, Devam Ediyor') && (
                      <div className="flex items-center space-x-1.5 mb-1 sm:mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-emerald-400">
                          {project.status === 'Satışta' ? 'Şimdi Satışta' : 'Satışta & Devam Ediyor'}
                        </span>
                      </div>
                    )}

                    <p className="text-xs sm:text-base text-[#fffff1]/90 font-light line-clamp-2 leading-relaxed mb-0 sm:mb-4 drop-shadow">
                      {project.slideDescription || project.subtitle}
                    </p>

                    {/* Specs & Projeyi İncele (Desktop only, completely removed on mobile as requested) */}
                    <div className="hidden sm:flex pt-3 border-t border-[#fffff1]/15 items-center justify-between text-sm">
                      <span className="text-[#fffff1]/80 flex items-center font-medium min-w-0 truncate mr-2">
                        <MapPin size={12} className="mr-1 text-[#fffff1] flex-shrink-0" /> {project.location.split(',')[0]}
                      </span>
                      <span className="text-[#fffff1] font-semibold flex items-center gap-1.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>Projeyi</span>
                        <span>İncele</span>
                        <ArrowUpRight size={13} className="flex-shrink-0" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 2. Compact 3-Column Side-by-Side Projects (No divider line, no separate title) */}
        {displayedCompactProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            {displayedCompactProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-[#fffff1]/15 hover:border-[#fffff1]/45 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between min-h-[145px] sm:min-h-[370px]"
              >
                {/* Background Image */}
                <img
                  src={project.heroMedia.poster || project.gallery[0]?.url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Bar */}
                <div className="relative z-10 p-2.5 sm:p-4 flex items-start justify-end">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                    <ArrowUpRight size={13} className="sm:hidden" />
                    <ArrowUpRight size={15} className="hidden sm:block" />
                  </div>
                </div>

                {/* Progressive Gradient Blur Layer */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none bg-gradient-to-t from-black/95 via-[#161a1f]/85 via-40% to-transparent" />

                {/* Bottom Content Details */}
                <div className="relative z-10 pt-2 pb-2.5 px-3 sm:pt-8 sm:pb-5 sm:px-5">
                  <h4 className="font-theSeasons text-lg sm:text-2xl font-bold text-[#fffff1] leading-tight mb-0.5 sm:mb-1 drop-shadow-md group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h4>

                  {/* Series / Progression Info (No shape, clean text) */}
                  {project.seriesInfo && (
                    <p className="text-[10px] sm:text-sm text-[#fffff1]/85 font-medium tracking-wide mb-0.5 sm:mb-2 drop-shadow">
                      {project.seriesInfo}
                    </p>
                  )}

                  {/* Satış durumu ibaresi */}
                  {(project.status === 'Satışta' || project.status === 'Satışta & Devam Ediyor' || project.status === 'Satışta, Devam Ediyor') && (
                    <div className="flex items-center space-x-1.5 mb-1 sm:mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-emerald-400">
                        {project.status === 'Satışta' ? 'Şimdi Satışta' : 'Satışta & Devam Ediyor'}
                      </span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#fffff1]/90 font-light line-clamp-2 leading-relaxed mb-0 sm:mb-3 drop-shadow">
                    {project.subtitle}
                  </p>

                  {/* Specs & Projeyi İncele (Desktop only, completely removed on mobile as requested) */}
                  <div className="hidden sm:flex pt-2.5 border-t border-[#fffff1]/15 items-center justify-between text-sm">
                    <span className="text-[#fffff1]/80 flex items-center font-medium min-w-0 truncate mr-2">
                      <MapPin size={12} className="mr-1 text-[#fffff1] flex-shrink-0" /> {project.location.split(',')[0]}
                    </span>
                    <span className="text-[#fffff1] font-semibold flex items-center gap-1.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span>Projeyi</span>
                      <span>İncele</span>
                      <ArrowUpRight size={13} className="flex-shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* "Hepsini Göster" / Expand Control (Katmansız, sadece yazı ve ok) */}
        {selectedFilter === 'all' && (standardProjects.length > 4 || compactProjects.length > 0) && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#fffff1]/80 hover:text-[#fffff1] transition-all cursor-pointer py-2"
              >
                <span>Hepsini Göster</span>
                <ChevronDown size={16} className="text-[#fffff1]/70 group-hover:text-[#fffff1] group-hover:translate-y-0.5 transition-all" />
              </button>
            ) : (
              <button
                onClick={() => setShowAll(false)}
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#fffff1]/60 hover:text-[#fffff1] transition-all cursor-pointer py-2"
              >
                <span>Daha Az Göster</span>
                <ChevronUp size={16} className="text-[#fffff1]/50 group-hover:text-[#fffff1] group-hover:-translate-y-0.5 transition-all" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
