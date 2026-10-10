import React from 'react'
import { PROJECTS_DATA } from '../data/websiteData'

interface AmbientSlidesBackgroundProps {
  activeProjectIndex?: number
  className?: string
}

export const AmbientSlidesBackground: React.FC<AmbientSlidesBackgroundProps> = ({
  activeProjectIndex = 0,
  className = '',
}) => {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured)
  const safeActiveIndex = Math.abs(activeProjectIndex) % (featuredProjects.length || 1)

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 
        Slayt ile Senkronize ve Eşit Proje Arka Planı:
        Hero slaytındaki aktif projeye (Asel Doğa Evleri, Almina Evleri, Seaside House, Yeni Şehir Etapları)
        göre dinamik olarak yumuşak cross-fade geçişi yapar.
        Aynı imza Gaussian blur (50px / 65px) ve doygunluk seviyesini korur.
      */}
      {featuredProjects.map((project, idx) => {
        const isActive = idx === safeActiveIndex
        const imageSrc =
          project.heroMedia?.desktopSrc ||
          project.heroMedia?.mobileSrc ||
          '/images/yenisehirforweb.jpeg'

        return (
          <div
            key={project.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out transform-gpu will-change-[opacity] ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={imageSrc}
              alt={project.title}
              className="w-full h-full object-cover object-center scale-110 filter blur-[50px] sm:blur-[65px] saturate-125 opacity-80"
              loading="eager"
              decoding="async"
            />
          </div>
        )
      })}

      {/* 
        Kurumsal Antrasit Karartma Katmanı (#252c33):
        Tüm içerik, metin, kartlar ve butonların mükemmel kontrast ve okunabilirlikte kalmasını sağlar.
      */}
      <div className="absolute inset-0 bg-[#252c33]/70 pointer-events-none z-20" />

      {/* Top transition vignette smoothly blending from Hero Slider */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#252c33] via-[#252c33]/70 to-transparent pointer-events-none z-20" />

      {/* Bottom transition vignette smoothly blending into Website Footer */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#1c2126] via-[#1c2126]/70 to-transparent pointer-events-none z-20" />
    </div>
  )
}

