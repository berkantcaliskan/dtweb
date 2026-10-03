import React, { useState } from 'react'
import { X, Bus, CheckCircle2, Send, Phone } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'

interface TourBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('İstanbul')
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    const message = encodeURIComponent(
      `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için rezervasyon yapmak istiyorum:\nİsim: ${name || 'Belirtilmedi'}\nTelefon: ${phone}\nŞehir: ${city}\nTercih Edilen Tarih: ${date || 'Hafta sonu'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-md flex justify-center p-4 sm:p-6 lg:p-10 animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="relative w-full max-w-xl bg-[#252c33]/70 backdrop-blur-2xl border border-[#fffff1]/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col text-[#fffff1] my-auto animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] backdrop-blur-md border-b border-[#fffff1]/15">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold">
              <Bus size={18} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#fffff1]/80 block font-medium">
                VIP TRANSFER & MİSAFİRLİK
              </span>
              <h3 className="font-theSeasons text-xl font-bold text-[#fffff1]">
                Ücretsiz Karasu Tanıtım Turu
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#fffff1] border border-[#fffff1]/15 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
            İstanbul ve çevre illerden Karasu’ya özel VIP transfer aracımızla gelin; havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak inceleyin.
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#fffff1]/90">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
              <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
              <span>Gidiş - Dönüş Transfer</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
              <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
              <span>Örnek Daire Gezisi</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
              <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
              <span>Öğle Yemeği İkramı</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
              <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
              <span>Sıfır Satın Alma Şartı</span>
            </div>
          </div>

          {submitted ? (
            <div className="p-5 bg-emerald-900/40 border border-emerald-500/40 rounded-xl text-sm text-emerald-300 space-y-2">
              <p className="font-semibold text-base">Talebiniz Alındı!</p>
              <p className="leading-relaxed">
                Müşteri danışmanımız hareket saati ve biniş noktası planlaması için sizi en kısa sürede arayacaktır.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 glass-blur-box rounded-lg text-xs sm:text-sm text-[#fffff1] cursor-pointer"
              >
                Tamam
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                  Telefon Numaranız <span className="text-[#fffff1]/70">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="05xx xxx xx xx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/40 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                    Bulunduğunuz Şehir
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/40 transition-colors"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="Kocaeli/İzmit">Kocaeli / İzmit</option>
                    <option value="Sakarya">Sakarya Merkez</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                    Tercih Edilen Gün
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Cumartesi"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/40 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="glass-blur-box w-full py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-medium text-[#fffff1] hover:border-[#fffff1]/40 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send size={14} />
                <span>Ücretsiz Tur Rezervasyonunu Tamamla</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
