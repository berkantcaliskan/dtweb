import React, { useState } from 'react'
import { FINANCING_ADVANTAGES, COMPANY_INFO } from '../data/websiteData'
import { Bus, CheckCircle2, ShieldCheck, Send, FileCheck, Layers, Award } from 'lucide-react'

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
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>FİNANSMAN & AYRICALIKLAR / FINANCING</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
            Banka Kredisiz, Kefilsiz — Elden Senet Modeli
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            Demirtürk İnşaat ile ev sahibi olmak çok daha zahmetsiz ve güvenli. Banka bürokrasisi ve kredi faizleri olmadan, doğrudan şirket bünyesinde elden senet modeliyle hayalinizdeki sahil evine hemen adım atın.
          </p>
        </div>

        {/* 4 Key Advantages (Contour-only, transparent glass blur) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FINANCING_ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 text-[11px] tracking-wider uppercase bg-white/5 backdrop-blur-sm text-[#fffff1] border border-[#fffff1]/20 rounded-md mb-4 font-medium">
                  {adv.highlight}
                </span>
                <h3 className="font-theSeasons text-xl font-semibold text-[#fffff1] mb-2 leading-snug">
                  {adv.title}
                </h3>
                <p className="text-sm text-[#fffff1]/80 font-light leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Interactive Modules: Financing Model Guide & Free Tour Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module 1: Elden Senet Modeli Güvenceleri (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1] flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
                  Elden Senetli Satış Modeli İlkelerimiz
                </h3>
                <p className="text-sm text-[#fffff1]/70 font-light">
                  Şeffaf, güvenilir ve doğrudan üretici garantili gayrimenkul edinimi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <FileCheck size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Banka ve Kredi Yok</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Kredi notu sorgulaması, dosya masrafı, banka komisyonu veya kefil zorunluluğu bulunmaz.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Layers size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Esnek Vade</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Gelir durumunuza ve bütçenize göre esnek, proje bazlı kişiselleştirilmiş vade planı sunulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Award size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Doğrudan Üreticiden</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Senetleriniz 3. parti finans kurumlarına devredilmez, doğrudan Demirtürk İnşaat bünyesinde tutulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <CheckCircle2 size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Resmi Noter Güvencesi</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Tüm satış ve taahhüt süreçleri yasal noter sözleşmesi ve şeffaf şartnamelerle güvence altına alınır.
                </p>
              </div>
            </div>

            {/* Direct Consult CTA */}
            <div className="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                  KİŞİYE ÖZEL ÖDEME PLANI
                </span>
                <span className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] mt-1 block">
                  Size Özel Vade Planını Konuşalım
                </span>
                <span className="text-xs text-[#fffff1]/65 block mt-1 font-light">
                  Satış danışmanlarımız projelere özel alternatif ödeme planlarını sizin için hazırlasın.
                </span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba,%20elden%20senetli%20%C3%B6deme%20planlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="glass-blur-box px-5 py-2.5 sm:px-6 sm:py-3 text-[#fffff1] font-normal text-xs sm:text-sm uppercase tracking-wider rounded-2xl text-center whitespace-nowrap transition-all shadow-md hover:border-[#fffff1]/40 cursor-pointer flex-shrink-0"
              >
                Bilgi Alın
              </a>
            </div>
          </div>

          {/* Module 2: Free Karasu Tour Booking (5 Cols) */}
          <div id="tanitim-turu" className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold flex-shrink-0">
                <Bus size={20} />
              </div>
              <div>
                <span className="text-xs tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                  ÜCRETSİZ MİSAFİRİMİZ OLUN
                </span>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  Karasu Tanıtım Turu
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
              İstanbul ve çevre illerden Karasu’ya özel VIP araçlarımızla transfer sağlıyoruz. Havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak görün.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#fffff1]/90">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>İstanbul Anadolu ve Avrupa yakasından VIP transfer</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Örnek daire, peyzaj ve havuz alanlarının gezilmesi</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Karasu sahil bandı ve bölge gelişimi hakkında brifing</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Öğle yemeği ve ikramlar dahil — tamamen ücretsiz</span>
              </div>
            </div>

            {/* Quick Reservation Form */}
            {tourSubmitted ? (
              <div className="p-5 bg-emerald-900/40 border border-emerald-500/40 rounded-xl text-sm text-emerald-300 space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} />
                  <span className="font-semibold text-base">Talebiniz Alındı!</span>
                </div>
                <p className="text-sm text-emerald-300/80 leading-relaxed">
                  Müşteri temsilcimiz transfer detayları ve hareket noktası için sizi arayacaktır.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      Telefon <span className="text-[#fffff1]/70">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      placeholder="05xx xxx xx xx"
                      className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      Kalkış Noktası
                    </label>
                    <select
                      value={tourCity}
                      onChange={(e) => setTourCity(e.target.value)}
                      className="w-full px-3.5 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:border-[#fffff1]/40 focus:outline-none transition-colors"
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
                  className="glass-blur-box w-full py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-medium text-[#fffff1] hover:border-[#fffff1]/40 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Send size={14} />
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
