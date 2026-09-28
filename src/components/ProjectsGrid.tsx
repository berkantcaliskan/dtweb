import React, { useState, useMemo } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { PROJECTS_DATA } from '../data/websiteData'
import { ProjectItem } from '../types'

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void
}

type FilterCategory = 'all' | 'ongoing' | 'completed'

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all')

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'TÜM PROJELER' },
    { id: 'ongoing', label: 'SATIŞTA & DEVAM EDENLER' },
    { id: 'completed', label: 'TAMAMLANANLAR' },
  ]

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return PROJECTS_DATA
    if (selectedFilter === 'ongoing') {
      return PROJECTS_DATA.filter((p) => p.status === 'Satışta' || p.status === 'Yapım Aşamasında')
    }
    if (selectedFilter === 'completed') {
      return PROJECTS_DATA.filter((p) => p.status === 'Tamamlandı' || p.category === 'completed')
    }
    return PROJECTS_DATA
  }, [selectedFilter])

  const standardProjects = useMemo(() => {
    return filteredProjects.filter((p) => p.cardSize !== 'compact')
  }, [filteredProjects])

  const compactProjects = useMemo(() => {
    return filteredProjects.filter((p) => p.cardSize === 'compact')
  }, [filteredProjects])

  return (
    <section id="projeler" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Architectural Section Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
            <span>MİMARİ PORTFÖY / WORKS</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fffff1] md:whitespace-nowrap">
            Karasu'da Hayat Bulan Projelerimiz
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#fffff1]/80 max-w-2xl font-light leading-relaxed">
            Her biri kendine özgü mimari kimliğe sahip, doğayla uyumlu, havuzlu ve kredisiz elden senetli konut projelerimizi keşfedin.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-[#313941] text-[#fffff1] border border-[#fffff1]/30 font-semibold shadow-md'
                  : 'bg-white/5 text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/10 border border-[#fffff1]/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Flagship / Standard Projects Grid */}
        {standardProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardProjects.map((project, index) => {
              const isWide = index % 3 === 0
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-[#fffff1]/15 hover:border-[#fffff1]/45 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${
                    isWide ? 'lg:col-span-2' : 'col-span-1'
                  } aspect-[16/10] sm:aspect-auto min-h-[240px] sm:min-h-[440px]`}
                >
                  {/* 100% Full-Bleed Background Image */}
                  <img
                    src={project.heroMedia.poster || project.gallery[0]?.url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle Top Vignette (for status badges contrast) */}
                  <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                  {/* Top Bar: Status Badges & Quick Arrow */}
                  <div className="relative z-10 p-3.5 sm:p-5 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.status !== 'Tamamlandı' && (
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs tracking-wider uppercase bg-black/65 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 font-medium rounded-md shadow-sm">
                          {project.status}
                        </span>
                      )}
                      {project.installmentMonths && (
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs tracking-wider uppercase bg-[#313941]/85 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/25 font-semibold rounded-md shadow-sm">
                          Elden Senet
                        </span>
                      )}
                    </div>

                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                      <ArrowUpRight size={15} />
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
                  <div className="relative z-10 pt-4 pb-4 px-4 sm:pt-10 sm:pb-6 sm:px-6">
                    <h3 className="font-theSeasons text-xl sm:text-3xl font-bold text-[#fffff1] leading-tight mb-1 drop-shadow-md group-hover:translate-x-1 transition-transform">
                      {project.title}
                    </h3>

                    {/* Series & Progression Info (No shape, clean text) */}
                    {project.seriesInfo && (
                      <p className="text-[11px] sm:text-sm text-[#fffff1]/85 font-medium tracking-wide mb-1 sm:mb-2.5 drop-shadow">
                        {project.seriesInfo}
                      </p>
                    )}

                    <p className="text-xs sm:text-base text-[#fffff1]/95 font-light line-clamp-1 sm:line-clamp-2 leading-relaxed mb-2.5 sm:mb-4 drop-shadow">
                      {project.subtitle}
                    </p>

                    {/* Specs & Projeyi İncele */}
                    <div className="pt-2 sm:pt-3 border-t border-[#fffff1]/15 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#fffff1]/80 flex items-center font-medium">
                        <MapPin size={13} className="mr-1 sm:mr-1.5 text-[#fffff1]" /> Karasu
                      </span>
                      <span className="text-[#fffff1] font-semibold flex items-center group-hover:translate-x-0.5 transition-transform">
                        <span>Projeyi İncele</span>
                        <ArrowUpRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 2. Compact 3-Column Side-by-Side Projects (No divider line, no separate title) */}
        {compactProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {compactProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-[#fffff1]/15 hover:border-[#fffff1]/45 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between aspect-[16/10] sm:aspect-auto min-h-[220px] sm:min-h-[370px]"
              >
                {/* Background Image */}
                <img
                  src={project.heroMedia.poster || project.gallery[0]?.url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Bar */}
                <div className="relative z-10 p-3.5 sm:p-4 flex items-start justify-between gap-2">
                  {project.status !== 'Tamamlandı' ? (
                    <span className="px-2.5 py-1 text-[11px] sm:text-xs tracking-wider uppercase bg-emerald-950/80 backdrop-blur-md text-emerald-200 border border-emerald-500/30 font-medium rounded-md shadow-sm">
                      {project.status}
                    </span>
                  ) : (
                    <div />
                  )}
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                    <ArrowUpRight size={15} />
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
                <div className="relative z-10 pt-4 pb-4 px-4 sm:pt-8 sm:pb-5 sm:px-5">
                  <h4 className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] leading-tight mb-1 drop-shadow-md group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h4>

                  {/* Series / Progression Info (No shape, clean text) */}
                  {project.seriesInfo && (
                    <p className="text-[11px] sm:text-sm text-[#fffff1]/85 font-medium tracking-wide mb-1 sm:mb-2 drop-shadow">
                      {project.seriesInfo}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#fffff1]/90 font-light line-clamp-1 sm:line-clamp-2 leading-relaxed mb-2.5 sm:mb-3 drop-shadow">
                    {project.subtitle}
                  </p>

                  <div className="pt-2 sm:pt-2.5 border-t border-[#fffff1]/15 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#fffff1]/80 flex items-center font-medium">
                      <MapPin size={12} className="mr-1 text-[#fffff1]" /> {project.location.split(',')[0]}
                    </span>
                    <span className="text-[#fffff1] font-semibold flex items-center group-hover:translate-x-0.5 transition-transform">
                      <span>İncele</span>
                      <ArrowUpRight size={13} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
