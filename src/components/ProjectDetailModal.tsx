import React, { useState, useEffect } from 'react'
import { ArrowLeft, X, MapPin, Calendar, Layers, ShieldCheck, Check, MessageSquare, Phone, ChevronRight, Send, Compass, Building2, Home } from 'lucide-react'
import { ProjectItem } from '../types'
import { ResponsiveMedia } from './ResponsiveMedia'
import { COMPANY_INFO } from '../data/websiteData'

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0)
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false)

  // Body scroll lock & Escape key listener
  useEffect(() => {
    if (!project) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadPhone.trim()) return

    const text = encodeURIComponent(
      `Merhaba, ${project.title} projeniz hakkında detaylı bilgi ve tanıtım turu talebinde bulunmak istiyorum.\nİsim: ${leadName || 'Belirtilmedi'}\nTelefon: ${leadPhone}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setLeadFormSubmitted(true)
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] min-h-screen w-full animate-modal-backdrop flex flex-col"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* 
        Top Sticky Architectural Navigation Bar 
        Sol üstte belirgin Geri Dön butonu, sağda hızlı iletişim butonları
      */}
      <header className="sticky top-0 z-40 w-full bg-[#1e242b]/95 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3.5 flex items-center justify-between shadow-lg">
        {/* Sol Üst: Geri Butonu & Proje Başlık İntrosu */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm"
            aria-label="Projeler listesine geri dön"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
            <span className="text-xs font-bold uppercase tracking-wider">Geri Dön</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-[#fffff1]/20" />

          <div className="hidden sm:block">
            <span className="text-[10px] tracking-widest text-[#fffff1]/60 uppercase block font-medium">
              {project.categoryLabel} — {project.year}
            </span>
            <h2 className="font-theSeasons text-lg font-bold text-[#fffff1] leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Sağ Üst: Hızlı İletişim & Kapat */}
        <div className="flex items-center space-x-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20${encodeURIComponent(project.title)}%20projesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            <span>WhatsApp Bilgi</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#313941] hover:bg-[#3a444e] border border-[#fffff1]/20 text-[#fffff1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Phone size={14} />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-[#313941] text-[#fffff1] border border-[#fffff1]/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Sayfayı Kapat"
            title="Kapat"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Full-Screen Presentation Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] py-8 sm:py-12 w-full space-y-14">
        {/* Project Header & Hero Media */}
        <section className="space-y-6">
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[11px] tracking-widest uppercase text-[#fffff1]/60">
              <button onClick={onClose} className="hover:text-[#fffff1] transition-colors underline-offset-4 hover:underline">
                PROJELERİMİZ
              </button>
              <span>/</span>
              <span className="text-[#fffff1] font-semibold">{project.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#313941] text-[#fffff1] border border-[#fffff1]/20 rounded-md">
                {project.status}
              </span>
              {project.installmentMonths && (
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 rounded-md">
                  Elden Senet Modeli
                </span>
              )}
            </div>
          </div>

          {/* Project Display Typography */}
          <div>
            <h1 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-[#fffff1]/90 font-light max-w-3xl leading-relaxed mt-3">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Technical Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3.5">
              <MapPin size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase text-[#fffff1]/50 block">Konum</span>
                <span className="text-sm font-bold text-[#fffff1] truncate block">{project.location}</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3.5">
              <Layers size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase text-[#fffff1]/50 block">Toplam Alan</span>
                <span className="text-sm font-bold text-[#fffff1] block">{project.totalArea}</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3.5">
              <Building2 size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase text-[#fffff1]/50 block">Bağımsız Bölüm</span>
                <span className="text-sm font-bold text-[#fffff1] block">{project.totalUnits}</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#313941]/50 border border-[#fffff1]/10 flex items-center space-x-3.5">
              <Home size={20} className="text-[#fffff1]/70 flex-shrink-0" />
              <div>
                <span className="text-xs uppercase text-[#fffff1]/50 block">Konut Tipleri</span>
                <span className="text-sm font-bold text-[#fffff1] block truncate">{project.unitTypes.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Full-Bleed Cinematic Hero Render */}
          <div className="rounded-2xl overflow-hidden border border-[#fffff1]/15 shadow-2xl bg-black/40">
            <ResponsiveMedia media={project.heroMedia} className="w-full" showControls={true} />
          </div>
        </section>

        {/* Section 2: Story, Architectural Philosophy & Technical Künye */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (8 cols): Concept, Philosophy & Features */}
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

            {/* Features & Donatılar */}
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
                  <span className="text-[#fffff1]/95 font-medium text-right">{project.location}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Toplam Alan:</span>
                  <span className="text-[#fffff1]/95 font-medium">{project.totalArea}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Bağımsız Bölüm:</span>
                  <span className="text-[#fffff1]/95 font-medium">{project.totalUnits}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Konut Tipleri:</span>
                  <span className="text-[#fffff1]/95 font-medium">{project.unitTypes.join(', ')}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                  <span className="text-[#fffff1]/50">Proje Durumu:</span>
                  <span className="text-[#fffff1] font-bold">{project.status}</span>
                </div>
                {project.installmentMonths && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/10">
                    <span className="text-[#fffff1]/50">Ödeme Modeli:</span>
                    <span className="text-[#fffff1] font-bold">Elden Senet</span>
                  </div>
                )}
              </div>

              {/* Free Tour Callout Inside Card */}
              <div className="pt-4 border-t border-[#fffff1]/10 space-y-3">
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Bu projeyi ve örnek daireyi yerinde görmek için ücretsiz Karasu tanıtım turumuza katılabilirsiniz.
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full py-3.5 px-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl text-center block transition-all shadow-md active:scale-95 cursor-pointer"
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
              <div className="flex flex-wrap gap-2">
                {project.floorPlans.map((plan, idx) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlanIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider transition-all ${
                      selectedPlanIndex === idx
                        ? 'bg-[#fffff1] text-[#252c33] shadow-md scale-105'
                        : 'bg-[#313941] text-[#fffff1]/80 hover:bg-[#3a444e] border border-[#fffff1]/15'
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            </div>

            {project.floorPlans[selectedPlanIndex] && (
              <div className="bg-[#2c343d] border border-[#fffff1]/15 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
                <div className="rounded-xl overflow-hidden border border-[#fffff1]/10 aspect-[4/3] bg-black/40">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((item, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden border border-[#fffff1]/15 bg-[#313941] aspect-[16/10] shadow-md">
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
              ))}
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
                  className="px-6 py-3.5 bg-[#fffff1] hover:bg-white text-[#252c33] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95"
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
            className="flex items-center space-x-2.5 px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95"
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
