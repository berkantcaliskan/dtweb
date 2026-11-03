import React from 'react'
import { Compass, Waves, Trees, MapPin, Sparkles, Bus, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { TRANSLATIONS } from '../data/translations'

interface DiscoverKarasuSectionProps {
  onOpenTour?: () => void
  onNavigate?: (href: string) => void
}

export const DiscoverKarasuSection: React.FC<DiscoverKarasuSectionProps> = ({
  onOpenTour,
  onNavigate,
}) => {
  const { language } = useLanguage()
  const isEn = language === 'EN'
  const t = TRANSLATIONS[language].discoverKarasu

  const naturalAttractions = isEn
    ? [
        {
          id: 'acarlar',
          title: 'Acarlar Floodplain Forest',
          tag: 'Natural Biosphere',
          icon: Trees,
          description:
            "Turkey's largest single-block floodplain forest. A sanctuary of water lilies, endemic flora, and over 200 bird species.",
          distance: '15 min to Projects',
        },
        {
          id: 'coastline',
          title: 'Blue-Flag Coast & Beaches',
          tag: 'Seaside Life',
          icon: Waves,
          description:
            'Kilometers of fine sandy shoreline along the Black Sea with iodine-rich coastal breezes and breathtaking sunset panoramas.',
          distance: 'Walking Distance',
        },
        {
          id: 'maden',
          title: 'Maden Creek & Canyon',
          tag: 'Ecotourism Trail',
          icon: Compass,
          description:
            'A cooling stream running between dense beech and chestnut canopies, offering serene trekking routes and historic carved tunnels.',
          distance: '25 min to Projects',
        },
        {
          id: 'yenimahalle',
          title: 'Yenimahalle & River Estuary',
          tag: 'Gastronomy & Harbor',
          icon: MapPin,
          description:
            'Where the Sakarya River embraces the Black Sea, lined with traditional wooden fishing boats and waterside seafood dining.',
          distance: '8 min to Projects',
        },
      ]
    : [
        {
          id: 'acarlar',
          title: 'Acarlar Longozu',
          tag: 'Biyosfer & Doğa',
          icon: Trees,
          description:
            "Türkiye'nin tek parça en büyük subasar ormanı. Su menekşeleri, nilüferler ve 200'ü aşkın göçmen kuş türünün büyüleyici yaşam alanı.",
          distance: 'Projelerimize 15 Dk',
        },
        {
          id: 'coastline',
          title: 'Mavi Bayraklı Sahil & Kumsal',
          tag: 'Kıyı Yaşamı',
          icon: Waves,
          description:
            'Karadeniz boyunca uzanan kilometrelerce ince kumlu sahil şeridi, temiz deniz havası ve eşsiz panoramik gün batımı manzaraları.',
          distance: 'Yürüme Mesafesinde',
        },
        {
          id: 'maden',
          title: 'Maden Deresi & Kanyon',
          tag: 'Ekoturizm & Yürüyüş',
          icon: Compass,
          description:
            'Sık kayın ve kestane ağaçları arasında buz gibi akan dere, tarihi kaya tünelleri ve huzurlu orman yürüyüş rotaları.',
          distance: 'Projelerimize 25 Dk',
        },
        {
          id: 'yenimahalle',
          title: 'Yenimahalle & Nehir Ağzı',
          tag: 'Gastronomi & Manzara',
          icon: MapPin,
          description:
            "Sakarya Nehri'nin Karadeniz ile buluştuğu nehir ağzında sıralanan balıkçı tekneleri ve nehir kenarı lezzet durakları.",
          distance: 'Projelerimize 8 Dk',
        },
      ]

  return (
    <section
      id="karasuyu-kesfedin"
      className="py-10 sm:py-16 md:py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#fffff1]/10 max-w-3xl">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Curation Flagship Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.04] via-emerald-950/20 to-sky-950/25 border border-[#fffff1]/15 backdrop-blur-xl p-6 sm:p-10 lg:p-12 mb-10 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Top Status & Indicator */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.statusBadge}</span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs text-[#fffff1]/60 font-mono tracking-wider">
              <Sparkles size={14} className="text-amber-300" />
              <span>Sakarya • Karasu</span>
            </div>
          </div>

          {/* The Exact User Requested Statement in Luxury Typography */}
          <div className="relative z-10 max-w-4xl space-y-4 mb-8 sm:mb-10">
            <h3 className="font-theSeasons text-2xl sm:text-4xl lg:text-5xl font-normal text-[#fffff1] leading-snug sm:leading-tight">
              &ldquo;{t.message}&rdquo;
            </h3>
            <p className="text-sm sm:text-base text-[#fffff1]/75 font-light leading-relaxed max-w-2xl">
              {t.subMessage}
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#fffff1]/10">
            {onOpenTour && (
              <button
                type="button"
                onClick={onOpenTour}
                className="py-3.5 px-6 rounded-xl bg-[#fffff1] hover:bg-white text-[#14181c] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-lg active:scale-98 cursor-pointer"
              >
                <Bus size={16} />
                <span>{t.tourCta}</span>
              </button>
            )}

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/projeler')}
                className="py-3.5 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#fffff1] border border-[#fffff1]/15 hover:border-[#fffff1]/35 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.projectsCta}</span>
                <ArrowUpRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* 4 Regional Highlights Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#fffff1]/10">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#fffff1]/80 font-medium">
              {t.highlightsTitle}
            </h4>
            <span className="text-[11px] font-mono text-[#fffff1]/50">
              4 Önemli Lokasyon
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {naturalAttractions.map((item) => {
              const IconComponent = item.icon
              return (
                <div
                  key={item.id}
                  className="group bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#fffff1]/15 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                        <IconComponent size={18} />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#fffff1]/60 border border-[#fffff1]/10">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-theSeasons text-lg sm:text-xl font-semibold text-[#fffff1] group-hover:text-white transition-colors mb-1.5">
                        {item.title}
                      </h5>
                      <p className="text-xs text-[#fffff1]/75 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#fffff1]/10 flex items-center justify-between text-[11px] text-[#fffff1]/60 font-mono">
                    <span className="flex items-center text-emerald-400/90">
                      <CheckCircle2 size={12} className="mr-1" />
                      {item.distance}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
