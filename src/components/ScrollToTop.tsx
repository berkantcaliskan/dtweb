import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

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
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Yukarı Çık"
      title="Yukarı Çık"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#1c2126]/90 hover:bg-[#252c33] active:bg-[#313941] text-[#fffff1]/90 hover:text-white backdrop-blur-md border border-[#fffff1]/20 hover:border-[#fffff1]/50 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 group cursor-pointer select-none overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffff1]/40 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto hover:shadow-2xl active:translate-y-0.5'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp 
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
        strokeWidth={2.4} 
        aria-hidden="true"
      />
    </button>
  )
}
