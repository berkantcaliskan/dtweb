import React from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { DemirturkWebsite } from './DemirturkWebsite'
import { LanguageDustParticles } from './components/LanguageDustParticles'

export function App() {
  return (
    <LanguageProvider>
      <LanguageDustParticles />
      <DemirturkWebsite />
    </LanguageProvider>
  )
}

export default App
