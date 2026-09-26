import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

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
      aria-label="Yukarı Dön"
      title="Yukarı Dön"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.14] text-[#fffff1]/80 hover:text-[#fffff1] backdrop-blur-md border border-[#fffff1]/20 hover:border-[#fffff1]/50 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 transform group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto hover:scale-105 active:scale-95'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } focus:outline-none focus:ring-1 focus:ring-[#fffff1]/40`}
    >
      <ArrowUp 
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
        strokeWidth={1.25} 
      />
    </button>
  )
}
