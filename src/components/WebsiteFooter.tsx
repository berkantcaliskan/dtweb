import React from 'react'
import { COMPANY_INFO, PROJECTS_DATA } from '../data/websiteData'
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react'
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
            <DemirturkLogo variant="dark-bg" emblemSize={42} />
            <p className="text-sm text-[#fffff1]/70 font-light leading-relaxed max-w-sm">
              2003 yılından bu yana Sakarya Karasu’da doğa ve mimariyi buluşturan güvenilir yaşam alanları inşa ediyor; temelden çatıya yapı malzemeleri tedariki sağlıyoruz.
            </p>
            <div className="text-xs sm:text-sm text-[#fffff1]/85 pt-2 font-medium">
              Banka Kredisiz — Elden Senet İmkânı
            </div>
          </div>

          {/* Nav: Projeler */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#fffff1] mb-4 font-semibold">
              PROJELER
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fffff1]/75 font-light">
              {PROJECTS_DATA.slice(0, 5).map((p) => (
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
              <li><a href="#mimari-yaklasim" className="hover:text-white transition-colors">Mimari Yaklaşım</a></li>
              <li><a href="#yapi-malzemeleri" className="hover:text-white transition-colors">Yapı Malzemeleri</a></li>
              <li><a href="#makaleler" className="hover:text-white transition-colors">Makaleler</a></li>
              <li><a href="#insa-surecleri" className="hover:text-white transition-colors">İnşa Süreçleri</a></li>
              <li>
                <a
                  href="#ulasin"
                  onClick={(e) => {
                    if (onOpenReachUs) {
                      e.preventDefault()
                      onOpenReachUs()
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ulaşın (İletişim & Kariyer)
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
              <ArrowUp size={12} className="text-[#fffff1]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
