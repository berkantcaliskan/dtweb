import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

export type Language = 'TR' | 'EN'
export type LangTransitionPhase = 'idle' | 'dissolving' | 'crystallizing'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isEN: boolean
  isLangTransitioning: boolean
  langTransitionPhase: LangTransitionPhase
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'demirturk_lang'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'EN' || saved === 'TR') return saved
    }
    return 'TR'
  })

  const [isLangTransitioning, setIsLangTransitioning] = useState(false)
  const [langTransitionPhase, setLangTransitionPhase] = useState<LangTransitionPhase>('idle')
  const transitioningRef = useRef(false)

  const setLanguage = (newLang: Language) => {
    if (newLang === language || transitioningRef.current) return
    transitioningRef.current = true
    setIsLangTransitioning(true)
    setLangTransitionPhase('dissolving')

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-lang-phase', 'dissolving')
    }

    // Phase 1: Metinler yumuşakça tozlaşıp çözünür (~220ms)
    setTimeout(() => {
      // Dil verisi en düşük opaklık / tozlaşma doruk noktasında güncellenir
      setLanguageState(newLang)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang)
        document.documentElement.lang = newLang === 'EN' ? 'en' : 'tr'
      }

      setLangTransitionPhase('crystallizing')
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-lang-phase', 'crystallizing')
      }

      // Phase 2: Yeni dilin metinleri tozlardan kristalleşerek netleşir (~320ms)
      setTimeout(() => {
        setLangTransitionPhase('idle')
        setIsLangTransitioning(false)
        transitioningRef.current = false
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-lang-phase', 'idle')
        }
      }, 340)
    }, 220)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language === 'EN' ? 'en' : 'tr'
      document.documentElement.setAttribute('data-lang-phase', 'idle')
    }
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isEN: language === 'EN',
        isLangTransitioning,
        langTransitionPhase,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
