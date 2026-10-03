import React, { useState, useEffect } from 'react'
import { ArrowLeft, X, MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, Briefcase, GraduationCap, Users, ArrowUpRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'

interface ReachUsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReachUsModal: React.FC<ReachUsModalProps> = ({ isOpen, onClose }) => {
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

    const text = encodeURIComponent(
      `Merhaba Demirtürk İnşaat,\nKonu: ${formSubject}\nİsim: ${formName || 'Belirtilmedi'}\nTelefon: ${formPhone}\nMesaj: ${formMessage || 'Web sitesi üzerinden randevu/bilgi talebi'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, '_blank')
    setContactSubmitted(true)
  }

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!careerPhone.trim()) return

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
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#252c33]/85 backdrop-blur-2xl text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] min-h-screen w-full animate-modal-backdrop flex flex-col"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Top Sticky Architectural Header with Back Button */}
      <header className="sticky top-0 z-40 w-full bg-[#1e242b]/80 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3.5 flex items-center justify-between shadow-lg">
        {/* Left: Back Button & Title */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm cursor-pointer"
            aria-label="Ana sayfaya geri dön"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
            <span className="text-xs font-bold uppercase tracking-wider">Geri Dön</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-[#fffff1]/20" />

          <div className="hidden sm:block">
            <span className="text-[10px] tracking-widest text-[#fffff1]/60 uppercase block font-medium">
              İLETİŞİM & MERKEZ OFİS
            </span>
            <h2 className="font-theSeasons text-lg font-bold text-[#fffff1] leading-tight">
              Bize Ulaşın
            </h2>
          </div>
        </div>

        {/* Right: Quick WhatsApp & Direct Call & Close Button */}
        <div className="flex items-center space-x-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20Demirt%C3%BCrk%20%C4%B0n%C5%9Faat%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            <span>WhatsApp Bilgi</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white/[0.08] hover:bg-white/[0.18] border border-[#fffff1]/20 text-[#fffff1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Phone size={14} />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/20 text-[#fffff1] border border-[#fffff1]/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Pencereyi Kapat"
            title="Kapat"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px] py-10 sm:py-16 w-full flex-1">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
              <span>İLETİŞİM & KARİYER / REACH US</span>
            </div>
            <h1 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              Bize Ulaşın
            </h1>
            <p className="text-sm sm:text-base text-[#fffff1]/80 font-light max-w-2xl mt-2 leading-relaxed">
              Karasu merkez ofisimizde kahve eşliğinde projelerimizi inceleyebilir veya uzman satış danışmanlarımızla hemen iletişime geçebilirsiniz.
            </p>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-white/5 p-1 rounded-xl border border-[#fffff1]/15">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-white/10 text-[#fffff1] font-medium shadow-md border border-[#fffff1]/30'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1]'
              }`}
            >
              Temel İletişim Bilgileri
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'career'
                  ? 'bg-white/10 text-[#fffff1] font-medium shadow-md border border-[#fffff1]/30'
                  : 'text-[#fffff1]/70 hover:text-[#fffff1]'
              }`}
            >
              Kariyer & İK
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
                  Karasu Merkez Ofis
                </h3>

                <div className="space-y-5 text-sm font-light">
                  {/* Adres */}
                  <div className="flex items-start space-x-3.5">
                    <MapPin size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">Adres</span>
                      <span className="text-[#fffff1]/95 text-sm sm:text-base leading-relaxed block">{COMPANY_INFO.address}</span>
                    </div>
                  </div>

                  {/* İletişim Numaraları (Hiçbirinde GSM/Ofis yazmıyor) */}
                  <div className="flex items-start space-x-3.5">
                    <Phone size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-1">İletişim Numaraları</span>
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

                  {/* E-Posta */}
                  <div className="flex items-start space-x-3.5">
                    <Mail size={20} className="text-[#fffff1]/90 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase text-[#fffff1]/60 mb-0.5">E-Posta</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#fffff1]/95 text-sm sm:text-base hover:text-white block">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Ziyaret Saatleri (Her gün açığız badge) */}
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

              {/* Interactive Google Map */}
              <div className="rounded-2xl overflow-hidden border border-[#fffff1]/10 aspect-[16/9] bg-[#313941] relative group shadow-xl">
                <iframe
                  title="Demirtürk İnşaat - Ata Sahil Sitesi Harita"
                  src="https://maps.google.com/maps?q=Do%C4%9Fu+Karadeniz+Cd.+Ata+Sahil+Sitesi+No+1+Karasu+Sakarya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Do%C4%9Fu+Karadeniz+Cd.+Ata+Sahil+Sitesi+No+1+Karasu+Sakarya"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 text-xs bg-[#313941]/90 hover:bg-[#313941] text-[#fffff1] px-3.5 py-2 rounded-lg border border-[#fffff1]/20 backdrop-blur-md flex items-center space-x-1.5 transition-all shadow-md group-hover:border-[#fffff1]/40"
                >
                  <span>Haritada Aç</span>
                  <ArrowUpRight size={14} className="text-[#fffff1]/80" />
                </a>
              </div>
            </div>

            {/* Right Column: Message & Appointment Form (7 Cols) */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 space-y-6 shadow-xl">
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
                      İlgilendiğiniz Konu
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50"
                    >
                      <option value="Genel Bilgi & Satış" className="bg-[#252c33] text-[#fffff1]">Genel Bilgi & Satış</option>
                      <option value="Asel Doğa Evleri Bilgi Talebi" className="bg-[#252c33] text-[#fffff1]">Asel Doğa Evleri Bilgi Talebi</option>
                      <option value="Yeni Şehir Rezidans Bilgi Talebi" className="bg-[#252c33] text-[#fffff1]">Yeni Şehir Rezidans Bilgi Talebi</option>
                      <option value="Elden Senet Modeli Danışmanlığı" className="bg-[#252c33] text-[#fffff1]">Elden Senet Modeli Danışmanlığı</option>
                      <option value="Ücretsiz Tanıtım Turu Randevusu" className="bg-[#252c33] text-[#fffff1]">Ücretsiz Tanıtım Turu Randevusu</option>
                      <option value="Yapı Malzemeleri & Toptan Tedarik" className="bg-[#252c33] text-[#fffff1]">Yapı Malzemeleri & Toptan Tedarik</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Mesajınız / Notunuz
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Görüşmek istediğiniz gün, saat veya merak ettiğiniz detayları buraya yazabilirsiniz..."
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
                    <span>Mesajı Gönder (WhatsApp ile İlet)</span>
                  </button>

                  <p className="text-xs text-center text-[#fffff1]/50 pt-2">
                    Formu ilettiğinizde talebiniz doğrudan yetkili müşteri temsilcimizin WhatsApp hattına yönlendirilir.
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
                  <span>Açık Pozisyonlar</span>
                </div>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  Demirtürk Ailesine Katılın
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  20 yılı aşkın süredir Sakarya ve Karasu’da nitelikli yapılar inşa ediyoruz. Güçlü ekibimize katılmak için açık pozisyonlarımızı inceleyebilirsiniz.
                </p>
              </div>

              <div className="space-y-3">
                {openPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 transition-all space-y-2 group shadow-md"
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
                  BAŞVURU FORMU
                </span>
                <h3 className="font-theSeasons text-3xl font-bold text-[#fffff1] mt-1">
                  Özgeçmişinizi İletin
                </h3>
                <p className="text-sm text-[#fffff1]/75 font-light mt-1">
                  Bilgilerinizi doldurarak İnsan Kaynakları birimimize başvuruda bulunabilirsiniz.
                </p>
              </div>

              {careerSubmitted ? (
                <div className="p-6 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check size={20} />
                    <span className="font-semibold text-base">Başvurunuz Alındı!</span>
                  </div>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">
                    Kariyer başvurunuz İK departmanımıza yönlendirildi. Özgeçmişiniz değerlendirilerek uygun pozisyonlar için sizinle irtibata geçilecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Başvurulan Pozisyon
                    </label>
                    <select
                      value={careerPosition}
                      onChange={(e) => setCareerPosition(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-[#fffff1]/15 rounded-lg text-sm text-[#fffff1] focus:outline-none focus:border-[#fffff1]/50"
                    >
                      <option value="Şantiye Şefi / İnşaat Mühendisi" className="bg-[#252c33] text-[#fffff1]">Şantiye Şefi / İnşaat Mühendisi</option>
                      <option value="Mimar / İç Mimar & 3D Görselleştirme" className="bg-[#252c33] text-[#fffff1]">Mimar / İç Mimar & 3D Görselleştirme</option>
                      <option value="Gayrimenkul & Konut Satış Danışmanı" className="bg-[#252c33] text-[#fffff1]">Gayrimenkul & Konut Satış Danışmanı</option>
                      <option value="Muhasebe & Finans Uzmanı" className="bg-[#252c33] text-[#fffff1]">Muhasebe & Finans Uzmanı</option>
                      <option value="Genel Başvuru & Mimarlık/Mühendislik Stajı" className="bg-[#252c33] text-[#fffff1]">Genel Başvuru & Mimarlık/Mühendislik Stajı</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#fffff1]/60 mb-1">
                      Deneyim Özeti & Ek Notlar
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Eğitiminiz, tecrübeleriniz veya CV'niz hakkında kısaca bilgi verin..."
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
                    <span>Başvuruyu İlet (İK WhatsApp)</span>
                  </button>

                  <p className="text-xs text-center text-[#fffff1]/50 pt-2">
                    Aday bilgileriniz 6698 sayılı KVKK kapsamında gizli tutulmakta ve sadece istihdam amacıyla değerlendirilmektedir.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Bottom Footer */}
      <footer className="w-full border-t border-[#fffff1]/10 py-6 px-4 sm:px-6 lg:px-[104px] bg-[#1c2126]/60 text-center text-xs text-[#fffff1]/50">
        <p>© 2003 - 2026 Demirtürk İnşaat San. ve Tic. Ltd. Şti. — Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
