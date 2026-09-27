import React, { useState } from 'react'
import { WebsiteNavbar } from './components/WebsiteNavbar'
import { HeroSlider } from './components/HeroSlider'
import { AmbientSlidesBackground } from './components/AmbientSlidesBackground'
import { ProjectsGrid } from './components/ProjectsGrid'
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy'
import { MaterialAndEngineering } from './components/MaterialAndEngineering'
import { ArticlesSection } from './components/ArticlesSection'
import { ConstructionProcessSection } from './components/ConstructionProcessSection'
import { ReachUsSection } from './components/ReachUsSection'
import { FinancingAndTourSection } from './components/FinancingAndTourSection'
import { WebsiteFooter } from './components/WebsiteFooter'
import { ProjectDetailModal } from './components/ProjectDetailModal'
import { TourBookingModal } from './components/TourBookingModal'
import { ScrollToTop } from './components/ScrollToTop'
import { ProjectItem } from './types'

export const DemirturkWebsite: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isTourModalOpen, setIsTourModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1]">
      {/* 
        Top Architectural Navbar:
        Pages: Projeler, Mimari Yaklaşım, Yapı Malzemeleri, Makaleler, İnşa Süreçleri, Ulaşın
        Right Action: Ücretsiz Tanıtım Turu (Cam blur kutucuklu)
      */}
      <WebsiteNavbar onOpenTour={() => setIsTourModalOpen(true)} />

      {/* Main Fullscreen Responsive Hero Slider (16:9 Desktop, 9:16 Mobile) */}
      <HeroSlider 
        onSelectProject={(p) => setSelectedProject(p)} 
        onOpenTour={() => setIsTourModalOpen(true)}
      />

      {/* Slaytın Altı: Sürekli ve Pürüzsüz Blurlu Arka Plan & İçerik Katmanı */}
      <div className="relative w-full overflow-hidden">
        {/* Blurlu, hafif karartılmış ve pürüzsüz geçişli dikey slayt gösterisi tuvali */}
        <AmbientSlidesBackground />

        {/* İçerik Katmanı */}
        <div className="relative z-10">
          {/* 1. PROJELER (#projeler) */}
          <ProjectsGrid onSelectProject={(p) => setSelectedProject(p)} />

          {/* 2. MİMARİ YAKLAŞIM (#mimari-yaklasim) */}
          <ArchitecturePhilosophy />

          {/* 3. YAPI MALZEMELERİ (#yapi-malzemeleri) */}
          <MaterialAndEngineering />

          {/* 4. MAKALELER (#makaleler) */}
          <ArticlesSection />

          {/* 5. İNŞA SÜREÇLERİ (#insa-surecleri) */}
          <ConstructionProcessSection />

          {/* Finansman & Senet Hesaplayıcı Modülü */}
          <FinancingAndTourSection />

          {/* 6. ULAŞIN (#ulasin - Temel İletişim Bilgileri ve Kariyer) */}
          <ReachUsSection />

          {/* Footer */}
          <WebsiteFooter />
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Ücretsiz Tanıtım Turu Hızlı Rezervasyon Modalı */}
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  )
}
