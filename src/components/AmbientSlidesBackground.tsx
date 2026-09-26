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
    id: 'ambient-asel-sunset',
    title: 'Asel Doğa Evleri - Çağdaş Mimari',
    src: '/images/aselforweb.jpeg',
    top: '0%',
    height: '22%',
    mask: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
  },
  {
    id: 'ambient-almina-resort',
    title: 'Almina Sahil Sitesi - Sahil & Havuz',
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    top: '16%',
    height: '22%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
  },
  {
    id: 'ambient-akasya-villa',
    title: 'Akasya Doğa Villaları - Müstakil Lüks & Taş Doku',
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
    top: '32%',
    height: '22%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
  },
  {
    id: 'ambient-demirturk-suite',
    title: 'Demirtürk Suite Karasu - Modern Cam & Geometrik Cephe',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    top: '48%',
    height: '22%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
  },
  {
    id: 'ambient-asel-pool',
    title: 'Asel Doğa Evleri - Açık Havuz & Peyzaj',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    top: '64%',
    height: '22%',
    mask: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
  },
  {
    id: 'ambient-seaside-horizon',
    title: 'Seaside House - Sahil Şeridi & Ufuk Çizgisi',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    top: '80%',
    height: '20%',
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
