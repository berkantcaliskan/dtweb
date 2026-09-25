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
                className={`group relative cursor-pointer bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#fffff1]/40 hover:shadow-2xl flex flex-col ${
                  isWide ? 'lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container (16:9 on desktop, responsive) */}
                <div className={`relative overflow-hidden ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-[#252c33]`}>
                  <img
                    src={project.heroMedia.poster || project.gallery[0]?.url}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 rounded">
                      {project.status}
                    </span>
                    {project.installmentMonths && (
                      <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase bg-[#313941] text-[#fffff1] border border-[#fffff1]/25 font-semibold rounded">
                        Elden Senet
                      </span>
                    )}
                  </div>

                  {/* Top Right Quick Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/15 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/40 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] tracking-widest text-[#fffff1]/70 uppercase mb-1.5 font-medium">
                      {project.categoryLabel} — {project.year}
                    </div>
                    <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1] group-hover:text-[#fffff1] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#fffff1]/70 line-clamp-2 font-light leading-relaxed mb-4">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="pt-4 border-t border-[#fffff1]/10 flex items-center justify-between text-xs">
                    <span className="text-[#fffff1]/50 flex items-center">
                      <MapPin size={12} className="mr-1 text-[#fffff1]" /> Karasu
                    </span>
                    <span className="text-[#fffff1] font-medium flex items-center group-hover:text-[#fffff1] transition-colors">
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
