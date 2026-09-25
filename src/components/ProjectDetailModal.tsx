import React, { useState } from 'react'
import { X, MapPin, Calendar, Layers, ShieldCheck, Check, MessageSquare, Phone, ChevronRight, Download, Send } from 'lucide-react'
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

  if (!project) return null

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadPhone.trim()) return

    // Create WhatsApp direct link or record
    const text = encodeURIComponent(
      `Merhaba, ${project.title} projeniz hakkında detaylı bilgi ve tanıtım turu talebinde bulunmak istiyorum.\nİsim: ${leadName || 'Belirtilmedi'}\nTelefon: ${leadPhone}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setLeadFormSubmitted(true)
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex justify-center p-0 md:p-6 lg:p-10 animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#1e242b]/75 backdrop-blur-2xl border border-[#fffff1]/20 md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col text-[#fffff1] my-auto animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#1e242b]/65 backdrop-blur-xl border-b border-[#fffff1]/15">
          <div>
            <span className="text-[10px] tracking-widest text-[#fffff1]/80 uppercase block font-medium">
              {project.categoryLabel} — {project.year}
            </span>
            <h2 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20${encodeURIComponent(project.title)}%20projesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 rounded text-xs hover:bg-emerald-900/60 transition-colors"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Bilgi</span>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#313941] text-[#fffff1] flex items-center justify-center transition-colors"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] p-6 lg:p-8 space-y-10">
          {/* Main Hero Media (Responsive 16:9 Desktop, 9:16 Mobile) */}
          <div className="rounded-xl overflow-hidden border border-[#fffff1]/10 shadow-lg">
            <ResponsiveMedia media={project.heroMedia} className="w-full" showControls={true} />
          </div>

          {/* Architectural Overview & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xs tracking-[0.2em] text-[#fffff1]/80 uppercase mb-2 font-medium">
                  PROJE KONSEPTİ VE HİKAYESİ
                </h3>
                <p className="text-base text-[#fffff1]/90 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {project.architecturalPhilosophy && (
                <div className="p-5 bg-white/5 border-l-2 border-[#fffff1]/50 rounded-r-lg space-y-2">
                  <h4 className="text-xs tracking-wider text-[#fffff1]/90 uppercase font-medium">
                    MİMARİ YAKLAŞIM (EAA DİLİ VE BAĞLAM)
                  </h4>
                  <p className="text-sm text-[#fffff1]/80 leading-relaxed italic">
                    "{project.architecturalPhilosophy}"
                  </p>
                </div>
              )}

              {/* Features & Donatılar */}
              <div>
                <h3 className="text-xs tracking-[0.2em] text-[#fffff1]/80 uppercase mb-3 font-medium">
                  ÖNE ÇIKAN DONATILAR & AYRICALIKLAR
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs text-[#fffff1]/80 bg-white/[0.03] p-2.5 rounded border border-[#fffff1]/5">
                      <Check size={14} className="text-[#fffff1] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="bg-[#313941]/55 backdrop-blur-xl border border-[#fffff1]/15 p-6 rounded-xl space-y-5 h-fit shadow-lg">
              <h3 className="text-xs tracking-[0.2em] text-[#fffff1]/80 uppercase pb-2 border-b border-[#fffff1]/10 font-medium">
                TEKNİK KÜNYE
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                  <span className="text-[#fffff1]/50">Konum:</span>
                  <span className="text-[#fffff1]/90 font-medium text-right">{project.location}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                  <span className="text-[#fffff1]/50">Toplam Alan:</span>
                  <span className="text-[#fffff1]/90 font-medium">{project.totalArea}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                  <span className="text-[#fffff1]/50">Bağımsız Bölüm:</span>
                  <span className="text-[#fffff1]/90 font-medium">{project.totalUnits}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                  <span className="text-[#fffff1]/50">Konut Tipleri:</span>
                  <span className="text-[#fffff1]/90 font-medium">{project.unitTypes.join(', ')}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                  <span className="text-[#fffff1]/50">Durum:</span>
                  <span className="text-[#fffff1] font-semibold">{project.status}</span>
                </div>
                {project.installmentMonths && (
                  <div className="flex justify-between pb-2 border-b border-[#fffff1]/5">
                    <span className="text-[#fffff1]/50">Ödeme Modeli:</span>
                    <span className="text-[#fffff1] font-semibold">Elden Senet</span>
                  </div>
                )}
              </div>

              {/* Tour Booking Box */}
              <div className="pt-4 border-t border-[#fffff1]/10">
                <p className="text-[11px] text-[#fffff1]/60 mb-3">
                  Bu projeyi ve örnek daireyi yerinde görmek için ücretsiz Karasu tanıtım turumuza katılabilirsiniz.
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full py-2.5 px-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs uppercase tracking-wider rounded text-center block transition-colors shadow-md"
                >
                  0264 718 18 54 ile Bilgi Al
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Floor Plans Section */}
          {project.floorPlans && project.floorPlans.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#fffff1]/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs tracking-[0.2em] text-[#fffff1]/80 uppercase font-medium">
                    MİMARİ KAT PLANLARI & YERLEŞİM
                  </h3>
                  <p className="text-xs text-[#fffff1]/60 font-light">
                    Farklı yaşam ihtiyaçlarına göre optimize edilmiş fonksiyonel mimari planlar.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.floorPlans.map((plan, idx) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlanIndex(idx)}
                      className={`px-3 py-1.5 rounded text-xs uppercase transition-all ${
                        selectedPlanIndex === idx
                          ? 'bg-[#fffff1] text-[#252c33] font-semibold shadow-md'
                          : 'bg-white/5 text-[#fffff1]/70 hover:bg-white/10'
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>

              {project.floorPlans[selectedPlanIndex] && (
                <div className="bg-[#313941]/55 backdrop-blur-xl border border-[#fffff1]/15 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-lg">
                  <div className="rounded-lg overflow-hidden border border-[#fffff1]/10 aspect-[4/3] bg-black/40">
                    <img
                      src={project.floorPlans[selectedPlanIndex].image}
                      alt={project.floorPlans[selectedPlanIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#fffff1]/80 uppercase font-medium">
                        SEÇİLEN PLAN DETAYI
                      </span>
                      <h4 className="font-theSeasons text-2xl font-semibold text-[#fffff1] mt-1">
                        {project.floorPlans[selectedPlanIndex].name}
                      </h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#fffff1]/5">
                        <span className="text-[#fffff1]/50">Net/Brüt Alan:</span>
                        <span className="text-[#fffff1] font-semibold">{project.floorPlans[selectedPlanIndex].area}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#fffff1]/5">
                        <span className="text-[#fffff1]/50">Oda Dağılımı:</span>
                        <span className="text-[#fffff1]/90 text-right">{project.floorPlans[selectedPlanIndex].rooms}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#fffff1]/70 leading-relaxed font-light">
                      {project.floorPlans[selectedPlanIndex].description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* High Res Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#fffff1]/10">
              <h3 className="text-xs tracking-[0.2em] text-[#fffff1]/80 uppercase font-medium">
                FOTOĞRAF VE MİMARİ PERSPEKTİF GALERİSİ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((item, idx) => (
                  <div key={idx} className="group relative rounded-lg overflow-hidden border border-[#fffff1]/10 bg-[#313941] aspect-video">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] text-[#fffff1]/90">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Lead Form */}
          <div className="bg-gradient-to-br from-[#313941]/60 to-[#252c33]/60 backdrop-blur-xl border border-[#fffff1]/20 rounded-xl p-6 lg:p-8 shadow-lg">
            <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1] mb-2">
              {project.title} Hakkında Hızlı Bilgi & Tanıtım Turu Talebi
            </h3>
            <p className="text-xs text-[#fffff1]/60 mb-6 max-w-xl">
              İletişim bilgilerinizi bırakın, satış temsilcimiz proje detayları, güncel kat planları ve senetli ödeme tablosunu WhatsApp üzerinden iletsin.
            </p>

            {leadFormSubmitted ? (
              <div className="p-4 bg-emerald-900/30 border border-emerald-500/40 rounded-lg text-sm text-emerald-300 flex items-center space-x-2">
                <Check size={18} />
                <span>Talebiniz iletildi. Müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.</span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız (05xx...)"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  required
                  className="px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Send size={14} />
                  <span>WhatsApp ile Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
