import React, { useState, useEffect } from 'react'
import { Menu, X, Phone, MessageSquare, ArrowUpRight, ShieldCheck, Compass } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { DemirturkLogo } from './DemirturkLogo'

interface WebsiteNavbarProps {
  activeSection?: string
  onOpenTour?: () => void
}

export const WebsiteNavbar: React.FC<WebsiteNavbarProps> = ({ onOpenTour }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'PROJELER', href: '#projeler' },
    { label: 'MİMARİ YAKLAŞIM', href: '#mimari-yaklasim' },
    { label: 'YAPI MALZEMELERİ', href: '#yapi-malzemeleri' },
    { label: 'MAKALELER', href: '#makaleler' },
    { label: 'İNŞA SÜREÇLERİ', href: '#insa-surecleri' },
    { label: 'ULAŞIN', href: '#ulasin' },
  ]

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const topOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#252c33]/92 backdrop-blur-xl border-b border-[#fffff1]/[0.08] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#1c2126]/90 via-[#252c33]/40 to-transparent py-5'
        }`}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Demirtürk Logo */}
          <div className="flex items-center flex-shrink-0 z-10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex-shrink-0 translate-y-[2.5px]"
            >
              <DemirturkLogo variant="dark-bg" emblemSize={36} />
            </a>
          </div>

          {/* Center: Pages / Navigation Links (Centered horizontally on the screen) */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6 absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-[11px] xl:text-[12px] tracking-[0.12em] xl:tracking-[0.16em] font-medium text-[#fffff1]/80 hover:text-[#fffff1] transition-colors relative py-1 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#fffff1] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Phone + Free Tour CTA Button & Mobile Trigger */}
          <div className="flex items-center space-x-3 xl:space-x-4 flex-shrink-0 z-10">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3 xl:space-x-4">
              {/* Direct Phone */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-xs text-[#fffff1]/85 hover:text-[#fffff1] flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-[#fffff1]/10 hover:border-[#fffff1]/20 transition-all whitespace-nowrap"
              >
                <Phone size={13} className="text-[#fffff1] flex-shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              {/* Free Tour CTA Button on Right (Signature Glass Blur) */}
              <button
                onClick={() => {
                  if (onOpenTour) onOpenTour()
                  else scrollTo('#tanitim-turu')
                }}
                className="glass-blur-box text-xs font-semibold tracking-wider uppercase px-4 py-2.5 text-[#fffff1] rounded-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-1.5 whitespace-nowrap hover:border-[#fffff1]/40"
              >
                <span>Ücretsiz Tanıtım Turu</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#fffff1]/90 hover:text-[#fffff1] focus:outline-none"
                aria-label="Menüyü aç/kapat"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Architectural full-screen overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#252c33]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden animate-mobile-drawer">
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#fffff1] border-b border-[#fffff1]/10 pb-2">
              MENÜ & BÖLÜMLER
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-lg font-theSeasons font-semibold tracking-wider text-[#fffff1]/90 hover:text-[#fffff1] transition-colors py-1 flex items-center justify-between border-b border-[#fffff1]/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} className="text-[#fffff1]/60" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#fffff1]/10">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center space-x-2 py-3 bg-white/5 border border-[#fffff1]/10 rounded text-sm text-[#fffff1]"
              >
                <Phone size={14} className="text-[#fffff1]" />
                <span>Ara</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20Demirt%C3%BCrk%20%C4%B0n%C5%9Faat%20projeleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 py-3 bg-emerald-700/30 border border-emerald-500/30 rounded text-sm text-emerald-400"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenTour) onOpenTour()
                else scrollTo('#tanitim-turu')
              }}
              className="glass-blur-box w-full py-3 text-white font-semibold text-center uppercase tracking-wider text-xs rounded-xl shadow-lg border border-white/20"
            >
              Ücretsiz Tanıtım Turu Talep Et
            </button>
          </div>
        </div>
      )}
    </>
  )
}
