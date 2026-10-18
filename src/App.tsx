import React from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { DemirturkWebsite } from './DemirturkWebsite'

export function App() {
  return (
    <LanguageProvider>
      <DemirturkWebsite />
    </LanguageProvider>
  )
}

export default App
