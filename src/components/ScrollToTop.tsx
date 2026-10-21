import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { ChevronUp } from 'lucide-react'
import { COMPANY_INFO } from '../data/websiteData'

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()
  const isEn = language === 'EN'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-center space-y-2.5 sm:space-y-3 select-none transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      {/* 1. Scroll to Top (Yukarı Dön) - Appears above WhatsApp when scrolled */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Yukarı Çık"
        title="Yukarı Çık"
        className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#1c2126]/90 hover:bg-[#252c33] active:bg-[#313941] text-[#fffff1]/90 hover:text-white backdrop-blur-md border border-[#fffff1]/20 hover:border-[#fffff1]/50 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-2xl active:translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff1]/40"
      >
        <ChevronUp 
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
          strokeWidth={2.4} 
          aria-hidden="true"
        />
      </button>

      {/* 2. WhatsApp Direct Chat Button (Directs to +90 531 373 00 54) */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(isEn ? 'Hello Demirtürk Construction, I would like to get information regarding your projects.' : 'Merhaba, Demirtürk İnşaat projeleriniz hakkında bilgi almak istiyorum.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp İletişim Hattı"
        title="WhatsApp ile İletişime Geçin (+90 531 373 00 54)"
        className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 md:w-6 md:h-6 fill-current transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.94 2.796.94 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.057-1.127-.081-.613-.198-1.516-.677-2.456-1.59-.963-.934-1.464-1.89-1.637-2.518-.173-.628-.018-1.049.207-1.282.164-.171.371-.271.558-.271.187 0 .285.006.405.024.12.019.282.02.405.314.128.309.435 1.062.474 1.141.039.079.059.172.008.272-.051.1-.077.163-.153.253-.077.091-.161.203-.23.272-.077.079-.158.165-.068.32.09.155.399.658.856 1.066.589.526 1.087.689 1.242.766.155.077.246.068.337-.036.091-.104.389-.453.493-.608.104-.155.207-.129.349-.077.142.051.902.425 1.057.503.155.078.259.117.298.181.039.065.039.375-.105.78z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.661 1.435 5.176L2 22l4.981-1.398A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.666 0-3.21-.497-4.509-1.353l-.323-.214-2.96.83.829-2.909-.234-.337A8.17 8.17 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z"/>
        </svg>
      </a>
    </div>
  )
}
