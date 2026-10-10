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
      {/* AUTHENTIC DEMİRTÜRK EMBLEM: Desktop SVG (Anthracite to White)  */}
      {/* ============================================================== */}
      <div
        style={
          emblemSize === 36
            ? undefined
            : {
                height: `${emblemSize}px`,
                width: `${emblemSize}px`,
                maxHeight: `${emblemSize}px`,
              }
        }
        className={`relative ${
          emblemSize === 36 ? 'h-[28px] sm:h-[36px] w-[28px] sm:w-[36px] max-h-[28px] sm:max-h-[36px]' : ''
        } flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 375 375"
          className="h-full w-full object-contain"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Red Chevron 1 */}
          <path
            d="M 45.703125 296.484375 L 84.375 296.484375 L 165.234375 151.171875 L 145.898438 118.359375 Z"
            fill="#ff0000"
            fillRule="nonzero"
          />
          {/* Red Chevron 2 */}
          <path
            d="M 104.765625 296.484375 L 143.4375 296.484375 L 194.765625 202.734375 L 175.429688 169.921875 Z"
            fill="#ff0000"
            fillRule="nonzero"
          />
          {/* Anthracite Chevron 1 (Turns white on scroll) */}
          <path
            d="M 146.484375 76.875 L 185.15625 76.875 L 268.359375 222.65625 L 229.6875 222.65625 Z"
            fill={isScrolled ? '#fffff1' : '#313941'}
            fillRule="nonzero"
            className="transition-colors duration-300"
          />
          {/* Anthracite Chevron 2 (Turns white on scroll) */}
          <path
            d="M 206.25 76.875 L 244.921875 76.875 L 328.125 222.65625 L 289.453125 222.65625 Z"
            fill={isScrolled ? '#fffff1' : '#313941'}
            fillRule="nonzero"
            className="transition-colors duration-300"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* TYPOGRAPHY: PLUS JAKARTA SANS                                  */}
      {/* DEMİRTÜRK (Extra Bold 800)                                     */}
      {/* İ N Ş A A T (Light 300, Wide Tracking)                         */}
      {/* ============================================================== */}
      <div className="flex flex-col justify-center items-start leading-none text-left">
        {/* DEMİRTÜRK - Extra Bold Plus Jakarta Sans */}
        <span
          className={`tracking-[0.06em] text-base sm:text-xl uppercase ${titleColor} transition-colors block text-left`}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          DEMİRTÜRK
        </span>

        {/* İ N Ş A A T - Light Plus Jakarta Sans - Flush left with DEMİRTÜRK */}
        {showSubtitle && (
          <span
            className={`text-[8.5px] sm:text-[10.5px] uppercase ${subtitleColor} transition-colors mt-0.5 sm:mt-1 block text-left`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
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
