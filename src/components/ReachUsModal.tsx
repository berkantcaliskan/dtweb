import React, { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, Briefcase, ArrowUpRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { submitLeadToPortfoy } from '../services/leadService'
import { useLanguage } from '../context/LanguageContext'
import { TRANSLATIONS } from '../data/translations'

interface ReachUsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReachUsModal: React.FC<ReachUsModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage()
  const isEn = language === 'EN'
  const t = TRANSLATIONS[language].contact

  const [activeTab, setActiveTab] = useState<'contact' | 'career'>('contact')

  // Contact Form State
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formSubject, setFormSubject] = useState(isEn ? 'General Inquiry & Sales' : 'Genel Bilgi & Satış')
  const [formMessage, setFormMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Career Form State
  const [careerName, setCareerName] = useState('')
  const [careerPhone, setCareerPhone] = useState('')
  const [careerEmail, setCareerEmail] = useState('')
  const [careerPosition, setCareerPosition] = useState(isEn ? 'Site Supervisor / Civil Engineer' : 'Şantiye Şefi / İnşaat Mühendisi')
  const [careerNote, setCareerNote] = useState('')
  const [careerSubmitted, setCareerSubmitted] = useState(false)

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return

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
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formPhone.trim()) return

    // 1. Portföy CRM sistemine aktar
    submitLeadToPortfoy({
      fullName: formName,
      phone: formPhone,
      formName: isEn ? 'Contact Us (Modal)' : 'Bize Ulaşın / İletişim',
      channel: isEn ? 'Website / Fullscreen Modal (EN)' : 'Web Sitesi / Tam Ekran İletişim Modalı',
      notes: `Subject: ${formSubject} | Message: ${formMessage || (isEn ? 'Inquiry via website' : 'Web sitesi üzerinden randevu/bilgi talebi')}`,
      tags: ['Web Sitesi', 'İletişim', formSubject],
    })

    // 2. WhatsApp ile doğrudan mesaj aç
    const text = encodeURIComponent(
      isEn
        ? `Hello Demirtürk Construction,\nSubject: ${formSubject}\nName: ${formName || 'Not specified'}\nPhone: ${formPhone}\nMessage: ${formMessage || 'Inquiry / appointment request via website'}`
        : `Merhaba Demirtürk İnşaat,\nKonu: ${formSubject}\nİsim: ${formName || 'Belirtilmedi'}\nTelefon: ${formPhone}\nMesaj: ${formMessage || 'Web sitesi üzerinden randevu/bilgi talebi'}`
    )
    const targetWhatsapp = formSubject.toLowerCase().includes('material') || formSubject.toLowerCase().includes('malzeme')
      ? COMPANY_INFO.materialsWhatsapp
      : COMPANY_INFO.whatsapp
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
      formName: isEn ? 'Career Application (Modal)' : 'Kariyer Başvurusu',
      channel: isEn ? 'Website / Fullscreen Career Modal (EN)' : 'Web Sitesi / Tam Ekran Kariyer Modalı',
      notes: `Position: ${careerPosition} | Cover Letter: ${careerNote || (isEn ? 'CV attached' : 'CV ektedir')}`,
      tags: ['Web Sitesi', 'Kariyer', careerPosition],
    })

    // 2. WhatsApp ile doğrudan mesaj aç
    const text = encodeURIComponent(
      isEn
        ? `Hello Demirtürk Construction Human Resources,\nCareer Application:\nPosition: ${careerPosition}\nName: ${careerName}\nPhone: ${careerPhone}\nEmail: ${careerEmail}\nCover Note / Experience: ${careerNote || 'CV attached'}`
        : `Merhaba Demirtürk İnşaat İnsan Kaynakları,\nKariyer Başvurusu:\nPozisyon: ${careerPosition}\nİsim: ${careerName}\nTelefon: ${careerPhone}\nE-posta: ${careerEmail}\nÖn Yazı / Deneyim: ${careerNote || 'CV ektedir'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setCareerSubmitted(true)
  }

  const openPositions = isEn
    ? [
        {
          title: 'Site Supervisor / Civil Engineer',
          type: 'Full Time',
          location: 'Karasu / Sakarya Construction Sites',
          desc: 'Minimum 5 years of on-site structural/finishing experience with solid quantity surveying and progress billing expertise.'
        },
        {
          title: 'Architect / Interior Architect & 3D Visualizer',
          type: 'Full Time / Hybrid',
          location: 'Karasu Head Office',
          desc: 'Experience in residential permit and construction drawings, proficiency in Lumion and 3ds Max rendering.'
        },
        {
          title: 'Real Estate & Property Sales Advisor',
          type: 'Full Time',
          location: 'Karasu Sales Office',
          desc: 'Strong client communication skills with proven track record in residential sales and in-house installment plans.'
        },
        {
          title: 'General Application & Architecture/Engineering Internship',
          type: 'Internship / Part-Time',
          location: 'Karasu / Sakarya',
          desc: 'Enthusiastic students in Civil Engineering or Architecture faculties eager to acquire rigorous field experience.'
        }
      ]
    : [
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

  const contactSubjects = isEn
    ? [
        'General Inquiry & Sales',
        'Asel Doga Evleri Inquiry',
        'Yeni Sehir Phases Inquiry',
        'In-House Installment Consultation',
        'Complimentary VIP Tour Reservation',
        'Building Materials & Wholesale Supply'
      ]
    : [
        'Genel Bilgi & Satış',
        'Asel Doğa Evleri Bilgi Talebi',
        'Yeni Şehir Etapları Bilgi Talebi',
        'Elden Senet Modeli Danışmanlığı',
        'Ücretsiz Tanıtım Turu Randevusu',
        'Yapı Malzemeleri & Toptan Tedarik'
      ]

  return (
    <div 
      className="fixed top-[44px] sm:top-[52px] inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] w-full animate-modal-backdrop flex flex-col"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Sticky Architectural Header with Back Button */}
      <header className="sticky top-0 z-40 w-full bg-[#1e242b]/95 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3 sm:py-3.5 flex items-center justify-between shadow-lg">
        {/* Left: Back Button & Title */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm cursor-pointer"
            aria-label={isEn ? 'Back to homepage' : 'Ana sayfaya geri dön'}
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{isEn ? 'Back' : 'Geri Dön'}</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-[#fffff1]/20" />

          <div className="hidden sm:block">
            <span className="text-[10px] tracking-widest text-[#fffff1]/60 uppercase block font-medium">
              {isEn ? 'CONTACT & HEADQUARTERS' : 'İLETİŞİM & MERKEZ OFİS'}
            </span>
            <h2 className="font-theSeasons text-lg font-bold text-[#fffff1] leading-tight">
              {t.title}
            </h2>
          </div>
        </div>

        {/* Right: Quick WhatsApp & Direct Call & Close Button */}
        <div className="flex items-center space-x-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
              isEn
                ? 'Hello Demirtürk Construction, I would like to get information regarding your developments.'
                : 'Merhaba Demirtürk İnşaat hakkında bilgi almak istiyorum.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            <span>{isEn ? 'WhatsApp Info' : 'WhatsApp Bilgi'}</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white/[0.08] hover:bg-white/[0.18] border border-[#fffff1]/20 text-[#fffff1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Phone size={14} />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] py-8 sm:py-16 w-full flex-1">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
              <span>{t.sectionTag}</span>
            </div>
            <h1 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-[#fffff1]/80 font-light max-w-2xl mt-2 leading-relaxed">
              {isEn
                ? 'Visit our Karasu central office to explore our architectural developments over coffee or connect directly with our specialized client advisors.'
                : 'Karasu merkez ofisimizde kahve eşliğinde projelerimizi inceleyebilir veya uzman satış danışmanlarımızla hemen iletişime geçebilirsiniz.'}
            </p>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1.5 sm:space-x-2 bg-white/5 p-1 rounded-xl sm:rounded-2xl border border-[#fffff1]/15">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm uppercase tracking-normal sm:tracking-wider transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-[#fffff1] text-[#252c33] font-semibold shadow-md border border-[#fffff1]'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/5'
              }`}
            >
              <span className="sm:hidden">{isEn ? 'Contact' : 'İletişim'}</span>
              <span className="hidden sm:inline">{isEn ? 'Contact Details' : 'Temel İletişim Bilgileri'}</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm uppercase tracking-normal sm:tracking-wider transition-all cursor-pointer ${
                activeTab === 'career'
                  ? 'bg-[#fffff1] text-[#252c33] font-semibold shadow-md border border-[#fffff1]'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/5'
              }`}
            >
              <span className="sm:hidden">{isEn ? 'Careers' : 'Kariyer'}</span>
              <span className="hidden sm:inline">{isEn ? 'Careers & HR' : 'Kariyer & İK'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TEMEL İLETİŞİM BİLGİLERİ */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Column: Contact Info & Office Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6 shadow-xl">
                <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1] pb-3 border-b border-[#fffff1]/10">
                  {t.headOffice}
                </h3>

                <div className="space-y-5 text-sm font-light">
                  {/* Address */}
                  <div className="flex items-start space-x-3.5">
                    <MapPin size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">{t.address}</span>
                      <span className="text-[#fffff1]/95 text-sm sm:text-base leading-relaxed block">{COMPANY_INFO.address}</span>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start space-x-3.5">
                    <Phone size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-1">{t.phoneNumbers}</span>
                      <div className="space-y-1.5">
                        {COMPANY_INFO.phoneNumbers.map((num) => (
                          <a
                            key={num}
                            href={`tel:${num.replace(/\s+/g, '')}`}
                            className="text-[#fffff1]/95 hover:text-white block text-sm sm:text-base font-medium transition-colors tracking-wide"
                          >
                            {num}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* E-Mail */}
                  <div className="flex items-start space-x-3.5">
                    <Mail size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">{t.email}</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#fffff1]/95 text-sm sm:text-base hover:text-white block">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Visiting Hours */}
                  <div className="flex items-start space-x-3.5">
                    <Clock size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="text-xs uppercase text-[#fffff1]/60">{t.visitHours}</span>
                        <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 rounded-full">
                          {t.everyDayOpen}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-[#fffff1]/90 font-light">
                        <p>{isEn ? 'Weekdays: 9:00 AM – 8:00 PM' : COMPANY_INFO.workingHoursWeekday}</p>
                        <p>{isEn ? 'Weekends: 9:00 AM – 9:00 PM' : COMPANY_INFO.workingHoursWeekend}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="pt-4 border-t border-[#fffff1]/10">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                      isEn
                        ? 'Hello Demirtürk Construction, I would like to get information regarding your developments.'
                        : 'Merhaba Demirtürk İnşaat hakkında bilgi almak istiyorum.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <MessageSquare size={16} />
                    <span>{t.liveSupport}</span>
                  </a>
                </div>
              </div>

              {/* Interactive Google Map */}
              <div className="rounded-2xl overflow-hidden border border-[#fffff1]/10 aspect-[16/9] bg-[#313941] relative group shadow-xl">
                {/* Company Name & Location Badge */}
                <div className="absolute top-3 left-3 z-10 bg-[#1c2126]/90 border border-[#fffff1]/20 backdrop-blur-md px-3 py-2 rounded-xl flex items-center space-x-2.5 shadow-lg pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#fffff1] block leading-tight">{isEn ? 'Demirtürk Construction' : 'Demirtürk İnşaat'}</span>
                    <span className="text-[10px] text-[#fffff1]/70 block leading-tight">Doğu Karadeniz Cd. No:1, Aziziye</span>
                  </div>
                </div>

                <iframe
                  title={isEn ? "Demirtürk Construction - Karasu Head Office Map" : "Demirtürk İnşaat - Karasu Merkez Ofis Harita"}
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
                  <span>{isEn ? 'Open in Maps' : 'Haritada Aç'}</span>
                  <ArrowUpRight size={14} className="text-[#fffff1]/80" />
                </a>
              </div>
            </div>

            {/* Right Column: Message & Appointment Form (7 Cols) - Unboxed */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs tracking-widest text-[#fffff1]/80 uppercase block font-medium">
                  {t.reqTitle}
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                  {t.reqSubtitle}
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  {t.reqDesc}
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check size={20} />
                    <span className="font-semibold text-base">{t.successTitle}</span>
                  </div>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">
                    {t.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        placeholder={t.fullName}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        {t.phone} <span className="text-[#fffff1]/70">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="05..."
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      {t.subject}
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      style={{ colorScheme: 'dark' }}
                      className="w-full px-4 py-3 bg-[#1e242b] border border-[#fffff1]/20 rounded-lg text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50 cursor-pointer"
                    >
                      {contactSubjects.map((sub, idx) => (
                        <option key={idx} value={sub} className="bg-[#1e242b] text-[#fffff1] py-2">
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      {t.message}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t.messagePlaceholder}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                  >
                    <Send size={16} />
                    <span>{t.sendBtn}</span>
                  </button>

                  <p className="text-xs text-center text-[#fffff1]/50 pt-2">
                    {isEn
                      ? 'Your inquiry is routed directly to our designated client representative on WhatsApp.'
                      : 'Formu ilettiğinizde talebiniz doğrudan yetkili müşteri temsilcimizin WhatsApp hattına yönlendirilir.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: KARİYER & İK */}
        {activeTab === 'career' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Open Positions List (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 shadow-xl">
                <div className="flex items-center space-x-2 text-xs tracking-widest text-[#fffff1]/80 uppercase mb-1">
                  <Briefcase size={14} className="text-[#fffff1]" />
                  <span>{isEn ? 'Open Positions' : 'Açık Pozisyonlar'}</span>
                </div>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  {isEn ? 'Join the Demirtürk Team' : 'Demirtürk Ailesine Katılın'}
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  {isEn
                    ? 'For over 20 years, we have built enduring landmarks in Sakarya Karasu. Review our open vacancies to join our multidisciplinary team.'
                    : '20 yılı aşkın süredir Sakarya ve Karasu’da nitelikli yapılar inşa ediyoruz. Güçlü ekibimize katılmak için açık pozisyonlarımızı inceleyebilirsiniz.'}
                </p>
              </div>

              <div className="space-y-3">
                {openPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCareerPosition(pos.title)}
                    className={`p-5 rounded-xl bg-transparent backdrop-blur-sm border transition-all space-y-2 group shadow-md cursor-pointer ${
                      careerPosition === pos.title
                        ? 'bg-white/10 border-[#fffff1]'
                        : 'border-[#fffff1]/15 hover:border-[#fffff1]/35'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-[#fffff1] group-hover:text-white">
                        {pos.title}
                      </h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#fffff1]/80 border border-[#fffff1]/10">
                        {pos.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-[#fffff1]/60">
                      <MapPin size={13} />
                      <span>{pos.location}</span>
                    </div>
                    <p className="text-sm text-[#fffff1]/80 font-light leading-relaxed">
                      {pos.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Application Form (6 Cols) */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6 shadow-xl">
              <div>
                <span className="text-xs tracking-widest text-[#fffff1]/80 uppercase block font-medium">
                  {isEn ? 'APPLICATION FORM' : 'BAŞVURU FORMU'}
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                  {isEn ? 'Submit Your Resume' : 'Özgeçmişinizi İletin'}
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  {isEn
                    ? 'Please fill in your details to submit your resume directly to our Human Resources division.'
                    : 'Bilgilerinizi doldurarak İnsan Kaynakları birimimize başvuruda bulunabilirsiniz.'}
                </p>
              </div>

              {careerSubmitted ? (
                <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check size={20} />
                    <span className="font-semibold text-base">{isEn ? 'Application Received!' : 'Başvurunuz Alındı!'}</span>
                  </div>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">
                    {isEn
                      ? 'Your resume has been forwarded to our HR team. We will contact you once a suitable vacancy opens.'
                      : 'Kariyer başvurunuz İK departmanımıza yönlendirildi. Özgeçmişiniz değerlendirilerek uygun pozisyonlar için sizinle irtibata geçilecektir.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      {t.fullName} <span className="text-[#fffff1]/70">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t.fullName}
                      value={careerName}
                      onChange={(e) => setCareerName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        {t.phone} <span className="text-[#fffff1]/70">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="05..."
                        value={careerPhone}
                        onChange={(e) => setCareerPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={careerEmail}
                        onChange={(e) => setCareerEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      {isEn ? 'Applied Position' : 'Başvurulan Pozisyon'}
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

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      {isEn ? 'Experience Summary & Remarks' : 'Deneyim Özeti & Ek Notlar'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={isEn ? 'Briefly describe your education, work experience, or CV summary...' : "Eğitiminiz, tecrübeleriniz veya CV'niz hakkında kısaca bilgi verin..."}
                      value={careerNote}
                      onChange={(e) => setCareerNote(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                  >
                    <Send size={16} />
                    <span>{isEn ? 'Submit Application (HR WhatsApp)' : 'Başvuruyu İlet (İK WhatsApp)'}</span>
                  </button>

                  <p className="text-xs text-center text-[#fffff1]/50 pt-2">
                    {isEn
                      ? 'Applicant data is kept strictly confidential in accordance with data privacy regulations and processed solely for recruitment purposes.'
                      : 'Aday bilgileriniz 6698 sayılı KVKK kapsamında gizli tutulmakta ve sadece istihdam amacıyla değerlendirilmektedir.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Bottom Footer */}
      <footer className="w-full border-t border-[#fffff1]/10 py-6 px-4 sm:px-6 lg:px-[104px] bg-[#1c2126]/60 text-center text-xs text-[#fffff1]/50">
        <p>
          {isEn
            ? '© 2003 - 2026 Demirtürk İnşaat Co. Ltd. — All rights reserved.'
            : '© 2003 - 2026 Demirtürk İnşaat San. ve Tic. Ltd. Şti. — Tüm hakları saklıdır.'}
        </p>
      </footer>
    </div>
  )
}
