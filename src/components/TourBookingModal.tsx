import React, { useState } from 'react'
import { X, Bus, CheckCircle2, Send, MessageSquare } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { submitLeadToPortfoy } from '../services/leadService'
import { useLanguage } from '../context/LanguageContext'

interface TourBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage()
  const isEn = language === 'EN'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('İstanbul')
  const [transportChoice, setTransportChoice] = useState('vip')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const getTransportLabel = () => {
    if (transportChoice === 'own') {
      return isEn ? 'Arriving with Own Vehicle' : 'Kendi Aracımla Geleceğim'
    }
    return isEn ? 'Sunday (VIP Shuttle)' : 'Pazar Günü (VIP Servis)'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    const actualTransport = getTransportLabel()

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: name,
      phone: phone,
      formName: isEn ? 'Complimentary Discovery Tour' : 'Ücretsiz Tanıtım Turu',
      channel: isEn ? 'Website / VIP Tour Modal (EN)' : 'Web Sitesi / Ücretsiz Tanıtım Turu Modalı',
      notes: `${isEn ? 'Departure' : 'Kalkış Şehri'}: ${city} | ${isEn ? 'Transport' : 'Katılım Şekli'}: ${actualTransport}`,
      tags: ['Web Sitesi', 'Tanıtım Turu', city, transportChoice === 'own' ? 'Kendi Aracı' : 'Pazar VIP Servis'],
    })

    setSubmitted(true)
  }

  const waMessage = isEn
    ? `Hello Demirtürk İnşaat, I have submitted a reservation for the Complimentary Karasu Discovery Tour via your website:\n\n• Name: ${name || 'Not specified'}\n• Phone: ${phone}\n• Departure City: ${city}\n• Transport: ${getTransportLabel()}\n\nI would like to confirm tour schedule and pickup details.`
    : `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için web sitenizden rezervasyon başvurumu ilettim:\n\n• İsim: ${name || 'Belirtilmedi'}\n• Telefon: ${phone}\n• Kalkış Şehri: ${city}\n• Katılım & Ulaşım: ${getTransportLabel()}\n\nTur ve rezervasyon detaylarını teyit etmek istiyorum.`

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* 1. Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-md animate-modal-backdrop transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Modal Container */}
      <div 
        className="relative z-10 w-full max-w-xl bg-[#252c33]/55 backdrop-blur-[55px] sm:backdrop-blur-[70px] backdrop-saturate-150 border border-[#fffff1]/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col text-[#fffff1] my-auto animate-modal-content p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold flex-shrink-0">
              <Bus size={18} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                {isEn ? 'VIP SHUTTLE & HOSPITALITY' : 'VIP TRANSFER & MİSAFİRLİK'}
              </span>
              <h3 className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] leading-tight mt-0.5">
                {isEn ? 'Complimentary Karasu Discovery Tour' : 'Ücretsiz Karasu Tanıtım Turu'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#fffff1] border border-[#fffff1]/15 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            aria-label={isEn ? 'Close' : 'Kapat'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Description */}
        <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
          {isEn
            ? "Join us every Sunday with our dedicated VIP transfer shuttles departing from Istanbul, Kocaeli, and Sakarya, or arrive with your private vehicle to experience our residential resorts, coastal avenue, and furnished show apartments live on-site."
            : "Her Pazar günü İstanbul, Kocaeli ve Sakarya’dan kalkan özel VIP transfer aracımızla ya da kendi aracınızla gelin; havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak inceleyin."}
        </p>

        {/* Perks Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#fffff1]/90">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
            <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
            <span>{isEn ? 'Round-trip VIP Transfer' : 'Gidiş - Dönüş Transfer'}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
            <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
            <span>{isEn ? 'Show Apartment Tour' : 'Örnek Daire Gezisi'}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
            <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
            <span>{isEn ? 'Complimentary Lunch' : 'Öğle Yemeği İkramı'}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-[#fffff1]/15">
            <CheckCircle2 size={15} className="text-[#fffff1] flex-shrink-0" />
            <span>{isEn ? 'Zero Purchase Obligation' : 'Sıfır Satın Alma Şartı'}</span>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-sm text-emerald-200 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-base text-emerald-100">
                  {isEn ? 'Reservation Request Received!' : 'Rezervasyon Talebiniz Alındı!'}
                </h4>
                <p className="text-xs text-emerald-300/80">
                  {isEn ? 'Registration successfully forwarded to our Portfoy CRM system.' : 'Kayıt başarıyla Portföy CRM sistemimize iletildi.'}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#fffff1]/80 leading-relaxed font-light">
              {isEn
                ? 'Our guest advisor will contact you shortly to confirm departure timing and boarding details. You can also share your application via WhatsApp:'
                : 'Müşteri danışmanımız hareket saati ve biniş detaylarını teyit etmek üzere sizinle en kısa sürede iletişime geçecektir. Dilerseniz başvurunuzu WhatsApp üzerinden de paylaşabilirsiniz:'}
            </p>

            <div className="bg-black/25 rounded-xl p-3 text-xs text-[#fffff1]/80 border border-[#fffff1]/10 space-y-1">
              <div><span className="text-[#fffff1]/50">{isEn ? 'Full Name:' : 'Ad Soyad:'}</span> {name || (isEn ? 'Not specified' : 'Belirtilmedi')}</div>
              <div><span className="text-[#fffff1]/50">{isEn ? 'Phone:' : 'Telefon:'}</span> {phone}</div>
              <div><span className="text-[#fffff1]/50">{isEn ? 'Departure City:' : 'Kalkış Şehri:'}</span> {city}</div>
              <div><span className="text-[#fffff1]/50">{isEn ? 'Participation & Transport:' : 'Katılım & Ulaşım:'}</span> {getTransportLabel()}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 hover:border-emerald-500/60 text-emerald-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <MessageSquare size={16} className="text-emerald-400" />
                <span>{isEn ? 'Share / Confirm on WhatsApp' : 'WhatsApp’ta Paylaş / Onayla'}</span>
              </a>

              <button
                onClick={onClose}
                className="px-5 py-3 glass-blur-box rounded-xl text-xs sm:text-sm text-[#fffff1]/90 hover:text-white cursor-pointer transition-colors"
              >
                {isEn ? 'Close' : 'Kapat'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                {isEn ? 'Full Name' : 'Adınız Soyadınız'}
              </label>
              <input
                type="text"
                placeholder={isEn ? 'Full Name' : 'Adınız Soyadınız'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                {isEn ? 'Phone Number' : 'Telefon Numaranız'} <span className="text-[#fffff1]/70">*</span>
              </label>
              <input
                type="tel"
                placeholder="05..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/40 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                  {isEn ? 'Departure City' : 'Bulunduğunuz Şehir'}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-3.5 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 transition-colors cursor-pointer"
                >
                  <option value="İstanbul" className="bg-[#1e242b] text-[#fffff1] py-2">{isEn ? 'Istanbul' : 'İstanbul'}</option>
                  <option value="Kocaeli" className="bg-[#1e242b] text-[#fffff1] py-2">Kocaeli</option>
                  <option value="Sakarya" className="bg-[#1e242b] text-[#fffff1] py-2">Sakarya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                  {isEn ? 'Participation & Transport' : 'Katılım & Ulaşım'}
                </label>
                <select
                  value={transportChoice}
                  onChange={(e) => setTransportChoice(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-3.5 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-xl text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 transition-colors cursor-pointer"
                >
                  <option value="vip" className="bg-[#1e242b] text-[#fffff1] py-2">
                    {isEn ? 'Sunday (VIP Shuttle)' : 'Pazar Günü (VIP Servis)'}
                  </option>
                  <option value="own" className="bg-[#1e242b] text-[#fffff1] py-2">
                    {isEn ? 'Arriving with Own Vehicle' : 'Kendi Aracımla Geleceğim'}
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#252c33] bg-[#fffff1] hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send size={15} />
              <span>{isEn ? 'Complete Free Tour Booking' : 'Ücretsiz Tur Rezervasyonunu Tamamla'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
