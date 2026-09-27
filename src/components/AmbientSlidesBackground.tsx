import React from 'react'

interface SlideLayer {
  id: string
  title: string
  src: string
  top: string
  height: string
  mask: string
}

const AMBIENT_SLIDES: SlideLayer[] = [
  {
    id: 'ambient-yenisehir-top',
    title: 'Yeni Şehir Etapları - Mimari Giriş',
    src: '/images/yenisehirforweb.jpeg',
    top: '0%',
    height: '24%',
    mask: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
  },
  {
    id: 'ambient-yenisehir-mid1',
    title: 'Yeni Şehir Etapları - Projeler & Mimari',
    src: '/images/yenisehirforweb.jpeg',
    top: '18%',
    height: '24%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  },
  {
    id: 'ambient-yenisehir-mid2',
    title: 'Yeni Şehir Etapları - Malzeme & Mühendislik',
    src: '/images/yenisehirforweb.jpeg',
    top: '36%',
    height: '24%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  },
  {
    id: 'ambient-yenisehir-mid3',
    title: 'Yeni Şehir Etapları - İnşa Süreçleri',
    src: '/images/yenisehirforweb.jpeg',
    top: '54%',
    height: '24%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  },
  {
    id: 'ambient-yenisehir-bottom1',
    title: 'Yeni Şehir Etapları - İletişim & Ulaşın',
    src: '/images/yenisehirforweb.jpeg',
    top: '72%',
    height: '24%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  },
  {
    id: 'ambient-yenisehir-footer',
    title: 'Yeni Şehir Etapları - Alt Bölüm',
    src: '/images/yenisehirforweb.jpeg',
    top: '86%',
    height: '16%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)',
  },
]

export const AmbientSlidesBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 
        Vertically stacked slide layers:
        Rendered with heavy Gaussian blur (60px) and progressive gradient masks so they
        blend seamlessly into each other as one single continuous architectural visual.
      */}
      {AMBIENT_SLIDES.map((slide) => (
        <div
          key={slide.id}
          className="absolute inset-x-0 overflow-hidden transform-gpu"
          style={{
            top: slide.top,
            height: slide.height,
            maskImage: slide.mask,
            WebkitMaskImage: slide.mask,
          }}
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-110 filter blur-[50px] sm:blur-[65px] saturate-125 opacity-80"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

      {/* 
        Slight darkening overlay matching corporate anthracite (#252c33):
        Maintains high contrast and readability for all text, cards, and buttons.
      */}
      <div className="absolute inset-0 bg-[#252c33]/70 pointer-events-none" />

      {/* Top transition vignette smoothly blending from Hero Slider */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#252c33] via-[#252c33]/70 to-transparent pointer-events-none" />

      {/* Bottom transition vignette smoothly blending into Website Footer */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#1c2126] via-[#1c2126]/70 to-transparent pointer-events-none" />
    </div>
  )
}
