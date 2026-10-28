import React, { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { DemirturkWebsite } from './DemirturkWebsite'
import { LanguageDustParticles } from './components/LanguageDustParticles'
import { AdminDashboard } from './components/AdminDashboard'
import { initGoogleAnalytics, trackPageView } from './services/analyticsService'

export function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '')
      return path === '/yonetim' || path === '/panel' || path === '/admin'
    }
    return false
  })

  useEffect(() => {
    // Initialize Google Analytics if ID was set in panel
    initGoogleAnalytics()

    // Track initial page view if not in admin panel
    if (!isAdminView) {
      trackPageView(window.location.pathname, document.title)
    }

    // Handle browser back/forward and programmatic navigation
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '')
      const shouldBeAdmin = path === '/yonetim' || path === '/panel' || path === '/admin'
      setIsAdminView(shouldBeAdmin)
      if (!shouldBeAdmin) {
        trackPageView(window.location.pathname, document.title)
      }
    }

    // Secret shortcut: Ctrl + Shift + A (opens /yonetim)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        window.history.pushState({ path: '/yonetim' }, '', '/yonetim')
        setIsAdminView(true)
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAdminView])

  const handleBackToWebsite = () => {
    window.history.pushState({ path: '/' }, '', '/')
    setIsAdminView(false)
  }

  if (isAdminView) {
    return <AdminDashboard onBackToWebsite={handleBackToWebsite} />
  }

  return (
    <LanguageProvider>
      <LanguageDustParticles />
      <DemirturkWebsite />
    </LanguageProvider>
  )
}

export default App
