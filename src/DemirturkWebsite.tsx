import React, { useState } from 'react'
import { WebsiteNavbar } from './components/WebsiteNavbar'
import { HeroSlider } from './components/HeroSlider'
import { AmbientSlidesBackground } from './components/AmbientSlidesBackground'
import { ProjectsGrid } from './components/ProjectsGrid'
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy'
import { MaterialAndEngineering } from './components/MaterialAndEngineering'
import { ArticlesSection, ARTICLES_DATA, ArticleItem } from './components/ArticlesSection'
import { ArticleDetailView } from './components/ArticleDetailView'
import { ConstructionProcessSection } from './components/ConstructionProcessSection'
import { ReachUsSection } from './components/ReachUsSection'
import { FinancingAndTourSection } from './components/FinancingAndTourSection'
import { WebsiteFooter } from './components/WebsiteFooter'
import { ProjectDetailModal } from './components/ProjectDetailModal'
import { TourBookingModal } from './components/TourBookingModal'
import { ReachUsModal } from './components/ReachUsModal'
import { ScrollToTop } from './components/ScrollToTop'
import { ProjectItem } from './types'

export const DemirturkWebsite: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const [isTourModalOpen, setIsTourModalOpen] = useState(false)
  const [isReachUsModalOpen, setIsReachUsModalOpen] = useState(false)

  const isSubPageOpen = Boolean(selectedProject || selectedArticle || isReachUsModalOpen)

  const handleNavigate = (href: string) => {
    setSelectedProject(null)
    setSelectedArticle(null)
    setIsReachUsModalOpen(false)

    // Unlock body scroll immediately
    document.body.style.overflow = ''

    if (href === '#' || href === '' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        const topOffset = 70
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - topOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 60)
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = ''
    setTimeout(() => {
      const target = document.querySelector('#projeler')
      if (target) {
        const topOffset = 70
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - topOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 60)
  }

  const handleCloseArticle = () => {
    setSelectedArticle(null)
    document.body.style.overflow = ''
    setTimeout(() => {
      const target = document.querySelector('#makaleler')
      if (target) {
        const topOffset = 70
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - topOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 60)
  }

  return (
    <div className="min-h-screen bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1]">
      {/* 
        Top Architectural Navbar:
        Pages: Projeler, Mimari Yaklaşım, Yapı Malzemeleri, Makaleler, İnşa Süreçleri, Ulaşın
        Right Action: Ücretsiz Tanıtım Turu (Cam blur kutucuklu)
      */}
      <WebsiteNavbar 
        isSubPageOpen={isSubPageOpen}
        onNavigate={handleNavigate}
        onOpenTour={() => setIsTourModalOpen(true)} 
        onOpenReachUs={() => {
          setSelectedProject(null)
          setSelectedArticle(null)
          setIsReachUsModalOpen(true)
        }}
      />

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
          <ArticlesSection onSelectArticle={(a) => setSelectedArticle(a)} />

          {/* 5. İNŞA SÜREÇLERİ (#insa-surecleri) */}
          <ConstructionProcessSection />

          {/* Finansman & Senet Hesaplayıcı Modülü */}
          <FinancingAndTourSection />

          {/* 6. ULAŞIN (#ulasin - Temel İletişim Bilgileri ve Kariyer) */}
          <ReachUsSection />

          {/* Footer */}
          <WebsiteFooter onOpenReachUs={() => {
            setSelectedProject(null)
            setSelectedArticle(null)
            setIsReachUsModalOpen(true)
          }} />
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
      />

      {/* Full-Page Single Article Editorial View */}
      {selectedArticle && (
        <ArticleDetailView
          article={selectedArticle}
          allArticles={ARTICLES_DATA}
          onClose={handleCloseArticle}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* Tam Ekran Ulaşın & Kariyer Sayfası Modalı */}
      <ReachUsModal
        isOpen={isReachUsModalOpen}
        onClose={() => setIsReachUsModalOpen(false)}
      />

      {/* Ücretsiz Tanıtım Turu Hızlı Rezervasyon Modalı */}
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      {/* Floating Scroll To Top Button */}
      {!isSubPageOpen && <ScrollToTop />}
    </div>
  )
}
