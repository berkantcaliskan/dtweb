import React, { useState } from 'react'
import { FINANCING_ADVANTAGES, COMPANY_INFO } from '../data/websiteData'
import { Bus, CheckCircle2, ShieldCheck, ArrowRight, Send, Phone, FileCheck, Layers, Award } from 'lucide-react'

export const FinancingAndTourSection: React.FC = () => {
  // Tour Booking State
  const [tourName, setTourName] = useState('')
  const [tourPhone, setTourPhone] = useState('')
  const [tourCity, setTourCity] = useState('İstanbul')
  const [tourDate, setTourDate] = useState('')
  const [tourSubmitted, setTourSubmitted] = useState(false)

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tourPhone.trim()) return

    const message = encodeURIComponent(
      `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için rezervasyon yapmak istiyorum:\nİsim: ${tourName || 'Belirtilmedi'}\nTelefon: ${tourPhone}\nŞehir: ${tourCity}\nTercih Edilen Tarih: ${tourDate || 'Hafta sonu'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank')
    setTourSubmitted(true)
  }

  return (
    <section id="finansman" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
            <span>FİNANSMAN & AYRICALIKLAR</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
            Banka Kredisiz, Kefilsiz — Elden Senet Modeli
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#fffff1]/70 font-light leading-relaxed">
            Demirtürk İnşaat ile ev sahibi olmak çok daha zahmetsiz ve güvenli. Banka bürokrasisi ve kredi faizleri olmadan, doğrudan şirket bünyesinde elden senet modeliyle hayalinizdeki sahil evine hemen adım atın.
          </p>
        </div>

        {/* 4 Key Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FINANCING_ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 hover:border-[#fffff1]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase bg-[#252c33] text-[#fffff1] border border-[#fffff1]/20 rounded mb-4 font-semibold">
                  {adv.highlight}
                </span>
                <h3 className="font-theSeasons text-xl font-semibold text-[#fffff1] mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs text-[#fffff1]/60 font-light leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Interactive Modules: Financing Model Guide & Free Tour Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module 1: Elden Senet Modeli Güvenceleri (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg bg-[#252c33] border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
                  Elden Senetli Satış Modeli İlkelerimiz
                </h3>
                <p className="text-xs text-[#fffff1]/50">
                  Şeffaf, güvenilir ve doğrudan üretici garantili gayrimenkul edinimi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#fffff1]/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <FileCheck size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#fffff1]">Banka ve Kredi Yok</span>
                </div>
                <p className="text-xs text-[#fffff1]/65 leading-relaxed font-light">
                  Kredi notu sorgulaması, dosya masrafı, banka komisyonu veya kefil zorunluluğu bulunmaz.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#fffff1]/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Layers size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#fffff1]">Esnek Vade</span>
                </div>
                <p className="text-xs text-[#fffff1]/65 leading-relaxed font-light">
                  Gelir durumunuza ve bütçenize göre esnek, proje bazlı kişiselleştirilmiş vade planı sunulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#fffff1]/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Award size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#fffff1]">Doğrudan Üreticiden</span>
                </div>
                <p className="text-xs text-[#fffff1]/65 leading-relaxed font-light">
                  Senetleriniz 3. parti finans kurumlarına devredilmez, doğrudan Demirtürk İnşaat bünyesinde tutulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#fffff1]/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#fffff1]">Resmi Noter Güvencesi</span>
                </div>
                <p className="text-xs text-[#fffff1]/65 leading-relaxed font-light">
                  Tüm satış ve taahhüt süreçleri yasal noter sözleşmesi ve şeffaf şartnamelerle güvence altına alınır.
                </p>
              </div>
            </div>

            {/* Direct Consult CTA */}
            <div className="p-5 rounded-xl bg-black/40 border border-[#fffff1]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#fffff1]/80 block font-medium">
                  KİŞİYE ÖZEL ÖDEME PLANI
                </span>
                <span className="font-theSeasons text-2xl font-bold text-[#fffff1] mt-1 block">
                  Size Özel Vade Planını Konuşalım
                </span>
                <span className="text-[11px] text-[#fffff1]/50 block mt-1">
                  Satış danışmanlarımız projelere özel alternatif ödeme planlarını sizin için hazırlasın.
                </span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba,%20elden%20senetli%20%C3%B6deme%20planlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-[#fffff1] hover:bg-white text-[#252c33] text-xs font-semibold uppercase tracking-wider rounded text-center whitespace-nowrap transition-all shadow-md hover:scale-105"
              >
                Bilgi Alın
              </a>
            </div>
          </div>

          {/* Module 2: Free Karasu Tour Booking (5 Cols) */}
          <div id="tanitim-turu" className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#313941]/90 to-[#252c33]/90 backdrop-blur-md border border-[#fffff1]/15 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg bg-[#252c33] border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold">
                <Bus size={20} />
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#fffff1]/80 block font-medium">
                  ÜCRETSİZ MİSAFİRİMİZ OLUN
                </span>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  Karasu Tanıtım Turu
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#fffff1]/70 leading-relaxed font-light">
              İstanbul ve çevre illerden Karasu’ya özel VIP araçlarımızla transfer sağlıyoruz. Havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak görün.
            </p>

            <div className="space-y-2 text-xs text-[#fffff1]/80">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#fffff1] flex-shrink-0" />
                <span>İstanbul Anadolu ve Avrupa yakasından VIP transfer</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#fffff1] flex-shrink-0" />
                <span>Örnek daire, peyzaj ve havuz alanlarının gezilmesi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#fffff1] flex-shrink-0" />
                <span>Karasu sahil bandı ve bölge gelişimi hakkında brifing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-[#fffff1] flex-shrink-0" />
                <span>Öğle yemeği ve ikramlar dahil — tamamen ücretsiz</span>
              </div>
            </div>

            {/* Quick Reservation Form */}
            {tourSubmitted ? (
              <div className="p-4 bg-emerald-900/30 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Tur talebiniz alındı! Müşteri temsilcimiz transfer detayları için sizi arayacaktır.</span>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#fffff1]/60 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="w-full px-3 py-2 bg-white/5 border border-[#fffff1]/10 rounded text-xs text-[#fffff1] placeholder-[#fffff1]/30 focus:border-[#fffff1]/50 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#fffff1]/60 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full px-3 py-2 bg-white/5 border border-[#fffff1]/10 rounded text-xs text-[#fffff1] placeholder-[#fffff1]/30 focus:border-[#fffff1]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#fffff1]/60 mb-1">
                      Kalkış Noktası
                    </label>
                    <select
                      value={tourCity}
                      onChange={(e) => setTourCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#313941] border border-[#fffff1]/10 rounded text-xs text-[#fffff1] focus:border-[#fffff1]/50 focus:outline-none"
                    >
                      <option value="İstanbul - Anadolu">İstanbul Anadolu</option>
                      <option value="İstanbul - Avrupa">İstanbul Avrupa</option>
                      <option value="Kocaeli / Gebze">Kocaeli / Gebze</option>
                      <option value="Sakarya / Merkez">Sakarya Merkez</option>
                      <option value="Diğer">Diğer İller</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md flex items-center justify-center space-x-2 mt-2"
                >
                  <Send size={13} />
                  <span>Ücretsiz Tur Rezervasyonu Yap</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancingAndTourSection
