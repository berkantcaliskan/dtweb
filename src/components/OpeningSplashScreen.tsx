import React, { useEffect, useState } from 'react'

interface OpeningSplashScreenProps {
  onComplete: () => void
}

export const OpeningSplashScreen: React.FC<OpeningSplashScreenProps> = ({ onComplete }) => {
  const [isLocked, setIsLocked] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Step 1: Lock animation triggers pulse at 1.1s when lines meet
  useEffect(() => {
    const lockTimer = setTimeout(() => {
      setIsLocked(true)
    }, 1100)

    // Step 2: Begin smooth luxury exit fade at 3.2s (+1.6s longer brand display)
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 3200)

    // Step 3: Complete and unmount at 3.7s (after 500ms fade)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3700)

    // Lock body scroll during splash
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(lockTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fffff1] select-none transition-opacity duration-500 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '500ms',
        transform: isExiting ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Background Architectural Watermark Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(49, 57, 65, 0.04) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Main Center Content Box */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-sm sm:max-w-md w-full">
        {/* ============================================================== */}
        {/* 1. AUTHENTIC 4-CHEVRON EMBLEM ANIMATION                         */}
        {/* ============================================================== */}
        <div className={`relative w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] flex items-center justify-center mb-6 sm:mb-8 ${isLocked ? 'anim-splash-lock-pulse' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 375"
            className="w-full h-full object-contain overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* -------------------------------------------------------- */}
            {/* GROUP A: 2 RED CHEVRONS (Slide in swiftly from Left)    */}
            {/* -------------------------------------------------------- */}
            <g className="anim-splash-red">
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
            </g>

            {/* -------------------------------------------------------- */}
            {/* GROUP B: 2 ANTHRACITE CHEVRONS                          */}
            {/* (Slide from Right, land slightly above red, then SLOWLY  */}
            {/*  ascend vertically into original geometric lock position)*/}
            {/* -------------------------------------------------------- */}
            <g className="anim-splash-anthracite-x">
              <g className="anim-splash-anthracite-y">
                {/* Anthracite Chevron 1 */}
                <path
                  d="M 146.484375 76.875 L 185.15625 76.875 L 268.359375 222.65625 L 229.6875 222.65625 Z"
                  fill="#313941"
                  fillRule="nonzero"
                />
                {/* Anthracite Chevron 2 */}
                <path
                  d="M 206.25 76.875 L 244.921875 76.875 L 328.125 222.65625 L 289.453125 222.65625 Z"
                  fill="#313941"
                  fillRule="nonzero"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* ============================================================== */}
        {/* 2. REFINED ARCHITECTURAL DIVIDER HAIRLINE                       */}
        {/* ============================================================== */}
        <div className="w-[180px] sm:w-[220px] h-[1px] bg-gradient-to-r from-transparent via-[#313941]/30 to-transparent anim-splash-line mb-3 sm:mb-4" />

        {/* ============================================================== */}
        {/* 3. BRAND TYPOGRAPHY: DEMİRTÜRK İNŞAAT                           */}
        {/* - "Demirtürk" is ExtraBold (800)                               */}
        {/* - "İnşaat" is Light (300)                                      */}
        {/* - EXACT start and end alignment (equal flush edges)            */}
        {/* ============================================================== */}
        <div className="relative w-[210px] sm:w-[250px] flex flex-col items-center overflow-hidden py-1">
          {/* Subtle luxury light sheen reflection over typography */}
          <div className="absolute inset-0 pointer-events-none z-10 anim-splash-sheen bg-gradient-to-r from-transparent via-white/80 to-transparent w-[80px]" />

          {/* Line 1: DEMİRTÜRK - ExtraBold Plus Jakarta Sans */}
          <h1
            className="anim-splash-title w-full text-center text-[#252c33] font-extrabold uppercase tracking-[0.05em] text-[24px] sm:text-[29px] leading-none"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 800,
            }}
          >
            DEMİRTÜRK
          </h1>

          {/* Line 2: İ N Ş A A T - Light Plus Jakarta Sans */}
          {/* Using flex justify-between with refined inset for subtle tighter spacing */}
          <div
            className="anim-splash-subtitle w-full flex justify-between items-center text-[#313941]/90 uppercase text-[10px] sm:text-[12px] font-light leading-none mt-2 sm:mt-2.5 px-2 sm:px-2.5"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 300,
            }}
          >
            <span>İ</span>
            <span>N</span>
            <span>Ş</span>
            <span>A</span>
            <span>A</span>
            <span>T</span>
          </div>
        </div>

        {/* 4. Luxury Founding Badge */}
        <div className="anim-splash-subtitle mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#313941]/50 font-medium">
          2003'TEN BERİ GÜVENLE
        </div>
      </div>
    </div>
  )
}

export default OpeningSplashScreen
