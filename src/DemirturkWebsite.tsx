import React, { useState, useEffect } from 'react'
import { WebsiteNavbar } from './components/WebsiteNavbar'
import { HeroSlider } from './components/HeroSlider'
import { AmbientSlidesBackground } from './components/AmbientSlidesBackground'
import { ProjectsGrid } from './components/ProjectsGrid'
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy'
import { MaterialAndEngineering } from './components/MaterialAndEngineering'
import { ArticlesSection, ARTICLES_DATA, ArticleItem } from './components/ArticlesSection'
import { ArticleDetailView } from './components/ArticleDetailView'
import { ReachUsSection } from './components/ReachUsSection'
import { PaymentModelsSection } from './components/PaymentModelsSection'
import { WebsiteFooter } from './components/WebsiteFooter'
import { ProjectDetailModal } from './components/ProjectDetailModal'
import { TourBookingModal } from './components/TourBookingModal'
import { ReachUsModal } from './components/ReachUsModal'
import { OpeningSplashScreen } from './components/OpeningSplashScreen'
import { ScrollToTop } from './components/ScrollToTop'
import { ProjectItem } from './types'
import { PROJECTS_DATA, COMPANY_INFO } from './data/websiteData'

export const DemirturkWebsite: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const [isTourModalOpen, setIsTourModalOpen] = useState(false)
  const [isReachUsModalOpen, setIsReachUsModalOpen] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showSplash, setShowSplash] = useState(true)

  // SEO & Deep-linking: sync URL and meta on mount and on selection changes
  useEffect(() => {
    const handleUrlState = () => {
      const pathname = window.location.pathname.toLowerCase()
      const params = new URLSearchParams(window.location.search)
      const projectParam = params.get('proje')
      const articleParam = params.get('makale')
      const tourParam = params.get('tur')
      const contactParam = params.get('iletisim')

      const articleFromPathOrParam = ARTICLES_DATA.find((a) =>
        (a.slug && (pathname.includes(a.slug.toLowerCase()) || articleParam === a.slug)) ||
        (a.id && (pathname.includes(a.id.toLowerCase()) || articleParam === a.id))
      )
      if (articleFromPathOrParam) {
        setSelectedArticle(articleFromPathOrParam)
        setSelectedProject(null)
        return
      }

      if (pathname === '/projeler' || pathname === '/projeler/') {
        setSelectedArticle(null)
        setSelectedProject(null)
        window.history.replaceState({}, '', '/')
        setTimeout(() => {
          handleNavigate('#projeler')
        }, 100)
        return
      }

      if (pathname === '/odeme-modelleri' || pathname === '/odeme-modelleri/' || pathname === '/finansman' || params.get('odeme-modelleri') !== null) {
        setSelectedArticle(null)
        setSelectedProject(null)
        window.history.replaceState({}, '', '/')
        setTimeout(() => {
          handleNavigate('#odeme-modelleri')
        }, 100)
        return
      }

      if (pathname === '/yapi-malzemeleri' || pathname === '/yapi-malzemeleri/' || pathname === '/malzeme' || pathname === '/malzemeler') {
        window.location.href = `https://wa.me/${COMPANY_INFO.materialsWhatsapp}?text=${encodeURIComponent('Merhaba, Demirtürk Yapı Malzemeleri hakkında bilgi ve fiyat teklifi almak istiyorum.')}`
        return
      }

      if (projectParam) {
        const found = PROJECTS_DATA.find((p) => !p.hidden && (p.slug === projectParam || p.id === projectParam))
        if (found) {
          setSelectedProject(found)
          setSelectedArticle(null)
          return
        }
      }

      // 0. İletişim / Bize Ulaşın (Google Ads ve direkt linkler için /iletisim)
      const isContact = pathname === '/iletisim' || pathname === '/ulasin' || params.has('iletisim') || params.has('ulasin') || contactParam === 'iletisim' || contactParam === 'ulasin'
      if (isContact) {
        setIsReachUsModalOpen(true)
        setSelectedProject(null)
        setSelectedArticle(null)
        return
      }

      if (pathname.startsWith('/makaleler/')) {
        const slug = pathname.replace('/makaleler/', '').replace('/', '')
        const found = ARTICLES_DATA.find((a) => a.slug === slug)
        if (found) {
          setSelectedArticle(found)
          setSelectedProject(null)
          setIsReachUsModalOpen(false)
          return
        }
      }

      if (pathname === '/projeler' || pathname === '/projeler/') {
        setSelectedArticle(null)
        setSelectedProject(null)
        setIsReachUsModalOpen(false)
        window.history.replaceState({}, '', '/')
        setTimeout(() => {
          handleNavigate('#projeler')
        }, 100)
        return
      }

      if (pathname === '/odeme-modelleri' || pathname === '/odeme-modelleri/' || pathname === '/finansman' || params.get('odeme-modelleri') !== null) {
        setSelectedArticle(null)
        setSelectedProject(null)
        setIsReachUsModalOpen(false)
        window.history.replaceState({}, '', '/')
        setTimeout(() => {
          handleNavigate('#odeme-modelleri')
        }, 100)
        return
      }

      if (pathname === '/yapi-malzemeleri' || pathname === '/yapi-malzemeleri/' || pathname === '/malzeme' || pathname === '/malzemeler') {
        window.location.href = `https://wa.me/${COMPANY_INFO.materialsWhatsapp}?text=${encodeURIComponent('Merhaba, Demirtürk Yapı Malzemeleri hakkında bilgi ve fiyat teklifi almak istiyorum.')}`
        return
      }

      if (projectParam) {
        const found = PROJECTS_DATA.find((p) => !p.hidden && (p.slug === projectParam || p.id === projectParam))
        if (found) {
          setSelectedProject(found)
          setSelectedArticle(null)
          setIsReachUsModalOpen(false)
          return
        }
      }

      if (tourParam !== null) {
        setIsTourModalOpen(true)
      }

      // Ana sayfaya dönüldüyse ve modal açıksa kapat
      if (pathname === '/' && !params.has('iletisim') && !params.has('ulasin') && !projectParam) {
        setIsReachUsModalOpen(false)
      }
    }

    handleUrlState()
    window.addEventListener('popstate', handleUrlState)
    return () => window.removeEventListener('popstate', handleUrlState)
  }, [])

  // Dynamic document.title and meta description updates for SEO & Google Ads
  useEffect(() => {
    const defaultTitle = 'Demirtürk İnşaat | Karasu Satılık Daire, Havuzlu Siteler & Elden Senet'
    const defaultDesc = "2003'ten bugüne Sakarya Karasu'da kredisiz, kefilsiz elden senet modeliyle havuzlu siteler, müstakil villalar ve kaliteli yapı malzemeleri tedariki."
    const metaDesc = document.querySelector('meta[name="description"]')

    if (isReachUsModalOpen) {
      document.title = 'İletişim & Bize Ulaşın | Demirtürk İnşaat Karasu'
      if (metaDesc) metaDesc.setAttribute('content', 'Demirtürk İnşaat merkez ofis adresi, telefon numaraları, WhatsApp danışma hattı ve Karasu konut projeleri iletişim bilgileri.')
      const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
      if (currentPath !== '/iletisim') {
        const search = window.location.search || ''
        window.history.pushState({ modal: 'iletisim' }, '', '/iletisim' + search)
      }
    } else if (selectedProject) {
      document.title = `${selectedProject.title} | Demirtürk İnşaat Karasu Projeleri`
      if (metaDesc) metaDesc.setAttribute('content', selectedProject.description.slice(0, 155))
      const url = new URL(window.location.href)
      url.searchParams.set('proje', selectedProject.slug || selectedProject.id)
      url.searchParams.delete('makale')
      url.searchParams.delete('sayfa')
      url.searchParams.delete('iletisim')
      window.history.replaceState({}, '', url.toString())
    } else if (selectedArticle) {
      document.title = selectedArticle.seoTitle || `${selectedArticle.title} | Demirtürk İnşaat`
      if (metaDesc) metaDesc.setAttribute('content', selectedArticle.summary.slice(0, 155))
      const targetUrl = selectedArticle.url || `/makaleler/${selectedArticle.slug}/`
      if (window.location.pathname !== targetUrl) {
        window.history.replaceState({}, '', targetUrl)
      }
    } else {
      document.title = defaultTitle
      if (metaDesc) metaDesc.setAttribute('content', defaultDesc)
      const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
      if (currentPath === '/iletisim' || currentPath === '/ulasin' || window.location.pathname.startsWith('/makaleler/')) {
        const search = window.location.search || ''
        window.history.replaceState({}, '', '/' + search)
      } else {
        const url = new URL(window.location.href)
        if (url.searchParams.has('proje') || url.searchParams.has('makale') || url.searchParams.has('sayfa') || url.searchParams.has('iletisim')) {
          url.searchParams.delete('proje')
          url.searchParams.delete('makale')
          url.searchParams.delete('sayfa')
          url.searchParams.delete('iletisim')
          window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash)
        }
      }
    }
  }, [selectedProject, selectedArticle, isReachUsModalOpen])

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
        const topOffset = 52
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
        const topOffset = 52
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
        const topOffset = 52
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
      {/* 0. Fullscreen Opening Splash Intro Animation */}
      {showSplash && (
        <OpeningSplashScreen onComplete={() => setShowSplash(false)} />
      )}
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
        currentIndex={currentSlideIndex}
        onSlideChange={setCurrentSlideIndex}
        onSelectProject={(p) => setSelectedProject(p)} 
        onOpenTour={() => setIsTourModalOpen(true)}
      />

      {/* Slaytın Altı: Sürekli ve Pürüzsüz Blurlu Arka Plan & İçerik Katmanı */}
      <div className="relative w-full overflow-hidden">
        {/* Blurlu, hafif karartılmış ve slayt ile eşit/senkronize proje arka planı */}
        <AmbientSlidesBackground activeProjectIndex={currentSlideIndex} />

        {/* İçerik Katmanı */}
        <div className="relative z-10">
          {/* 1. PROJELER (#projeler) */}
          <ProjectsGrid onSelectProject={(p) => setSelectedProject(p)} />

          {/* 2. ÖDEME MODELLERİ (#odeme-modelleri & #finansman) */}
          <PaymentModelsSection />

          {/* 3. MİMARİ YAKLAŞIM (#mimari-yaklasim & #insa-surecleri) */}
          <ArchitecturePhilosophy />

          {/* 4. MAKALELER (#makaleler) */}
          <ArticlesSection onSelectArticle={(a) => setSelectedArticle(a)} />

          {/* 5. YAPI MALZEMELERİ (#yapi-malzemeleri) */}
          <MaterialAndEngineering />

          {/* 6. İLETİŞİM (#iletisim & #ulasin) */}
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
          onNavigate={handleNavigate}
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
