import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'TR' | 'EN'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isEN: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'demirturk_lang'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'EN' || saved === 'TR') return saved
    }
    return 'TR'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang === 'EN' ? 'en' : 'tr'
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language === 'EN' ? 'en' : 'tr'
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isEN: language === 'EN' }}>
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
