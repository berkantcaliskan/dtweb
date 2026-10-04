import React, { useState } from 'react'
import { X, Bus, CheckCircle2, Send, Phone, MessageSquare } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { submitLeadToPortfoy } from '../services/leadService'

interface TourBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('İstanbul')
  const [transportChoice, setTransportChoice] = useState('Pazar Günü (VIP Servis)')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: name,
      phone: phone,
      formName: 'Ücretsiz Tanıtım Turu',
      channel: 'Web Sitesi / Ücretsiz Tanıtım Turu Modalı',
      notes: `Kalkış Şehri: ${city} | Katılım Şekli: ${transportChoice}`,
      tags: ['Web Sitesi', 'Tanıtım Turu', city, transportChoice === 'Kendi Aracımla Geleceğim' ? 'Kendi Aracı' : 'Pazar VIP Servis'],
    })

    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* 1. Temel Arka Plan (Backdrop: bu blurda) */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-md animate-modal-backdrop transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Pencere Arka Planı (Kutucuğun dahilinde, tek parça dikişsiz buzlu cam) */}
      <div 
        className="relative z-10 w-full max-w-xl bg-[#252c33]/55 backdrop-blur-[55px] sm:backdrop-blur-[70px] backdrop-saturate-150 border border-[#fffff1]/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col text-[#fffff1] my-auto animate-modal-content p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık & Kapat Butonu (Kutucuğun dahilinde, çizgisiz ve bar olmadan tek parça) */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold flex-shrink-0">
              <Bus size={18} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                VIP TRANSFER & MİSAFİRLİK
              </span>
              <h3 className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] leading-tight mt-0.5">
                Ücretsiz Karasu Tanıtım Turu
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#fffff1] border border-[#fffff1]/15 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            aria-label="Kapat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Açıklaması */}
        <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
          Her Pazar günü İstanbul, Kocaeli ve Sakarya’dan kalkan özel VIP transfer aracımızla ya da kendi aracınızla gelin; havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak inceleyin.
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
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-sm text-emerald-200 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-emerald-100">Rezervasyon Talebiniz Alındı!</h4>
                  <p className="text-xs text-emerald-300/80">Kayıt başarıyla Portföy CRM sistemimize iletildi.</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#fffff1]/80 leading-relaxed font-light">
                Müşteri danışmanımız hareket saati ve biniş detaylarını teyit etmek üzere sizinle en kısa sürede iletişime geçecektir. Dilerseniz başvurunuzu WhatsApp üzerinden de paylaşabilirsiniz:
              </p>

              <div className="bg-black/25 rounded-xl p-3 text-xs text-[#fffff1]/80 border border-[#fffff1]/10 space-y-1">
                <div><span className="text-[#fffff1]/50">Ad Soyad:</span> {name || 'Belirtilmedi'}</div>
                <div><span className="text-[#fffff1]/50">Telefon:</span> {phone}</div>
                <div><span className="text-[#fffff1]/50">Kalkış Şehri:</span> {city}</div>
                <div><span className="text-[#fffff1]/50">Katılım & Ulaşım:</span> {transportChoice}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                    `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için web sitenizden rezervasyon başvurumu ilettim:\n\n• İsim: ${name || 'Belirtilmedi'}\n• Telefon: ${phone}\n• Kalkış Şehri: ${city}\n• Katılım & Ulaşım: ${transportChoice}\n\nTur ve rezervasyon detaylarını teyit etmek istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 hover:border-emerald-500/60 text-emerald-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare size={16} className="text-emerald-400" />
                  <span>WhatsApp’ta Paylaş / Onayla</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-5 py-3 glass-blur-box rounded-xl text-xs sm:text-sm text-[#fffff1]/90 hover:text-white cursor-pointer transition-colors"
                >
                  Kapat
                </button>
              </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                    Bulunduğunuz Şehir
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ colorScheme: 'dark' }}
                    className="w-full px-3.5 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 transition-colors cursor-pointer"
                  >
                    <option value="İstanbul" className="bg-[#1e242b] text-[#fffff1] py-2">İstanbul</option>
                    <option value="Kocaeli" className="bg-[#1e242b] text-[#fffff1] py-2">Kocaeli</option>
                    <option value="Sakarya" className="bg-[#1e242b] text-[#fffff1] py-2">Sakarya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                    Katılım & Ulaşım
                  </label>
                  <select
                    value={transportChoice}
                    onChange={(e) => setTransportChoice(e.target.value)}
                    style={{ colorScheme: 'dark' }}
                    className="w-full px-3.5 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 transition-colors cursor-pointer"
                  >
                    <option value="Pazar Günü (VIP Servis)" className="bg-[#1e242b] text-[#fffff1] py-2">Pazar Günü (VIP Servis)</option>
                    <option value="Kendi Aracımla Geleceğim" className="bg-[#1e242b] text-[#fffff1] py-2">Kendi Aracımla Geleceğim</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#252c33] bg-[#fffff1] hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send size={15} />
                <span>Ücretsiz Tur Rezervasyonunu Tamamla</span>
              </button>
            </form>
          )}
        </div>
      </div>
  )
}
