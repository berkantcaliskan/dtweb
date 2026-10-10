import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formSubject, setFormSubject] = useState('Genel Bilgi & Satış')
  const [formMessage, setFormMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formPhone.trim()) return

    const text = encodeURIComponent(
      `Merhaba Demirtürk İnşaat,\nKonu: ${formSubject}\nİsim: ${formName || 'Belirtilmedi'}\nTelefon: ${formPhone}\nMesaj: ${formMessage || 'Web sitesi üzerinden randevu/bilgi talebi'}`
    )
    const targetWhatsapp = formSubject.includes('Malzeme') ? COMPANY_INFO.materialsWhatsapp : COMPANY_INFO.whatsapp
    window.open(`https://wa.me/${targetWhatsapp}?text=${text}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="iletisim" className="py-24 bg-[#181615] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#b99881] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b99881]" />
            <span>İLETİŞİM & OFİS / CONTACT</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Sizi Karasu Ofisimizde Ağırlamaktan Mutluluk Duyarız
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Projelerimizi yerinde görmek, elden senetli ödeme planlarını detaylandırmak veya malzeme tedariki için bizimle doğrudan iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Office Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#23201e] border border-white/10 space-y-6">
              <h3 className="font-theSeasons text-2xl font-semibold text-white pb-3 border-b border-white/10">
                Merkez Ofis Bilgileri
              </h3>

              <div className="space-y-4 text-xs font-light">
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-[#b99881] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase text-white/50 mb-0.5">Adres</span>
                    <span className="text-white/90 leading-relaxed block">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone size={18} className="text-[#b99881] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase text-white/50 mb-0.5">Telefon Hatları</span>
                    <div className="space-y-1">
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-white/90 hover:text-[#b99881] block">
                        Ofis: {COMPANY_INFO.phone}
                      </a>
                      <a href={`tel:${COMPANY_INFO.mobilePhone}`} className="text-white/90 hover:text-[#b99881] block">
                        GSM: {COMPANY_INFO.mobilePhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-[#b99881] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase text-white/50 mb-0.5">E-Posta</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white/90 hover:text-[#b99881] block">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-[#b99881] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase text-white/50 mb-0.5">Ziyaret Saatleri</span>
                    <span className="text-white/90 block">{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20Demirt%C3%BCrk%20%C4%B0n%C5%9Faat%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Canlı Destek Hattı</span>
                </a>
              </div>
            </div>

            {/* Interactive Map Preview */}
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] bg-[#23201e] relative">
              {/* Company Name & Location Badge */}
              <div className="absolute top-3 left-3 z-10 bg-[#1c2126]/90 border border-white/20 backdrop-blur-md px-3 py-2 rounded-xl flex items-center space-x-2.5 shadow-lg pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <div className="text-left">
                  <span className="text-xs font-bold text-white block leading-tight">Demirtürk İnşaat</span>
                  <span className="text-[10px] text-white/70 block leading-tight">Doğu Karadeniz Cd. No:1, Aziziye</span>
                </div>
              </div>

              <iframe
                title="Demirtürk İnşaat - Karasu Merkez Ofis Harita"
                src="https://maps.google.com/maps?q=41.100494,30.718688+(Demirt%C3%BCrk+%C4%B0n%C5%9Faat)&t=&z=18&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact & Appointment Form (7 Cols) - Unboxed */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] tracking-widest text-[#b99881] uppercase block">
                RANDEVU & BİLGİ TALEBİ
              </span>
              <h3 className="font-theSeasons text-3xl font-bold text-white mt-1">
                Bize Mesaj Gönderin
              </h3>
              <p className="text-xs text-white/60 font-light mt-1">
                Aşağıdaki formu doldurarak satış danışmanlarımızın sizinle 15 dakika içinde iletişime geçmesini sağlayabilirsiniz.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                <div className="flex items-center space-x-2">
                  <Check size={20} />
                  <span className="font-semibold text-base">Talebiniz Alındı!</span>
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  Mesajınız Demirtürk İnşaat müşteri ilişkileri birimine iletildi. En kısa sürede telefonunuz üzerinden geri dönüş yapılacaktır.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase text-white/50 mb-1">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#b99881]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-white/50 mb-1">
                      Telefon Numaranız <span className="text-[#b99881]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="05xx xxx xx xx"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#b99881]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-white/50 mb-1">
                    Görüşmek İstediğiniz Konu
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#b99881]"
                  >
                    <option value="Satılık Daireler & Siteler">Satılık Daireler & Siteler</option>
                    <option value="Müstakil Villalar">Müstakil Villalar</option>
                    <option value="Karasu Ücretsiz Tanıtım Turu">Karasu Ücretsiz Tanıtım Turu</option>
                    <option value="Elden Senetli Ödeme Planı">Elden Senetli Ödeme Planı</option>
                    <option value="İnşaat Malzemeleri & Toptan Tedarik">İnşaat Malzemeleri & Toptan Tedarik</option>
                    <option value="Arsa Kat Karşılığı / Proje Geliştirme">Arsa Kat Karşılığı / Proje Geliştirme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-white/50 mb-1">
                    Mesajınız veya Sorularınız
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Bütçeniz, ilgilendiğiniz daire tipi veya sorularınız..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#b99881]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#b99881] hover:bg-[#d6beae] text-[#1b1917] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2 hover:scale-[1.01]"
                >
                  <Send size={15} />
                  <span>Bilgi ve Randevu Talebini Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
