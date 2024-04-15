'use client'

import { Sidebar } from '@/components/sidebar'
import { SidePanelProvider } from '@/service/side-panel/side-panel-context'
import React from 'react'

interface AppProps {
  children: React.ReactNode
  book: React.ReactNode
}

export default function AppLayout({ children, book }: AppProps) {
  return (
    <main className="mx-auto grid min-h-screen w-[1440px] grid-cols-app gap-24 pb-5">
      <SidePanelProvider>
        {book}
        <Sidebar />
        {children}
      </SidePanelProvider>
    </main>
  )
}
