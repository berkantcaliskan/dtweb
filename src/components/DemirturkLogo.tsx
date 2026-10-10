import React from 'react'

interface DemirturkLogoProps {
  /**
   * 'dark-bg': For dark backgrounds (white text + red/white emblem)
   * 'light-bg': For light backgrounds (black text + red/black emblem as in Canva)
   */
  variant?: 'dark-bg' | 'light-bg'
  className?: string
  emblemSize?: number
  showSubtitle?: boolean
  onClick?: () => void
  isScrolled?: boolean
}

export const DemirturkLogo: React.FC<DemirturkLogoProps> = ({
  variant = 'dark-bg',
  className = '',
  emblemSize = 36,
  showSubtitle = true,
  onClick,
  isScrolled = false,
}) => {
  const isDarkBg = variant === 'dark-bg'

  const titleColor = isDarkBg ? 'text-[#fffff1]' : 'text-[#313941]'
  const subtitleColor = isDarkBg ? 'text-[#fffff1]/85' : 'text-[#313941]/85'

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center space-x-2.5 sm:space-x-3 select-none group ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* ============================================================== */}
      {/* AUTHENTIC DEMİRTÜRK EMBLEM: Smooth Anthracite to White Swap    */}
      {/* ============================================================== */}
      <div
        style={
          emblemSize === 36
            ? undefined
            : {
                height: `${emblemSize}px`,
                width: 'auto',
                maxHeight: `${emblemSize}px`,
              }
        }
        className={`relative ${
          emblemSize === 36 ? 'h-[28px] sm:h-[36px] max-h-[28px] sm:max-h-[36px]' : ''
        } w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        {/* 1. Emblem with Signature Anthracite lines (Active on hero slide) */}
        <img
          src="/demirturk-emblem-dark.png"
          alt="Demirtürk İnşaat Logo"
          className={`h-full w-auto object-contain transition-opacity duration-300 ${
            isScrolled ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* 2. Emblem with White lines (Active when scrolled down on dark backgrounds) */}
        <img
          src="/demirturk-emblem-white.png"
          alt="Demirtürk İnşaat Logo (Beyaz)"
          className={`h-full w-auto object-contain transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ============================================================== */}
      {/* TYPOGRAPHY: CODEC PRO                                          */}
      {/* DEMİRTÜRK (Extra Bold / 900)                                   */}
      {/* İ N Ş A A T (Light 300, Wide Tracking)                         */}
      {/* ============================================================== */}
      <div className="flex flex-col justify-center items-start leading-none text-left">
        {/* DEMİRTÜRK - Extra Bold Codec Pro */}
        <span
          className={`font-codec font-black tracking-[0.06em] text-base sm:text-xl uppercase ${titleColor} transition-colors block text-left`}
          style={{
            fontFamily: "'Codec Pro', 'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 900,
            WebkitTextStroke: '0.42px currentColor',
            lineHeight: 1.05,
          }}
        >
          DEMİRTÜRK
        </span>

        {/* İ N Ş A A T - Light Codec Pro - Flush left with DEMİRTÜRK */}
        {showSubtitle && (
          <span
            className={`font-codec font-light text-[8.5px] sm:text-[10.5px] uppercase ${subtitleColor} transition-colors mt-0.5 sm:mt-1 block text-left`}
            style={{
              fontFamily: "'Codec Pro', 'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: '0.42em',
              paddingLeft: 0,
              marginLeft: 0,
              lineHeight: 1,
            }}
          >
            İNŞAAT
          </span>
        )}
      </div>
    </div>
  )
}

export default DemirturkLogo
