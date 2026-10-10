import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, Briefcase, GraduationCap, Users, ArrowUpRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { submitLeadToPortfoy } from '../services/leadService'

export const ReachUsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'career'>('contact')

  // Contact Form State
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formSubject, setFormSubject] = useState('Genel Bilgi & Satış')
  const [formMessage, setFormMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Career Form State
  const [careerName, setCareerName] = useState('')
  const [careerPhone, setCareerPhone] = useState('')
  const [careerEmail, setCareerEmail] = useState('')
  const [careerPosition, setCareerPosition] = useState('Şantiye Şefi / İnşaat Mühendisi')
  const [careerNote, setCareerNote] = useState('')
  const [careerSubmitted, setCareerSubmitted] = useState(false)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formPhone.trim()) return

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: formName,
      phone: formPhone,
      formName: 'Bize Ulaşın / İletişim',
      channel: 'Web Sitesi / İletişim Bölümü',
      notes: `Konu: ${formSubject} | Mesaj: ${formMessage || 'Web sitesi üzerinden randevu/bilgi talebi'}`,
      tags: ['Web Sitesi', 'İletişim', formSubject],
    })

    // 2. WhatsApp ile doğrudan mesaj aç
    const text = encodeURIComponent(
      `Merhaba Demirtürk İnşaat,\nKonu: ${formSubject}\nİsim: ${formName || 'Belirtilmedi'}\nTelefon: ${formPhone}\nMesaj: ${formMessage || 'Web sitesi üzerinden randevu/bilgi talebi'}`
    )
    const targetWhatsapp = formSubject.includes('Malzeme') ? COMPANY_INFO.materialsWhatsapp : COMPANY_INFO.whatsapp
    window.open(`https://wa.me/${targetWhatsapp}?text=${text}`, '_blank')
    setContactSubmitted(true)
  }

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!careerPhone.trim()) return

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: careerName,
      phone: careerPhone,
      email: careerEmail,
      formName: 'Kariyer Başvurusu',
      channel: 'Web Sitesi / Kariyer Bölümü',
      notes: `Pozisyon: ${careerPosition} | Ön Yazı: ${careerNote || 'CV ektedir'}`,
      tags: ['Web Sitesi', 'Kariyer', careerPosition],
    })

    // 2. WhatsApp ile doğrudan mesaj aç
    const text = encodeURIComponent(
      `Merhaba Demirtürk İnşaat İnsan Kaynakları,\nKariyer Başvurusu:\nPozisyon: ${careerPosition}\nİsim: ${careerName}\nTelefon: ${careerPhone}\nE-posta: ${careerEmail}\nÖn Yazı / Deneyim: ${careerNote || 'CV ektedir'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setCareerSubmitted(true)
  }

  const openPositions = [
    {
      title: 'Şantiye Şefi / İnşaat Mühendisi',
      type: 'Tam Zamanlı',
      location: 'Karasu / Sakarya Şantiyeleri',
      desc: 'En az 5 yıl şantiye ve kaba/ince yapı tecrübesi olan, metraj ve hakediş konularına hakim.'
    },
    {
      title: 'Mimar / İç Mimar & 3D Görselleştirme',
      type: 'Tam Zamanlı / Hibrit',
      location: 'Karasu Merkez Ofis',
      desc: 'Konut projelerinde ruhsat ve uygulama projesi çizimi, Lumion/3ds Max render yetkinliği.'
    },
    {
      title: 'Gayrimenkul & Konut Satış Danışmanı',
      type: 'Tam Zamanlı',
      location: 'Karasu Satış Ofisi',
      desc: 'Müşteri iletişimi kuvvetli, portföy yönetimi ve senetli konut satışı süreçlerinde deneyimli.'
    },
    {
      title: 'Genel Başvuru & Mimarlık/Mühendislik Stajı',
      type: 'Staj / Yarı Zamanlı',
      location: 'Karasu / Sakarya',
      desc: 'İnşaat Mühendisliği veya Mimarlık fakültelerinde öğrenim gören, sahayı tanımak isteyen adaylar.'
    }
  ]

  return (
    <section id="iletisim" className="py-10 sm:py-16 md:py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative">
      {/* Anchor for backward compatibility with #ulasin */}
      <div id="ulasin" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5 sm:mb-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
              <span>İLETİŞİM & KARİYER / CONTACT & CAREERS</span>
            </div>
            <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              İletişim & Merkez Ofis
            </h2>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1.5 sm:space-x-2 bg-white/5 p-1 rounded-xl sm:rounded-2xl border border-[#fffff1]/15">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs uppercase tracking-normal sm:tracking-wider transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-[#fffff1] text-[#252c33] font-semibold shadow-md border border-[#fffff1]'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/5'
              }`}
            >
              <span className="sm:hidden">İletişim</span>
              <span className="hidden sm:inline">Temel İletişim Bilgileri</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs uppercase tracking-normal sm:tracking-wider transition-all cursor-pointer ${
                activeTab === 'career'
                  ? 'bg-[#fffff1] text-[#252c33] font-semibold shadow-md border border-[#fffff1]'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/5'
              }`}
            >
              <span className="sm:hidden">Kariyer</span>
              <span className="hidden sm:inline">Kariyer & İK</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: TEMEL İLETİŞİM BİLGİLERİ                                 */}
        {/* ============================================================== */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Contact Information & Office Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6">
                <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1] pb-3 border-b border-[#fffff1]/10">
                  Karasu Merkez Ofis
                </h3>

                <div className="space-y-5 text-sm font-light">
                  <div className="flex items-start space-x-3.5">
                    <MapPin size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">Adres</span>
                      <span className="text-[#fffff1]/95 text-sm sm:text-base leading-relaxed block">{COMPANY_INFO.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Phone size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-1">İletişim Numaraları</span>
                      <div className="space-y-1.5">
                        {COMPANY_INFO.phoneNumbers.map((num) => (
                          <a
                            key={num}
                            href={`tel:${num.replace(/\s+/g, '')}`}
                            className="text-[#fffff1]/95 hover:text-white block text-sm sm:text-base font-medium transition-colors"
                          >
                            {num}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">E-Posta</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#fffff1]/95 text-sm sm:text-base hover:text-white block">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Clock size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="text-xs uppercase text-[#fffff1]/60">Ziyaret Saatleri</span>
                        <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 rounded-full">
                          Her gün açığız
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-[#fffff1]/90 font-light">
                        <p>{COMPANY_INFO.workingHoursWeekday}</p>
                        <p>{COMPANY_INFO.workingHoursWeekend}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="pt-4 border-t border-[#fffff1]/10">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20Demirt%C3%BCrk%20%C4%B0n%C5%9Faat%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Canlı Destek</span>
                  </a>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="rounded-2xl overflow-hidden border border-[#fffff1]/10 aspect-[16/9] bg-[#313941] relative group">
                {/* Company Name & Location Badge */}
                <div className="absolute top-3 left-3 z-10 bg-[#1c2126]/90 border border-[#fffff1]/20 backdrop-blur-md px-3 py-2 rounded-xl flex items-center space-x-2.5 shadow-lg pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#fffff1] block leading-tight">Demirtürk İnşaat</span>
                    <span className="text-[10px] text-[#fffff1]/70 block leading-tight">Doğu Karadeniz Cd. No:1, Aziziye</span>
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
                <a
                  href="https://www.google.com/maps/search/?api=1&query=41.100494,30.718688"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 text-xs bg-[#313941]/90 hover:bg-[#313941] text-[#fffff1] px-3.5 py-2 rounded-lg border border-[#fffff1]/20 backdrop-blur-md flex items-center space-x-1.5 transition-all shadow-md group-hover:border-[#fffff1]/40"
                >
                  <span>Haritada Aç</span>
                  <ArrowUpRight size={14} className="text-[#fffff1]/80" />
                </a>
              </div>
            </div>

            {/* Message & Appointment Form (7 Cols) - Unboxed */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs tracking-widest text-[#fffff1]/80 uppercase block font-medium">
                  RANDEVU & BİLGİ TALEBİ
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                  Bize Mesaj Gönderin
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  Satış danışmanlarımızın en kısa sürede sizinle iletişime geçmesi için bilgilerinizi bırakın.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check size={20} />
                    <span className="font-semibold text-base">Talebiniz Alındı!</span>
                  </div>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">
                    Mesajınız müşteri ilişkileri birimimize iletildi. En kısa sürede geri dönüş yapılacaktır.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        Adınız Soyadınız
                      </label>
                      <input
                        type="text"
                        placeholder="Adınız Soyadınız"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        Telefon Numaranız <span className="text-[#fffff1]/70">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="05xx xxx xx xx"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Görüşmek İstediğiniz Konu
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      style={{ colorScheme: 'dark' }}
                      className="w-full px-4 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-lg text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 cursor-pointer"
                    >
                      <option value="Satılık Daireler & Siteler" className="bg-[#1e242b] text-[#fffff1] py-2">Satılık Daireler & Siteler</option>
                      <option value="Müstakil Villalar" className="bg-[#1e242b] text-[#fffff1] py-2">Müstakil Villalar</option>
                      <option value="Elden Senetli Ödeme Planı" className="bg-[#1e242b] text-[#fffff1] py-2">Elden Senetli Ödeme Planı</option>
                      <option value="İnşaat Malzemeleri & Toptan Tedarik" className="bg-[#1e242b] text-[#fffff1] py-2">İnşaat Malzemeleri & Toptan Tedarik</option>
                      <option value="Arsa Kat Karşılığı / Proje Geliştirme" className="bg-[#1e242b] text-[#fffff1] py-2">Arsa Kat Karşılığı / Proje Geliştirme</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Mesajınız
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Bütçeniz, ilgilendiğiniz proje veya sormak istedikleriniz..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 hover:scale-[1.01] cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Bilgi ve Randevu Talebini Gönder</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: KARİYER & İNSAN KAYNAKLARI                               */}
        {/* ============================================================== */}
        {activeTab === 'career' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Open Positions List (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="mb-6">
                <span className="text-xs tracking-widest text-[#fffff1]/80 uppercase block mb-1 font-medium">
                  DEMİRTÜRK EKİBİNE KATILIN
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1]">
                  Açık Pozisyonlar
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  Karasu’da geleceğin sahil mimarisini inşa eden dinamik ve tecrübeli ekibimizin bir parçası olun.
                </p>
              </div>

              <div className="space-y-3">
                {openPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCareerPosition(pos.title)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      careerPosition === pos.title
                        ? 'bg-white/10 border-[#fffff1] shadow-lg'
                        : 'bg-transparent backdrop-blur-sm border-[#fffff1]/15 hover:border-[#fffff1]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-theSeasons text-xl font-semibold text-[#fffff1]">
                         {pos.title}
                      </h4>
                      <span className="px-2.5 py-1 text-xs uppercase bg-[#fffff1]/15 text-[#fffff1] border border-[#fffff1]/20 rounded font-medium">
                        {pos.type}
                      </span>
                    </div>
                    <div className="text-xs text-[#fffff1]/70 mb-2 font-medium">
                      {pos.location}
                    </div>
                    <p className="text-sm text-[#fffff1]/80 font-light leading-relaxed">
                      {pos.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Job Application Form (6 Cols) */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6">
              <div>
                <span className="text-xs tracking-widest text-[#fffff1]/80 uppercase block font-medium">
                  İŞ BAŞVURU FORMU
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                  Özgeçmişinizi İletin
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  Başvurunuz doğrudan İnsan Kaynakları birimimiz tarafından değerlendirilecektir.
                </p>
              </div>

              {careerSubmitted ? (
                <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check size={20} />
                    <span className="font-semibold text-base">Başvurunuz Alındı!</span>
                  </div>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">
                    Kariyer başvurunuz Demirtürk İK birimine iletildi. Nitelikleriniz açık pozisyonla eşleştiğinde sizinle mülakat planlaması için iletişime geçilecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Başvurulan Pozisyon
                    </label>
                    <select
                      value={careerPosition}
                      onChange={(e) => setCareerPosition(e.target.value)}
                      style={{ colorScheme: 'dark' }}
                      className="w-full px-4 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-lg text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 cursor-pointer"
                    >
                      {openPositions.map((p, i) => (
                        <option key={i} value={p.title} className="bg-[#1e242b] text-[#fffff1] py-2">
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        Adınız Soyadınız <span className="text-[#fffff1]/70">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Adınız Soyadınız"
                        value={careerName}
                        onChange={(e) => setCareerName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        Telefon Numaranız <span className="text-[#fffff1]/70">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="05xx xxx xx xx"
                        value={careerPhone}
                        onChange={(e) => setCareerPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      placeholder="ornek@domain.com"
                      value={careerEmail}
                      onChange={(e) => setCareerEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Eğitim, Deneyim ve Ön Yazı
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mezun olduğunuz okul, toplam deneyim süreniz veya belirtmek istediğiniz notlar..."
                      value={careerNote}
                      onChange={(e) => setCareerNote(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Briefcase size={16} />
                    <span>Başvuruyu İlet</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
