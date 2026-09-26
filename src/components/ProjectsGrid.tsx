import React, { useState, useMemo } from 'react'
import { ArrowUpRight, MapPin, Calendar, Layers, CheckCircle2 } from 'lucide-react'
import { PROJECTS_DATA } from '../data/websiteData'
import { ProjectItem } from '../types'

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void
}

type FilterCategory = 'all' | 'ongoing' | 'luxury-residence' | 'villa' | 'completed'

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all')

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'TÜM PROJELER' },
    { id: 'ongoing', label: 'SATIŞTA & DEVAM EDENLER' },
    { id: 'luxury-residence', label: 'HAVUZLU SİTELER' },
    { id: 'villa', label: 'MÜSTAKİL VİLLALAR' },
    { id: 'completed', label: 'TAMAMLANANLAR' },
  ]

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return PROJECTS_DATA
    if (selectedFilter === 'ongoing') {
      return PROJECTS_DATA.filter((p) => p.status === 'Satışta' || p.status === 'Yapım Aşamasında')
    }
    return PROJECTS_DATA.filter((p) => p.category === selectedFilter)
  }, [selectedFilter])

  return (
    <section id="projeler" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Architectural Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
              <span>MİMARİ PORTFÖY / WORKS</span>
            </div>
            <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              Karasu'da Hayat Bulan Projelerimiz
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#fffff1]/65 max-w-md font-light leading-relaxed">
            Her biri kendine özgü mimari kimliğe sahip, doğayla uyumlu, havuzlu ve kredisiz elden senetli konut projelerimizi keşfedin.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded text-xs tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedFilter === tab.id
                  ? 'bg-[#313941] text-[#fffff1] border border-[#fffff1]/30 font-semibold shadow-md'
                  : 'bg-white/5 text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/10 border border-[#fffff1]/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Architectural Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const isWide = index % 3 === 0
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-[#fffff1]/15 hover:border-[#fffff1]/45 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-2' : 'col-span-1'
                } min-h-[400px] sm:min-h-[440px]`}
              >
                {/* 100% Full-Bleed Background Image */}
                <img
                  src={project.heroMedia.poster || project.gallery[0]?.url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Top Vignette (for status badges contrast) */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                {/* Top Bar: Status Badges & Quick Arrow */}
                <div className="relative z-10 p-5 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase bg-black/65 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 font-medium rounded-md shadow-sm">
                      {project.status}
                    </span>
                    {project.installmentMonths && (
                      <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase bg-[#313941]/85 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/25 font-semibold rounded-md shadow-sm">
                        Elden Senet
                      </span>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom Overlay: Architectural Glass Blur & Darkening for Maximum Readability */}
                <div className="relative z-10 pt-20 pb-6 px-6 bg-gradient-to-t from-black/92 via-[#191e24]/75 to-transparent backdrop-blur-[3px]">
                  <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1] leading-tight mb-2 drop-shadow-md group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#fffff1]/85 font-light line-clamp-2 leading-relaxed mb-4 drop-shadow-sm">
                    {project.subtitle}
                  </p>

                  {/* Specs & Projeyi İncele */}
                  <div className="pt-3 border-t border-[#fffff1]/15 flex items-center justify-between text-xs">
                    <span className="text-[#fffff1]/75 flex items-center font-medium">
                      <MapPin size={12} className="mr-1.5 text-[#fffff1]" /> Karasu
                    </span>
                    <span className="text-[#fffff1] font-semibold flex items-center group-hover:translate-x-0.5 transition-transform">
                      <span>Projeyi İncele</span>
                      <ArrowUpRight size={13} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
