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

  const defaultTitle = 'Demirtürk İnşaat | Karasu Satılık Daire, Havuzlu Siteler & Elden Senet'
  const defaultDesc = "2003'ten bugüne Sakarya Karasu ve Kocaali'de kredisiz, kefilsiz elden senet modeliyle havuzlu siteler, müstakil villalar ve kaliteli yapı malzemeleri tedariki."

  const handleSelectProject = (project: ProjectItem, pushHistory = true) => {
    setSelectedProject(project)
    setSelectedArticle(null)
    setIsReachUsModalOpen(false)
    setIsTourModalOpen(false)
    const projectSlug = project.slug || project.id
    const targetPath = `/projeler/${projectSlug}`
    if (pushHistory && window.location.pathname !== targetPath) {
      window.history.pushState({ project: projectSlug }, '', targetPath)
    }
    document.title = `${project.title} | Demirtürk İnşaat Karasu Projeleri`
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = ''
    if (window.location.pathname !== '/projeler') {
      window.history.pushState({ path: '/projeler' }, '', '/projeler')
    }
    document.title = 'Projeler | Demirtürk İnşaat Karasu'
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

  const handleSelectArticle = (article: ArticleItem, pushHistory = true) => {
    setSelectedArticle(article)
    setSelectedProject(null)
    setIsReachUsModalOpen(false)
    setIsTourModalOpen(false)
    const targetPath = `/makaleler/${article.slug}`
    if (pushHistory && window.location.pathname !== targetPath) {
      window.history.pushState({ article: article.slug }, '', targetPath)
    }
    document.title = article.seoTitle || `${article.title} | Demirtürk İnşaat`
  }

  const handleCloseArticle = () => {
    setSelectedArticle(null)
    document.body.style.overflow = ''
    if (window.location.pathname !== '/makaleler') {
      window.history.pushState({ path: '/makaleler' }, '', '/makaleler')
    }
    document.title = 'Karasu Gayrimenkul Rehberi & Makaleler | Demirtürk İnşaat'
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

  const handleOpenReachUs = () => {
    setSelectedProject(null)
    setSelectedArticle(null)
    setIsTourModalOpen(false)
    setIsReachUsModalOpen(true)
    if (window.location.pathname !== '/iletisim') {
      window.history.pushState({ modal: 'iletisim' }, '', '/iletisim')
    }
    document.title = 'İletişim & Bize Ulaşın | Demirtürk İnşaat Karasu'
  }

  const handleCloseReachUs = () => {
    setIsReachUsModalOpen(false)
    document.body.style.overflow = ''
    if (window.location.pathname === '/iletisim' || window.location.pathname === '/ulasin') {
      window.history.pushState({ path: '/' }, '', '/')
    }
    document.title = defaultTitle
  }

  const handleOpenTour = () => {
    setSelectedProject(null)
    setSelectedArticle(null)
    setIsReachUsModalOpen(false)
    setIsTourModalOpen(true)
    if (window.location.pathname !== '/tanitim-turu') {
      window.history.pushState({ modal: 'tanitim-turu' }, '', '/tanitim-turu')
    }
    document.title = 'Ücretsiz Karasu Tanıtım Turu | Demirtürk İnşaat'
  }

  const handleCloseTour = () => {
    setIsTourModalOpen(false)
    document.body.style.overflow = ''
    if (window.location.pathname === '/tanitim-turu' || window.location.pathname === '/tur') {
      window.history.pushState({ path: '/' }, '', '/')
    }
    document.title = defaultTitle
  }

  const handleNavigate = (target: string, pushHistory = true) => {
    setSelectedProject(null)
    setSelectedArticle(null)

    // Unlock body scroll immediately
    document.body.style.overflow = ''

    if (target === '/iletisim' || target === '#iletisim' || target === '/ulasin' || target === '#ulasin') {
      handleOpenReachUs()
      return
    }

    if (target === '/tanitim-turu' || target === '#tanitim-turu' || target === '/tur' || target === '#tur') {
      handleOpenTour()
      return
    }

    setIsReachUsModalOpen(false)
    setIsTourModalOpen(false)

    let path = '/'
    let selector = '#hero'
    let title = defaultTitle

    if (target === '/projeler' || target === '#projeler') {
      path = '/projeler'
      selector = '#projeler'
      title = 'Projeler | Demirtürk İnşaat Karasu'
    } else if (target === '/odeme-modelleri' || target === '#odeme-modelleri' || target === '/finansman' || target === '#finansman') {
      path = '/odeme-modelleri'
      selector = '#odeme-modelleri'
      title = 'Ödeme Modelleri & Elden Senet | Demirtürk İnşaat'
    } else if (target === '/mimari-yaklasim' || target === '#mimari-yaklasim' || target === '/insa-surecleri' || target === '#insa-surecleri') {
      path = '/mimari-yaklasim'
      selector = '#mimari-yaklasim'
      title = 'Mimari Yaklaşım & Mühendislik | Demirtürk İnşaat'
    } else if (target === '/makaleler' || target === '#makaleler') {
      path = '/makaleler'
      selector = '#makaleler'
      title = 'Karasu Gayrimenkul Rehberi & Makaleler | Demirtürk İnşaat'
    } else if (target === '/yapi-malzemeleri' || target === '#yapi-malzemeleri' || target === '/malzeme' || target === '#malzeme') {
      path = '/yapi-malzemeleri'
      selector = '#yapi-malzemeleri'
      title = 'Yapı Malzemeleri & Toptan Tedarik | Demirtürk İnşaat'
    } else if (target === '/' || target === '#' || target === '#hero' || target === '') {
      path = '/'
      selector = '#hero'
      title = defaultTitle
    } else if (target.startsWith('/projeler/')) {
      const slug = target.replace('/projeler/', '').replace(/\/+$/, '')
      const project = PROJECTS_DATA.find((p) => !p.hidden && (p.slug === slug || p.id === slug))
      if (project) {
        handleSelectProject(project, pushHistory)
        return
      }
    } else if (target.startsWith('/makaleler/')) {
      const slug = target.replace('/makaleler/', '').replace(/\/+$/, '')
      const article = ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug)
      if (article) {
        handleSelectArticle(article, pushHistory)
        return
      }
    }

    if (pushHistory && window.location.pathname !== path) {
      window.history.pushState({ path }, '', path)
    }

    document.title = title

    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setTimeout(() => {
      const el = document.querySelector(selector)
      if (el) {
        const topOffset = 52
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - topOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 60)
  }

  // SEO & Deep-linking: sync URL and meta on mount and on selection changes
  useEffect(() => {
    const handleUrlState = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/'
      const params = new URLSearchParams(window.location.search)
      const projectParam = params.get('proje')
      const articleParam = params.get('makale')

      // 1. Check for specific project in path or query
      const projectSlugMatch = pathname.match(/^\/(?:projeler|proje)\/([a-z0-9-]+)$/)
      const targetProjectSlug = projectSlugMatch ? projectSlugMatch[1] : projectParam
      if (targetProjectSlug) {
        const found = PROJECTS_DATA.find((p) => !p.hidden && (p.slug === targetProjectSlug || p.id === targetProjectSlug))
        if (found) {
          handleSelectProject(found, false)
          return
        }
      }

      // 2. Check for specific article in path or query
      const articleSlugMatch = pathname.match(/^\/(?:makaleler|makale)\/([a-z0-9-]+)$/)
      const targetArticleSlug = articleSlugMatch ? articleSlugMatch[1] : articleParam
      if (targetArticleSlug) {
        const found = ARTICLES_DATA.find((a) => a.slug === targetArticleSlug || a.id === targetArticleSlug)
        if (found) {
          handleSelectArticle(found, false)
          return
        }
      }

      // 3. Check for modals
      if (pathname === '/iletisim' || pathname === '/ulasin' || params.has('iletisim') || params.has('ulasin')) {
        setSelectedProject(null)
        setSelectedArticle(null)
        setIsTourModalOpen(false)
        setIsReachUsModalOpen(true)
        document.title = 'İletişim & Bize Ulaşın | Demirtürk İnşaat Karasu'
        return
      }

      if (pathname === '/tanitim-turu' || pathname === '/tur' || params.has('tur')) {
        setSelectedProject(null)
        setSelectedArticle(null)
        setIsReachUsModalOpen(false)
        setIsTourModalOpen(true)
        document.title = 'Ücretsiz Karasu Tanıtım Turu | Demirtürk İnşaat'
        return
      }

      // Normal section page or home
      setSelectedProject(null)
      setSelectedArticle(null)
      setIsReachUsModalOpen(false)
      setIsTourModalOpen(false)

      if (pathname === '/projeler') {
        handleNavigate('/projeler', false)
        return
      }

      if (pathname === '/odeme-modelleri' || pathname === '/finansman') {
        handleNavigate('/odeme-modelleri', false)
        return
      }

      if (pathname === '/mimari-yaklasim' || pathname === '/insa-surecleri') {
        handleNavigate('/mimari-yaklasim', false)
        return
      }

      if (pathname === '/makaleler') {
        handleNavigate('/makaleler', false)
        return
      }

      if (pathname === '/yapi-malzemeleri' || pathname === '/malzeme' || pathname === '/malzemeler') {
        handleNavigate('/yapi-malzemeleri', false)
        return
      }

      if (pathname === '/') {
        document.title = defaultTitle
      }
    }

    handleUrlState()
    window.addEventListener('popstate', handleUrlState)
    return () => window.removeEventListener('popstate', handleUrlState)
  }, [])

  // Meta description updates for SEO
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) return

    if (isReachUsModalOpen) {
      metaDesc.setAttribute('content', 'Demirtürk İnşaat merkez ofis adresi, telefon numaraları, WhatsApp danışma hattı ve Karasu konut projeleri iletişim bilgileri.')
    } else if (isTourModalOpen) {
      metaDesc.setAttribute('content', 'Demirtürk İnşaat ile Karasu projelerini yerinde görün. İstanbul ve çevre illerden ücretsiz VIP transfer ve tanıtım turu randevusu.')
    } else if (selectedProject) {
      metaDesc.setAttribute('content', selectedProject.description.slice(0, 155))
    } else if (selectedArticle) {
      metaDesc.setAttribute('content', selectedArticle.summary.slice(0, 155))
    } else {
      metaDesc.setAttribute('content', defaultDesc)
    }
  }, [selectedProject, selectedArticle, isReachUsModalOpen, isTourModalOpen])

  const isSubPageOpen = Boolean(selectedProject || selectedArticle || isReachUsModalOpen)

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
        onOpenTour={handleOpenTour} 
        onOpenReachUs={handleOpenReachUs}
      />

      {/* Main Fullscreen Responsive Hero Slider (16:9 Desktop, 9:16 Mobile) */}
      <HeroSlider 
        currentIndex={currentSlideIndex}
        onSlideChange={setCurrentSlideIndex}
        onSelectProject={handleSelectProject} 
        onOpenTour={handleOpenTour}
      />

      {/* Slaytın Altı: Sürekli ve Pürüzsüz Blurlu Arka Plan & İçerik Katmanı */}
      <div className="relative w-full overflow-hidden">
        {/* Blurlu, hafif karartılmış ve slayt ile eşit/senkronize proje arka planı */}
        <AmbientSlidesBackground activeProjectIndex={currentSlideIndex} />

        {/* İçerik Katmanı */}
        <div className="relative z-10">
          {/* 1. PROJELER (#projeler) */}
          <ProjectsGrid onSelectProject={handleSelectProject} />

          {/* 2. ÖDEME MODELLERİ (#odeme-modelleri & #finansman) */}
          <PaymentModelsSection />

          {/* 3. MİMARİ YAKLAŞIM (#mimari-yaklasim & #insa-surecleri) */}
          <ArchitecturePhilosophy />

          {/* 4. MAKALELER (#makaleler) */}
          <ArticlesSection onSelectArticle={handleSelectArticle} />

          {/* 5. YAPI MALZEMELERİ (#yapi-malzemeleri) */}
          <MaterialAndEngineering />

          {/* 6. İLETİŞİM (#iletisim & #ulasin) */}
          <ReachUsSection />

          {/* Footer */}
          <WebsiteFooter 
            onOpenReachUs={handleOpenReachUs} 
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject ? (PROJECTS_DATA.find((p) => p.id === selectedProject.id || p.slug === selectedProject.slug) || selectedProject) : null}
        onClose={handleCloseProject}
      />

      {/* Full-Page Single Article Editorial View */}
      {selectedArticle && (
        <ArticleDetailView
          article={selectedArticle}
          allArticles={ARTICLES_DATA}
          onClose={handleCloseArticle}
          onSelectArticle={handleSelectArticle}
          onNavigate={handleNavigate}
        />
      )}

      {/* Tam Ekran Ulaşın & Kariyer Sayfası Modalı */}
      <ReachUsModal
        isOpen={isReachUsModalOpen}
        onClose={handleCloseReachUs}
      />

      {/* Ücretsiz Tanıtım Turu Hızlı Rezervasyon Modalı */}
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={handleCloseTour}
      />

      {/* Floating Scroll To Top Button */}
      {!isSubPageOpen && <ScrollToTop />}
    </div>
  )
}
