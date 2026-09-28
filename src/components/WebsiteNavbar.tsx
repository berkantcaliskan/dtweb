import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Phone, MessageSquare, ArrowUpRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'
import { DemirturkLogo } from './DemirturkLogo'

interface WebsiteNavbarProps {
  activeSection?: string
  onOpenTour?: () => void
  onOpenReachUs?: () => void
}

interface NavLinkItem {
  label: string
  href: string
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'PROJELER', href: '#projeler' },
  { label: 'MİMARİ YAKLAŞIM', href: '#mimari-yaklasim' },
  { label: 'YAPI MALZEMELERİ', href: '#yapi-malzemeleri' },
  { label: 'MAKALELER', href: '#makaleler' },
  { label: 'İNŞA SÜREÇLERİ', href: '#insa-surecleri' },
  { label: 'ULAŞIN', href: '#ulasin' },
]

export const WebsiteNavbar: React.FC<WebsiteNavbarProps> = ({ onOpenTour, onOpenReachUs }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Responsive adaptive navigation state
  // Initial estimate based on window width
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const [visibleCount, setVisibleCount] = useState<number>(() => {
    if (initialWidth >= 1380) return 6
    if (initialWidth >= 1180) return 5
    if (initialWidth >= 1024) return 4
    if (initialWidth >= 840) return 3
    if (initialWidth >= 680) return 2
    if (initialWidth >= 520) return 1
    return 0
  })
  const [showPhone, setShowPhone] = useState<boolean>(() => initialWidth >= 1380)
  const [showHamburger, setShowHamburger] = useState<boolean>(() => initialWidth < 1380)

  const navContainerRef = useRef<HTMLDivElement>(null)
  const measureRulerRef = useRef<HTMLDivElement>(null)
  const logoMeasureRef = useRef<HTMLDivElement>(null)
  const ctaMeasureRef = useRef<HTMLDivElement>(null)
  const phoneMeasureRef = useRef<HTMLDivElement>(null)
  const hamburgerMeasureRef = useRef<HTMLDivElement>(null)
  const linkMeasureRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll detection for navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll and handle Escape key when menu drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Precise adaptive layout recalculation
  const updateLayout = useCallback(() => {
    if (!navContainerRef.current) return

    const computedStyle = window.getComputedStyle(navContainerRef.current)
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0
    const innerWidth = navContainerRef.current.clientWidth - paddingLeft - paddingRight

    if (innerWidth <= 0) return

    const logoW = logoMeasureRef.current?.offsetWidth || 180
    const ctaW = ctaMeasureRef.current?.offsetWidth || 165
    const phoneW = phoneMeasureRef.current?.offsetWidth || 155
    const hamburgerW = hamburgerMeasureRef.current?.offsetWidth || 44

    const DEFAULT_LINK_WIDTHS = [85, 150, 160, 95, 140, 75]
    const linkWidths = NAV_LINKS.map((_, i) => {
      const el = linkMeasureRefs.current[i]
      return el && el.offsetWidth > 0 ? el.offsetWidth : DEFAULT_LINK_WIDTHS[i]
    })

    const GAP_NAV = innerWidth > 1300 ? 20 : 12
    const GAP_ACTIONS = 12
    const GAP_SECTIONS = 18

    const getLinksCost = (cnt: number) => {
      if (cnt <= 0) return 0
      let sum = 0
      for (let i = 0; i < cnt; i++) {
        sum += linkWidths[i]
      }
      return sum + (cnt - 1) * GAP_NAV
    }

    const totalLinksWidthAll = getLinksCost(NAV_LINKS.length)
    const rightActionsWidthWithPhone = phoneW + GAP_ACTIONS + ctaW
    const totalNeededForEverything = logoW + GAP_SECTIONS + totalLinksWidthAll + GAP_SECTIONS + rightActionsWidthWithPhone

    // Case 1: Everything fits on the top bar!
    if (innerWidth >= totalNeededForEverything) {
      setShowPhone(true)
      setVisibleCount(NAV_LINKS.length)
      setShowHamburger(false)
      return
    }

    // Case 2: Not everything fits.
    // Rule: Move phone number to menu, show hamburger menu button, and keep whatever pages fit.
    setShowPhone(false)
    setShowHamburger(true)

    const rightActionsWidthWithMenu = ctaW + GAP_ACTIONS + hamburgerW
    const availableForLinks = innerWidth - logoW - (GAP_SECTIONS * 2) - rightActionsWidthWithMenu

    let count = NAV_LINKS.length
    while (count > 0) {
      if (getLinksCost(count) <= availableForLinks) {
        break
      }
      count--
    }

    setVisibleCount(count)
  }, [])

  // ResizeObserver + window resize event listener
  useEffect(() => {
    updateLayout()

    const ro = new ResizeObserver(() => {
      updateLayout()
    })

    if (navContainerRef.current) {
      ro.observe(navContainerRef.current)
    }

    window.addEventListener('resize', updateLayout)

    // Re-check after document fonts have loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateLayout()
      })
    }

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [updateLayout])

  const handleNavClick = (item: NavLinkItem) => {
    setIsMenuOpen(false)
    if (item.label === 'ULAŞIN' && onOpenReachUs) {
      onOpenReachUs()
      return
    }
    scrollTo(item.href)
  }

  const scrollTo = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const topOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const visibleLinks = NAV_LINKS.slice(0, visibleCount)
  const overflowLinks = NAV_LINKS.slice(visibleCount)

  return (
    <>
      {/* Hidden DOM measurement ruler for sub-pixel responsive calculation */}
      <div
        ref={measureRulerRef}
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none flex items-center space-x-3 xl:space-x-5 z-[-99]"
      >
        <div ref={logoMeasureRef} className="flex-shrink-0">
          <DemirturkLogo variant="dark-bg" emblemSize={36} />
        </div>
        <div
          ref={phoneMeasureRef}
          className="text-xs sm:text-sm flex items-center space-x-1.5 px-3 py-2 whitespace-nowrap"
        >
          <Phone size={14} />
          <span>{COMPANY_INFO.phone}</span>
        </div>
        <div
          ref={ctaMeasureRef}
          className="text-xs font-normal tracking-wider uppercase px-4 py-2.5 whitespace-nowrap"
        >
          <span>Ücretsiz Tanıtım Turu</span>
        </div>
        <div ref={hamburgerMeasureRef} className="p-2">
          <Menu size={22} />
        </div>
        {NAV_LINKS.map((item, idx) => (
          <div
            key={item.label}
            ref={(el) => {
              linkMeasureRefs.current[idx] = el
            }}
            className="text-xs xl:text-[13px] tracking-[0.14em] font-medium py-1 whitespace-nowrap"
          >
            {item.label}
          </div>
        ))}
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#252c33]/92 backdrop-blur-xl border-b border-[#fffff1]/[0.08] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#1c2126]/90 via-[#252c33]/40 to-transparent py-5'
        }`}
      >
        <div
          ref={navContainerRef}
          className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative"
        >
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

          {/* Center: Pages / Navigation Links (In natural flex flow, centered, never collides) */}
          {visibleLinks.length > 0 && (
            <nav className="flex-1 flex items-center justify-center min-w-0 px-1 sm:px-2 z-10">
              <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-5 overflow-hidden whitespace-nowrap">
                {visibleLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-xs xl:text-[13px] tracking-[0.12em] xl:tracking-[0.16em] font-medium text-[#fffff1]/85 hover:text-[#fffff1] transition-colors relative py-1 whitespace-nowrap flex-shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#fffff1] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* Right: Phone (if fits) + Free Tour CTA + 3-line Hamburger Menu (if anything overflowed) */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 z-10">
            {/* Direct Phone (Visible if fits in available space) */}
            {showPhone && (
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-xs sm:text-sm text-[#fffff1]/90 hover:text-[#fffff1] flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-[#fffff1]/10 hover:border-[#fffff1]/20 transition-all whitespace-nowrap flex-shrink-0 cursor-pointer"
              >
                <Phone size={14} className="text-[#fffff1] flex-shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            )}

            {/* Free Tour CTA Button (Remains visible as requested) */}
            <button
              onClick={() => {
                if (onOpenTour) onOpenTour()
                else scrollTo('#tanitim-turu')
              }}
              className="glass-blur-box text-[11px] sm:text-xs font-normal tracking-wider uppercase px-2.5 sm:px-4 py-2 sm:py-2.5 text-[#fffff1] rounded-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-1.5 whitespace-nowrap hover:border-[#fffff1]/40 flex-shrink-0 cursor-pointer"
            >
              <span className="hidden min-[380px]:inline">Ücretsiz </span>
              <span>Tanıtım Turu</span>
            </button>

            {/* 3-Line Hamburger Menu Button (Appears as soon as phone or any link overflows) */}
            {showHamburger && (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 sm:p-2.5 rounded-lg text-[#fffff1]/90 hover:text-[#fffff1] hover:bg-white/10 transition-colors focus:outline-none flex-shrink-0 cursor-pointer border border-[#fffff1]/10 hover:border-[#fffff1]/20"
                aria-label="Menüyü aç"
              >
                <Menu size={22} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Drawer Overlay Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-modal-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Right Drawer Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] max-w-full bg-[#1c2126]/98 backdrop-blur-2xl border-l border-[#fffff1]/10 shadow-2xl flex flex-col justify-between p-6 sm:p-7 transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Top: Header with Logo emblem & Close button */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#fffff1]/10">
          <div className="flex items-center space-x-2.5">
            <DemirturkLogo variant="dark-bg" emblemSize={28} />
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg text-[#fffff1]/70 hover:text-[#fffff1] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menüyü kapat"
          >
            <X size={22} />
          </button>
        </div>

        {/* Middle: Links & Direct Actions */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Section: Sığmayan Sayfalar (Menüye Taşınan Bölümler) */}
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#fffff1]/60 font-semibold mb-3 flex items-center justify-between">
              <span>{overflowLinks.length === NAV_LINKS.length ? 'BÖLÜMLER' : 'MENÜDEKİ BÖLÜMLER'}</span>
              <span className="text-[10px] text-[#fffff1]/40 font-mono">
                {overflowLinks.length > 0 ? overflowLinks.length : NAV_LINKS.length} Sayfa
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              {(overflowLinks.length > 0 ? overflowLinks : NAV_LINKS).map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left text-lg sm:text-xl font-theSeasons font-semibold tracking-wider text-[#fffff1]/90 hover:text-white hover:pl-2 transition-all py-2.5 flex items-center justify-between border-b border-[#fffff1]/5 group cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-[#fffff1]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access to Links that are already on the top bar */}
          {visibleLinks.length > 0 && overflowLinks.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#fffff1]/45 font-semibold mb-2.5">
                ÜST BARDTAKİ BÖLÜMLER
              </div>
              <div className="flex flex-wrap gap-2">
                {visibleLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#fffff1]/75 hover:text-white transition-all border border-white/5 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Direct Phone & WhatsApp inside Drawer (Always accessible, highlighted when phone moved to menu) */}
          <div className="space-y-2.5 pt-2">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#fffff1]/45 font-semibold mb-1">
              DOĞRUDAN İLETİŞİM
            </div>

            {/* Direct Phone Card */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#fffff1]/10 hover:border-[#fffff1]/20 transition-all text-[#fffff1] group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#fffff1]/10 flex items-center justify-center text-[#fffff1] group-hover:scale-105 transition-transform flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-[#fffff1]/60 uppercase tracking-widest font-medium">Bizi Arayın</div>
                  <div className="text-sm font-semibold tracking-wider font-mono">{COMPANY_INFO.phone}</div>
                </div>
              </div>
              <span className="text-xs text-[#fffff1]/60 group-hover:text-white transition-colors flex items-center space-x-1">
                <span>Hemen Ara</span>
                <ArrowUpRight size={14} />
              </span>
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20Demirt%C3%BCrk%20%C4%B0n%C5%9Faat%20projeleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-700/20 hover:bg-emerald-700/30 border border-emerald-500/20 hover:border-emerald-500/30 transition-all text-emerald-400 group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-medium">WhatsApp Danışmanı</div>
                  <div className="text-sm font-semibold tracking-wider">Hızlı Mesaj Gönderin</div>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-emerald-400/50 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
          </div>
        </div>

        {/* Bottom: Free Tour CTA */}
        <div className="pt-4 border-t border-[#fffff1]/10">
          <button
            onClick={() => {
              setIsMenuOpen(false)
              if (onOpenTour) onOpenTour()
              else scrollTo('#tanitim-turu')
            }}
            className="glass-blur-box w-full py-3.5 text-white font-normal text-center uppercase tracking-wider text-xs rounded-xl shadow-lg border border-white/20 hover:border-white/40 transition-all cursor-pointer"
          >
            Ücretsiz Tanıtım Turu Talep Et
          </button>
        </div>
      </div>
    </>
  )
}
