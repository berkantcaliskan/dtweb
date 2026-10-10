import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Check,
  MessageSquare,
  Phone,
  Send,
  Compass,
  Building2,
  Home,
  ArrowUpRight,
  Sun,
  Waves,
  Smile,
  Zap,
  BadgePercent,
  Car
} from 'lucide-react'
import { ProjectItem, ProjectStage } from '../types'
import { ResponsiveMedia } from './ResponsiveMedia'
import { COMPANY_INFO } from '../data/websiteData'
import { submitLeadToPortfoy } from '../services/leadService'

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeStage, setActiveStage] = useState<ProjectStage | null>(null)
  const [selectedStageIndex, setSelectedStageIndex] = useState(0)
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0)
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const stageContainerRef = React.useRef<HTMLDivElement>(null)

  // Reset stage selection and scroll to top when project changes
  useEffect(() => {
    setActiveStage(null)
    setSelectedPlanIndex(0)
    setLeadFormSubmitted(false)
    if (project?.stages && project.stages.length > 0) {
      // Find the ongoing stage or default to 0
      const ongoingIdx = project.stages.findIndex(
        s => s.status === 'Devam Ediyor' || s.status === 'Yapım Aşamasında' || s.status === 'Satışta'
      )
      setSelectedStageIndex(ongoingIdx !== -1 ? ongoingIdx : 0)
    } else {
      setSelectedStageIndex(0)
    }
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [project])

  // Scroll to top of stage when stage changes
  useEffect(() => {
    if (stageContainerRef.current) {
      stageContainerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [activeStage])

  // Body scroll lock & Escape key listener
  useEffect(() => {
    if (!project) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeStage) {
          setActiveStage(null)
          containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, activeStage, onClose])

  if (!project) return null

  const handleLeadSubmit = (e: React.FormEvent, stageTitle?: string) => {
    e.preventDefault()
    if (!leadPhone.trim()) return

    const subject = stageTitle || project.title

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: leadName,
      phone: leadPhone,
      formName: `Proje Bilgi Talebi - ${subject}`,
      channel: `Web Sitesi / ${project.title}`,
      notes: `${subject} projesi hakkında detaylı bilgi, güncel fiyatlar ve tanıtım turu talebi.`,
      tags: ['Web Sitesi', 'Proje Bilgi Talebi', project.title],
      preferredHousingType: project.title,
    })

    // 2. WhatsApp ile doğrudan mesaj aç
    const text = encodeURIComponent(
      `Merhaba, ${subject} projeniz hakkında detaylı bilgi, güncel fiyatlar ve tanıtım turu talebinde bulunmak istiyorum.\nİsim: ${leadName || 'Belirtilmedi'}\nTelefon: ${leadPhone}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setLeadFormSubmitted(true)
  }

  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun size={26} className="text-amber-300 flex-shrink-0" />
      case 'Waves':
        return <Waves size={26} className="text-sky-300 flex-shrink-0" />
      case 'Smile':
        return <Smile size={26} className="text-emerald-300 flex-shrink-0" />
      case 'Zap':
        return <Zap size={26} className="text-yellow-300 flex-shrink-0" />
      case 'Home':
        return <Home size={26} className="text-[#fffff1] flex-shrink-0" />
      case 'BadgePercent':
        return <BadgePercent size={26} className="text-emerald-400 flex-shrink-0" />
      case 'Car':
        return <Car size={26} className="text-sky-400 flex-shrink-0" />
      default:
        return <Check size={26} className="text-[#fffff1] flex-shrink-0" />
    }
  }

  // =========================================================================
  // VIEW 1: ACTIVE STAGE DETAIL VIEW (ETAP AÇILIR PENCERESİ)
  // =========================================================================
  if (activeStage) {
    const isStageOngoing = activeStage.status === 'Yapım Aşamasında' || activeStage.status === 'Satışta'

    return (
      <div 
        ref={stageContainerRef}
        className="fixed top-[44px] sm:top-[52px] inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] w-full animate-modal-backdrop flex flex-col"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Stage Sticky Top Bar */}
        <header className="sticky top-0 z-40 w-full bg-[#1e242b]/95 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
          {/* Sol: Geri Dön (Yeni Şehir Etapları Ana Sayfasına) */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <button
              onClick={() => {
                setActiveStage(null)
                containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm cursor-pointer"
              aria-label={`${project.title}'na geri dön`}
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{project.title}'na Dön</span>
            </button>

            <div className="hidden sm:block h-6 w-[1px] bg-[#fffff1]/20" />

            <div className="hidden sm:block">
              <span className="text-[10px] tracking-widest text-[#fffff1]/60 uppercase block font-medium">
                {project.title} • {activeStage.deliveryDate ? `Teslim: ${activeStage.deliveryDate}` : activeStage.year}
              </span>
              <h2 className="font-theSeasons text-lg font-bold text-[#fffff1] leading-tight">
                {activeStage.title}
              </h2>
            </div>
          </div>

          {/* Sağ: İletişim Butonları & Kapat */}
          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Merhaba, ${project.title} - ${activeStage.title} hakkında bilgi ve tanıtım turu talebinde bulunmak istiyorum.`)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Bilgi</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#313941] hover:bg-[#3a444e] border border-[#fffff1]/20 text-[#fffff1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <Phone size={14} />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </header>

        {/* Stage Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] py-8 sm:py-12 w-full space-y-12">
          {/* Header & Badges */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-[11px] tracking-widest uppercase text-[#fffff1]/60">
                <button
                  onClick={() => {
                    setActiveStage(null)
                    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-[#fffff1] transition-colors underline-offset-4 hover:underline cursor-pointer"
                >
                  {project.title.toUpperCase()}
                </button>
                <span>/</span>
                <span className="text-[#fffff1] font-semibold">{activeStage.title.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md border ${
                  isStageOngoing
                    ? 'bg-amber-950/80 text-amber-200 border-amber-500/40'
                    : 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40'
                }`}>
                  {activeStage.status}
                </span>
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#313941] text-[#fffff1] border border-[#fffff1]/20 rounded-md">
                  {activeStage.deliveryDate ? `Teslim: ${activeStage.deliveryDate}` : `Yıl: ${activeStage.year}`}
                </span>
                {activeStage.distanceToSea && (
                  <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-blue-950/70 text-blue-200 border border-blue-500/30 rounded-md">
                    {activeStage.distanceToSea}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h1 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-[1.1]">
                {activeStage.title}
              </h1>
              <p className="text-lg sm:text-2xl text-[#fffff1]/90 font-light max-w-3xl leading-relaxed mt-3">
                {activeStage.subtitle}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5">
                <MapPin size={20} className="text-[#fffff1]/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Konum</span>
                  <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">{activeStage.location}</span>
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5">
                <Waves size={20} className="text-sky-300 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Denize Mesafe</span>
                  <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">{activeStage.distanceToSea || 'Denize ~800m'}</span>
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5">
                <Calendar size={20} className="text-[#fffff1]/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Teslim / Durum</span>
                  <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">
                    {activeStage.deliveryDate ? `Teslim: ${activeStage.deliveryDate}` : activeStage.year}
                  </span>
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5">
                <Home size={20} className="text-[#fffff1]/70 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Daire Tipleri</span>
                  <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">{activeStage.unitTypes.join(' & ')}</span>
                </div>
              </div>
            </div>

            {/* Stage Hero Image */}
            <div className="rounded-2xl overflow-hidden border border-[#fffff1]/15 shadow-2xl bg-black/40 aspect-[16/9] max-h-[300px] sm:max-h-[560px]">
              <img
                src={activeStage.image}
                alt={activeStage.title}
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Story, Features & Specs */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Stage Story & Features */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#fffff1]/70 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>ETAP KONSEPTİ & AYRINTILARI</span>
                </div>
                <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                  {activeStage.title} Yaşam Standartları
                </h3>
                <p className="text-base sm:text-lg text-[#fffff1]/95 leading-relaxed font-light">
                  {activeStage.description}
                </p>
              </div>

              {/* Stage Specific Features List */}
              <div className="space-y-4 pt-4 border-t border-[#fffff1]/10">
                <div className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#fffff1]/70 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>ÖNE ÇIKAN DONATILAR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeStage.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm text-[#fffff1]/95 bg-[#313941]/50 p-3.5 rounded-xl border border-[#fffff1]/10">
                      <Check size={18} className="text-emerald-400 flex-shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Stage Technical Info Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-[#2c343d] border border-[#fffff1]/15 p-6 sm:p-7 rounded-2xl space-y-6 shadow-xl">
                <div>
                  <span className="text-xs tracking-widest text-[#fffff1]/60 uppercase block font-semibold">
                    ETAP DETAY FORMU
                  </span>
                  <h4 className="font-theSeasons text-xl font-bold text-[#fffff1] mt-0.5">
                    {activeStage.title} Künyesi
                  </h4>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Konum:</span>
                    <span className="text-[#fffff1]/95 font-medium text-right">{activeStage.location}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Denize Mesafe:</span>
                    <span className="text-[#fffff1]/95 font-medium">{activeStage.distanceToSea || '~800 Metre'}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Etap Durumu:</span>
                    <span className={`font-bold ${isStageOngoing ? 'text-amber-300' : 'text-emerald-300'}`}>
                      {activeStage.status}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Teslim / Yıl:</span>
                    <span className="text-[#fffff1] font-bold">
                      {activeStage.deliveryDate ? `Teslim: ${activeStage.deliveryDate}` : activeStage.year}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Daire Seçenekleri:</span>
                    <span className="text-[#fffff1]/95 font-medium">{activeStage.unitTypes.join(' & ')}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Isınma Sistemi:</span>
                    <span className="text-[#fffff1] font-bold">Yerden Isıtmalı</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#fffff1]/10 space-y-3">
                  <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                    Bu etap için güncel fiyat listesi, kat planları ve ödeme koşullarını hemen öğrenebilirsiniz.
                  </p>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Merhaba, ${project.title} - ${activeStage.title} hakkında detaylı bilgi almak istiyorum.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl text-center block transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    WhatsApp ile Fiyat & Bilgi Al
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Stage Direct Lead Form */}
          <section className="bg-gradient-to-br from-[#313941]/90 to-[#252c33]/90 border border-[#fffff1]/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-[10px] tracking-widest text-[#fffff1]/70 uppercase font-semibold block">
                BİLGİ & REZERVASYON TALEBİ
              </span>
              <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1] mt-1 mb-2">
                {activeStage.title} Hakkında Detaylı Bilgi Alın
              </h3>
              <p className="text-xs sm:text-sm text-[#fffff1]/70 font-light mb-6">
                İletişim bilgilerinizi iletin; satış temsilcimiz {activeStage.title} broşürünü, güncel kat planlarını ve ödeme tablosunu paylaşsın.
              </p>

              {leadFormSubmitted ? (
                <div className="p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-sm text-emerald-300 flex items-center space-x-3">
                  <Check size={20} />
                  <span>Talebiniz WhatsApp üzerinden iletildi. Satış temsilcimiz kısa sürede sizinle bağlantı kuracaktır.</span>
                </div>
              ) : (
                <form onSubmit={(e) => handleLeadSubmit(e, activeStage.title)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="px-4 py-3.5 bg-black/40 border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/60"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon Numaranız (05xx...)"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    required
                    className="px-4 py-3.5 bg-black/40 border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/60"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                  >
                    <Send size={15} />
                    <span>WhatsApp ile Gönder</span>
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Bottom Bar: Back to Master Project */}
          <section className="pt-8 pb-12 border-t border-[#fffff1]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                setActiveStage(null)
                containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center space-x-2.5 px-6 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-xs font-bold uppercase tracking-wider">{project.title}'na Geri Dön</span>
            </button>

            <div className="flex items-center space-x-6 text-xs text-[#fffff1]/60 font-light">
              <span>© Demirtürk İnşaat</span>
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </div>
          </section>
        </main>
      </div>
    )
  }

  // =========================================================================
  // VIEW 2: MASTER PROJECT DETAIL VIEW (ANA PROJE SAYFASI)
  // =========================================================================
  const currentStage = (project?.stages && project.stages.length > 0 && selectedStageIndex >= 0 && selectedStageIndex < project.stages.length)
    ? project.stages[selectedStageIndex]
    : null

  const displayLocation = currentStage ? currentStage.location : project.location
  const displayDistanceToSea = currentStage?.distanceToSea || project.distanceToSea || 'Denize ~800m'
  const displayUnits = currentStage ? currentStage.unitTypes.join(', ') : project.totalUnits
  const displayStatus = currentStage ? currentStage.status : project.status
  const displayYear = currentStage ? (currentStage.deliveryDate ? `Teslim: ${currentStage.deliveryDate}` : currentStage.year) : project.year

  return (
    <div
      ref={containerRef}
      className="fixed top-[44px] sm:top-[52px] inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] w-full animate-modal-backdrop flex flex-col"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#1e242b]/95 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
        {/* Sol: Geri Dön & Başlık */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm cursor-pointer"
            aria-label="Projeler listesine dön"
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Projeler</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-[#fffff1]/20" />

          <div className="hidden sm:block">
            <span className="text-[10px] tracking-widest text-[#fffff1]/60 uppercase block font-medium">
              {project.categoryLabel} • {displayYear}
            </span>
            <h2 className="font-theSeasons text-lg font-bold text-[#fffff1] leading-tight">
              {project.title}
              {currentStage && <span className="font-sans text-sm font-normal text-[#fffff1]/75 ml-2">({currentStage.title})</span>}
            </h2>
          </div>
        </div>

        {/* Sağ: İletişim Butonları & Kapat */}
        <div className="flex items-center space-x-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Merhaba, ${project.title}${currentStage ? ` - ${currentStage.title}` : ''} projeniz hakkında bilgi almak ve yerinde görmek istiyorum.`)}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <MessageSquare size={14} />
            <span>WhatsApp Bilgi</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#313941] hover:bg-[#3a444e] border border-[#fffff1]/20 text-[#fffff1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Phone size={14} />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </header>

      {/* Main Full-Screen Presentation Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] py-8 sm:py-12 w-full space-y-14">
        {/* Project Header & Hero Media */}
        <section className="space-y-6">
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[11px] tracking-widest uppercase text-[#fffff1]/60">
              <button onClick={onClose} className="hover:text-[#fffff1] transition-colors underline-offset-4 hover:underline cursor-pointer">
                PROJELERİMİZ
              </button>
              <span>/</span>
              <span className="text-[#fffff1] font-semibold">{project.title}</span>
              {currentStage && (
                <>
                  <span>/</span>
                  <span className="text-emerald-300 font-semibold">{currentStage.title}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md border ${
                displayStatus === 'Tamamlandı'
                  ? 'bg-white/10 text-white/80 border-white/20'
                  : displayStatus === 'Devam Ediyor' || displayStatus === 'Yapım Aşamasında' || displayStatus === 'Satışta'
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                  : 'bg-sky-950/70 text-sky-200 border-sky-500/30'
              }`}>
                {displayStatus === 'Tamamlandı' ? 'Bitti' : displayStatus}
              </span>
              {project.installmentMonths && (
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 rounded-md">
                  Elden Senet Modeli
                </span>
              )}
              {displayDistanceToSea && (
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-blue-950/70 text-blue-200 border border-blue-500/30 rounded-md">
                  {displayDistanceToSea}
                </span>
              )}
            </div>
          </div>

          {/* Project Display Typography */}
          <div>
            <h1 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-[1.1]">
              {project.title}
            </h1>
            {project.seriesInfo && (
              <p className="text-xs sm:text-sm text-[#fffff1]/80 font-medium tracking-wide mt-2">
                {project.seriesInfo}
              </p>
            )}
            <p className="text-lg sm:text-2xl lg:text-3xl text-[#fffff1] font-normal max-w-3xl leading-snug mt-3 font-theSeasons tracking-wide">
              {project.slideDescription || project.subtitle}
            </p>
            {project.slideDescription && project.subtitle && project.slideDescription !== project.subtitle && (
              <p className="text-sm sm:text-base text-[#fffff1]/75 font-light max-w-3xl leading-relaxed mt-2">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Sub-Project / Stage Selector Tabs (Directly under project description) */}
          {project.stages && project.stages.length > 0 && (
            <div className="pt-3 pb-1 space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#fffff1]/70 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>PROJE / ETAP SEÇİNİZ ({project.stages.length} PROJE)</span>
                </span>
                <span className="text-[11px] text-[#fffff1]/50 italic hidden sm:inline">
                  Adres, teslim tarihi ve özellikler seçtiğiniz projeye göre güncellenir
                </span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
                {project.stages.map((stage, idx) => {
                  const isSelected = selectedStageIndex === idx
                  const isCompleted = stage.status === 'Tamamlandı'
                  const isOngoing = stage.status === 'Devam Ediyor' || stage.status === 'Yapım Aşamasında' || stage.status === 'Satışta'

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedStageIndex(idx)}
                      className={`group relative flex items-center justify-between sm:justify-start gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] shadow-lg shadow-black/25 font-bold ring-2 ring-[#fffff1]/20 scale-[1.02]'
                          : 'bg-[#313941]/70 hover:bg-[#313941] text-[#fffff1]/80 hover:text-[#fffff1] border-[#fffff1]/15 hover:border-[#fffff1]/35 font-medium'
                      }`}
                    >
                      <span className="truncate">{stage.title}</span>

                      {/* Status Pill Badge */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0 ${
                          isCompleted
                            ? isSelected
                              ? 'bg-black/10 text-[#252c33] border border-black/10'
                              : 'bg-white/10 text-[#fffff1]/70 border border-[#fffff1]/15'
                            : isOngoing
                            ? isSelected
                              ? 'bg-emerald-700 text-[#fffff1]'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isSelected
                            ? 'bg-sky-700 text-[#fffff1]'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        }`}
                      >
                        {isOngoing && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400'} animate-pulse`} />
                        )}
                        {isCompleted ? 'Bitti' : isOngoing ? 'Devam Ediyor' : 'Yakında'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quick Technical Specs Strip (Dynamically reflects selected stage) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5 transition-all">
              <MapPin size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Konum</span>
                <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block truncate" title={displayLocation}>
                  {displayLocation}
                </span>
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5 transition-all">
              <Waves size={20} className="text-sky-300 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Denize Mesafe</span>
                <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">
                  {displayDistanceToSea}
                </span>
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5 transition-all">
              <Building2 size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Daire Seçenekleri</span>
                <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block truncate" title={displayUnits}>
                  {displayUnits}
                </span>
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3 sm:space-x-3.5 transition-all">
              <Home size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs uppercase text-[#fffff1]/50 block">Durum & Vade</span>
                <span className="text-xs sm:text-sm font-bold text-[#fffff1] leading-snug block">
                  {currentStage
                    ? `${currentStage.status === 'Tamamlandı' ? 'Bitti' : currentStage.status} • ${project.installmentMonths ? `${project.installmentMonths} Ay` : 'Elden Senet'}`
                    : (project.paymentHighlight ? 'Elden Senet & Takas' : 'Elden Senet Modeli')}
                </span>
              </div>
            </div>
          </div>

          {/* Selected Stage Spotlight Card (When stages exist) */}
          {currentStage && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#313941]/40 border border-[#fffff1]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#fffff1] text-sm sm:text-base">{currentStage.title}</span>
                  <span className="text-[#fffff1]/40">•</span>
                  <span className="text-[#fffff1]/80 font-medium">{currentStage.subtitle}</span>
                </div>
                <p className="text-[#fffff1]/70 font-light text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {currentStage.description}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => setActiveStage(currentStage)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-[#fffff1]/20 text-[#fffff1] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                >
                  <span>Etap Detay Sayfası</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Payment Highlight Banner (1.000.000₺ Peşinat – 40 Ay Vade – Araç Takas) */}
          {project.paymentHighlight && (
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#27322e] to-[#252c33] border border-emerald-500/35 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AVANTAJLI ÖDEME FIRSATI</span>
                </div>
                <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                  1.000.000₺ Peşinat – 40 Ay Vade – Araç Takası
                </h3>
                <p className="text-xs sm:text-sm text-[#fffff1]/80 font-light max-w-2xl">
                  Banka faizi ve dosya masrafı olmadan, doğrudan Demirtürk İnşaat güvencesiyle 40 ay elden senetli ödeme kolaylığı ve peşinat yerine değerinde araç takası.
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-3 flex-shrink-0">
                <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-center min-w-[110px]">
                  <span className="text-[10px] uppercase text-emerald-300/70 block font-semibold">Peşinat</span>
                  <span className="text-sm sm:text-base font-bold text-white">{project.paymentHighlight.downPayment}</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-center min-w-[110px]">
                  <span className="text-[10px] uppercase text-emerald-300/70 block font-semibold">Vade</span>
                  <span className="text-sm sm:text-base font-bold text-white">{project.paymentHighlight.installment}</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-center min-w-[110px]">
                  <span className="text-[10px] uppercase text-emerald-300/70 block font-semibold">Takas</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-300">Araç Takası</span>
                </div>
              </div>
            </div>
          )}

          {/* Full-Bleed Cinematic Hero Render (16:9 on mobile as requested) */}
          <div className="rounded-2xl overflow-hidden border border-[#fffff1]/15 shadow-2xl bg-black/40">
            <ResponsiveMedia media={project.heroMedia} className="w-full" aspectRatio="16:9" showControls={true} />
          </div>
        </section>

        {/* ================================================================= */}
        {/* PROJE ETAPLARI BÖLÜMÜ (1. Etap, 2. Etap ve En Güncel 3. Etap) */}
        {/* ================================================================= */}
        {project.stages && project.stages.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-[#fffff1]/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1]/70 uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>PROJE ETAPLARI</span>
                </div>
                <h3 className="font-theSeasons text-2xl sm:text-4xl font-bold text-[#fffff1]">
                  {project.title} Etapları
                </h3>
                <p className="text-sm sm:text-base text-[#fffff1]/70 font-light mt-1 max-w-2xl leading-relaxed">
                  {project.title} kapsamındaki tüm etaplarımızı ve devam projelerimizi inceleyin. Tamamlanan ve yapımı devam eden etaplarımızın detaylarına kartlara tıklayarak ulaşabilirsiniz.
                </p>
              </div>
            </div>

            {/* Stages Grid (Responsive for 2, 3 or 4 stages) */}
            <div className={`grid grid-cols-1 ${project.stages.length === 2 ? 'md:grid-cols-2' : project.stages.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
              {project.stages.map((stage, idx) => {
                const isSelected = selectedStageIndex === idx
                const isOngoing = stage.status === 'Yapım Aşamasında' || stage.status === 'Satışta' || stage.status === 'Devam Ediyor'
                const isCompleted = stage.status === 'Tamamlandı'
                return (
                  <div
                    key={stage.id}
                    onClick={() => {
                      setSelectedStageIndex(idx)
                      setActiveStage(stage)
                    }}
                    className={`group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col justify-between min-h-[380px] sm:min-h-[420px] ${
                      isSelected
                        ? 'border-emerald-400 ring-2 ring-emerald-500/50'
                        : isOngoing
                        ? 'border-emerald-500/40 hover:border-emerald-400 ring-1 ring-emerald-500/20'
                        : 'border-[#fffff1]/15 hover:border-[#fffff1]/45'
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Vignette & Status Badges */}
                    <div className="relative z-10 p-5 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1.5 text-xs tracking-wider uppercase backdrop-blur-md font-semibold rounded-md shadow-sm border ${
                          isCompleted
                            ? 'bg-black/60 text-[#fffff1]/90 border-white/20'
                            : isOngoing
                            ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40'
                            : 'bg-sky-950/80 text-sky-200 border-sky-500/40'
                        }`}>
                          {isCompleted ? 'Bitti' : isOngoing ? 'Devam Ediyor' : 'Yakında'}
                        </span>
                        <span className="px-3 py-1.5 text-xs tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 font-medium rounded-md shadow-sm">
                          {stage.deliveryDate ? `Teslim: ${stage.deliveryDate}` : stage.year}
                        </span>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center group-hover:bg-[#313941] group-hover:border-[#fffff1]/50 group-hover:scale-110 transition-all shadow-md flex-shrink-0">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    {/* Progressive Gradient Blur Layer */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                      style={{
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                      }}
                    />

                    {/* Darkening Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none bg-gradient-to-t from-black/95 via-[#161a1f]/85 via-40% to-transparent" />

                    {/* Bottom Content Details */}
                    <div className="relative z-10 pt-8 pb-5 px-6">
                      <span className="text-[11px] tracking-widest text-[#fffff1]/70 uppercase block font-semibold mb-1 truncate">
                        {stage.location} • {stage.distanceToSea || 'Denize ~800m'}
                      </span>
                      <h4 className="font-theSeasons text-2xl font-bold text-[#fffff1] leading-tight mb-2 group-hover:translate-x-1 transition-transform">
                        {stage.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#fffff1]/90 font-light line-clamp-2 leading-relaxed mb-4">
                        {stage.subtitle}
                      </p>

                      <div className="pt-3 border-t border-[#fffff1]/15 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-[#fffff1]/75 font-medium truncate">
                          {stage.unitTypes.join(' & ')}
                        </span>
                        <span className="text-[#fffff1] font-bold flex items-center group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2">
                          <span>Etabı İncele</span>
                          <ArrowUpRight size={15} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section 2: Story, Rich Feature Boxes & Technical Künye */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (8 cols): Concept, Philosophy & Rich Features */}
          <div className="lg:col-span-8 space-y-8">
            {/* Story */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#fffff1]/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                <span>KONSEPT & YAŞAM ALANI</span>
              </div>
              <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                Doğanın Kalbinde Çağdaş Bir Yaşam
              </h3>
              <p className="text-base sm:text-lg text-[#fffff1]/95 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Architectural Philosophy Quote */}
            {project.architecturalPhilosophy && (
              <div className="p-6 bg-[#313941]/40 border-l-4 border-[#fffff1]/60 rounded-r-2xl space-y-2">
                <span className="text-xs tracking-widest text-[#fffff1]/70 uppercase font-semibold block">
                  MİMARİ DİL & TASARIM FELSEFESİ
                </span>
                <p className="text-base sm:text-lg text-[#fffff1]/95 leading-relaxed italic font-light">
                  "{project.architecturalPhilosophy}"
                </p>
              </div>
            )}

            {/* Rich Feature Detail Cards (Güneş Paneli, Aqua Havuz, Çocuk Oyun Alanı, Araç Şarj vb.) */}
            {project.featureDetails && project.featureDetails.length > 0 ? (
              <div className="space-y-4 pt-4 border-t border-[#fffff1]/10">
                <div className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#fffff1]/70 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>DONATILAR & AYRICALIKLAR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.featureDetails.map((feat, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-[#313941]/60 border border-[#fffff1]/10 hover:border-[#fffff1]/30 transition-all space-y-2.5"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-black/40 border border-[#fffff1]/15 flex items-center justify-center">
                          {renderFeatureIcon(feat.icon)}
                        </div>
                        <h4 className="font-theSeasons text-lg font-bold text-[#fffff1]">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#fffff1]/80 leading-relaxed font-light">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Fallback Standard Features List */
              <div className="space-y-4 pt-4 border-t border-[#fffff1]/10">
                <div className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#fffff1]/70 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>DONATILAR & AYRICALIKLAR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm text-[#fffff1]/95 bg-[#313941]/50 p-3.5 rounded-xl border border-[#fffff1]/10">
                      <Check size={18} className="text-[#fffff1] flex-shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Technical Specifications Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-[#2c343d] border border-[#fffff1]/15 p-6 sm:p-7 rounded-2xl space-y-6 shadow-xl">
              <div>
                <span className="text-xs tracking-widest text-[#fffff1]/60 uppercase block font-semibold">
                  PROJE BİLGİ FORMU
                </span>
                <h4 className="font-theSeasons text-xl font-bold text-[#fffff1] mt-0.5">
                  Teknik Künye
                </h4>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Konum:</span>
                  <span className="text-[#fffff1]/95 font-medium text-right max-w-[200px] truncate" title={displayLocation}>{displayLocation}</span>
                </div>
                {displayDistanceToSea && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Denize Mesafe:</span>
                    <span className="text-[#fffff1]/95 font-medium">{displayDistanceToSea}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Toplam Alan:</span>
                  <span className="text-[#fffff1]/95 font-medium">{currentStage?.totalArea || project.totalArea}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Daire Seçenekleri:</span>
                  <span className="text-[#fffff1]/95 font-medium text-right max-w-[200px] truncate" title={displayUnits}>{displayUnits}</span>
                </div>
                {project.seriesInfo && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Proje Kapsamı:</span>
                    <span className="text-[#fffff1] font-bold">{project.seriesInfo}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Proje Durumu:</span>
                  <span className="text-[#fffff1] font-bold">{displayStatus === 'Tamamlandı' ? 'Bitti' : displayStatus}</span>
                </div>
                {displayYear && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Teslim / Yıl:</span>
                    <span className="text-[#fffff1] font-bold">{displayYear}</span>
                  </div>
                )}
                {project.installmentMonths && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Ödeme Modeli:</span>
                    <span className="text-[#fffff1] font-bold">Elden Senet ({project.installmentMonths} Ay)</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Isınma:</span>
                  <span className="text-[#fffff1] font-bold">Yerden Isıtmalı</span>
                </div>
              </div>

              {/* Free Tour Callout Inside Card */}
              <div className="pt-4 border-t border-[#fffff1]/10 space-y-3">
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Bu projeyi ve örnek daireyi yerinde görmek için ücretsiz Karasu tanıtım turumuza katılabilirsiniz.
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full py-3.5 px-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl text-center block transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {COMPANY_INFO.phone} ile Bilgi Al
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Floor Plans */}
        {project.floorPlans && project.floorPlans.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-[#fffff1]/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1]/70 uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                  <span>MİMARİ YERLEŞİM</span>
                </div>
                <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                  Kat Planları & Yaşam Seçenekleri
                </h3>
              </div>

              {/* Plan Tabs */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.floorPlans.map((plan, idx) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlanIndex(idx)}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs uppercase font-bold tracking-normal sm:tracking-wider transition-all cursor-pointer ${
                      selectedPlanIndex === idx
                        ? 'bg-[#fffff1] text-[#252c33] shadow-md border border-[#fffff1]'
                        : 'bg-white/5 text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/10 border border-[#fffff1]/10'
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            </div>

            {project.floorPlans[selectedPlanIndex] && (
              <div className="bg-[#2c343d] border border-[#fffff1]/15 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
                <div className="rounded-xl overflow-hidden border border-[#fffff1]/10 aspect-[16/9] sm:aspect-[4/3] bg-black/40">
                  <img
                    src={project.floorPlans[selectedPlanIndex].image}
                    alt={project.floorPlans[selectedPlanIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#fffff1]/70 uppercase font-semibold">
                      SEÇİLEN PLAN DETAYI
                    </span>
                    <h4 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                      {project.floorPlans[selectedPlanIndex].name}
                    </h4>
                  </div>
                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between py-2 border-b border-[#fffff1]/10">
                      <span className="text-[#fffff1]/50">Net / Brüt Alan:</span>
                      <span className="text-[#fffff1] font-bold text-base">{project.floorPlans[selectedPlanIndex].area}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#fffff1]/10">
                      <span className="text-[#fffff1]/50">Oda Dağılımı:</span>
                      <span className="text-[#fffff1]/95 font-medium text-right">{project.floorPlans[selectedPlanIndex].rooms}</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#fffff1]/85 leading-relaxed font-light">
                    {project.floorPlans[selectedPlanIndex].description}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Section 4: Photo & Architecture Perspective Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-[#fffff1]/10">
            <div>
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1]/70 uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
                <span>GÖRSEL ARŞİV</span>
              </div>
              <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                Mimari Perspektif & Galeri
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.gallery.map((item, idx) => {
                const aspectClass = item.aspect === '1:1'
                  ? 'aspect-square'
                  : item.aspect === '9:16'
                    ? 'aspect-[9/16]'
                    : 'aspect-[16/9] sm:aspect-[16/10]'
                return (
                  <div key={idx} className={`group relative rounded-2xl overflow-hidden border border-[#fffff1]/15 bg-[#313941] ${aspectClass} shadow-md`}>
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-medium text-[#fffff1]">{item.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section 5: Direct Lead & Appointment Form */}
        <section className="bg-gradient-to-br from-[#313941]/90 to-[#252c33]/90 border border-[#fffff1]/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-[10px] tracking-widest text-[#fffff1]/70 uppercase font-semibold block">
              BİLGİ & REZERVASYON TALEBİ
            </span>
            <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1] mt-1 mb-2">
              {project.title} Hakkında Detaylı Bilgi Alın
            </h3>
            <p className="text-xs sm:text-sm text-[#fffff1]/70 font-light mb-6">
              İletişim bilgilerinizi iletin; satış temsilcimiz proje broşürü, güncel kat planları ve senetli ödeme tablosunu WhatsApp üzerinden paylaşsın.
            </p>

            {leadFormSubmitted ? (
              <div className="p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-sm text-emerald-300 flex items-center space-x-3">
                <Check size={20} />
                <span>Talebiniz WhatsApp üzerinden iletildi. Müşteri temsilcimiz kısa sürede sizinle bağlantı kuracaktır.</span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="px-4 py-3.5 bg-black/40 border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/60"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız (05xx...)"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  required
                  className="px-4 py-3.5 bg-black/40 border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/60"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                >
                  <Send size={15} />
                  <span>WhatsApp ile Gönder</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Section 6: Bottom Navigation Bar to return to projects */}
        <section className="pt-8 pb-12 border-t border-[#fffff1]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-2.5 px-6 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-wider">Tüm Projelere Geri Dön</span>
          </button>

          <div className="flex items-center space-x-6 text-xs text-[#fffff1]/60 font-light">
            <span>© Demirtürk İnşaat</span>
            <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
              {COMPANY_INFO.phone}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
