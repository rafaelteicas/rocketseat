'use client'

import { SidePanelProvider } from '@/service/side-panel/side-panel-context'
import React from 'react'

interface AppProps {
  children: React.ReactNode
  menu: React.ReactNode
  book: React.ReactNode
}

export default function AppLayout({ children, menu, book }: AppProps) {
  return (
    <main className="grid p-5 min-h-screen grid-cols-[auto_1fr] gap-[56px] w-[1440px] mx-auto">
      <SidePanelProvider>
        {book}
        {menu}
        {children}
      </SidePanelProvider>
    </main>
  )
}
