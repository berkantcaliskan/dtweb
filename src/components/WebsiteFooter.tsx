import React from 'react'
import { COMPANY_INFO, PROJECTS_DATA } from '../data/websiteData'
import { ChevronUp, Phone, Mail, MapPin } from 'lucide-react'
import { DemirturkLogo } from './DemirturkLogo'

interface WebsiteFooterProps {
  onOpenReachUs?: () => void
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ onOpenReachUs }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1c2126]/90 backdrop-blur-md text-[#fffff1] border-t border-[#fffff1]/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#fffff1]/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <DemirturkLogo variant="dark-bg" emblemSize={60} isScrolled={true} />
            <p className="text-sm text-[#fffff1]/70 font-light leading-relaxed max-w-sm">
              2003 yılından bu yana Sakarya Karasu’da doğa ve mimariyi buluşturan güvenilir yaşam alanları inşa ediyor; temelden çatıya yapı malzemeleri tedariki sağlıyoruz.
            </p>
            <div className="text-xs sm:text-sm text-[#fffff1]/85 pt-2 font-medium">
              Banka Kredisiz — Elden Senet İmkânı
            </div>
            {/* Social & Portal Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={COMPANY_INFO.social?.instagram || 'https://www.instagram.com/demirturkinsaat'}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram: @demirturkinsaat"
                className="text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social?.sahibinden || 'https://karasudemirturk.sahibinden.com/'}
                target="_blank"
                rel="noreferrer"
                aria-label="Sahibinden.com"
                title="Sahibinden.com Mağazamız"
                className="text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer"
              >
                <svg viewBox="4.5 4.5 22 22" className="w-[20px] h-[20px] fill-current" aria-hidden="true">
                  <path d="M15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z"/>
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social?.hepsiemlak || 'https://www.hepsiemlak.com/emlak-ofisi/demirturk-yapi-insaat-sanayi-ve-ticaret-limited-si-159946'}
                target="_blank"
                rel="noreferrer"
                aria-label="Hepsiemlak"
                title="Hepsiemlak Mağazamız"
                className="text-[#fffff1]/80 hover:text-white transition-all hover:scale-110 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav: Projeler */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#fffff1] mb-4 font-semibold">
              PROJELER
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fffff1]/75 font-light">
              {PROJECTS_DATA.filter((p) => !p.hidden).slice(0, 5).map((p) => (
                <li key={p.id}>
                  <a href="#projeler" className="hover:text-white transition-colors">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav: Kurumsal & Sayfalar */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#fffff1] mb-4 font-semibold">
              SAYFALAR
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fffff1]/75 font-light">
              <li><a href="#projeler" className="hover:text-white transition-colors">Projeler</a></li>
              <li><a href="#odeme-modelleri" className="hover:text-white transition-colors">Ödeme Modelleri</a></li>
              <li><a href="#mimari-yaklasim" className="hover:text-white transition-colors">Mimari Yaklaşım</a></li>
              <li><a href="#yapi-malzemeleri" className="hover:text-white transition-colors">Yapı Malzemeleri</a></li>
              <li><a href="#makaleler" className="hover:text-white transition-colors">Makaleler</a></li>
              <li>
                <a
                  href="#iletisim"
                  onClick={(e) => {
                    if (onOpenReachUs) {
                      e.preventDefault()
                      onOpenReachUs()
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  İletişim & Kariyer
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: İletişim */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#fffff1] mb-4 font-semibold">
              MERKEZ OFİS
            </h4>
            <div className="space-y-2 text-sm text-[#fffff1]/75 font-light">
              <p className="leading-relaxed">{COMPANY_INFO.address}</p>
              <div className="pt-1 space-y-1">
                {COMPANY_INFO.phoneNumbers.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s+/g, '')}`}
                    className="text-[#fffff1]/90 hover:text-white block transition-colors"
                  >
                    {num}
                  </a>
                ))}
              </div>
              <p className="pt-1">{COMPANY_INFO.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#fffff1]/60 gap-4">
          <div>
            © 2003 - 2026 Demirtürk İnşaat San. ve Tic. Ltd. Şti. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-[#fffff1] cursor-pointer transition-colors">KVKK Aydınlatma Metni</span>
            <span className="hover:text-[#fffff1] cursor-pointer transition-colors">Çerez Politikası</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-[#fffff1]/70 hover:text-[#fffff1] transition-colors ml-4"
              aria-label="Yukarı çık"
            >
              <span>YUKARI</span>
              <ChevronUp size={14} className="text-[#fffff1]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
