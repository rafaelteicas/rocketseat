'use client'

import React from 'react'

import { Sidebar } from '@/components/sidebar'
import { SidePanelProvider } from '@/service/side-panel/side-panel-context'

interface AppProps {
  children: React.ReactNode
  book: React.ReactNode
}

export default function AppLayout({ children, book }: AppProps) {
  return (
    <main className="mx-auto grid min-h-screen w-[1440px] grid-cols-app gap-24 bg-gray-800 pb-5">
      <SidePanelProvider>
        {book}
        <Sidebar />
        {children}
      </SidePanelProvider>
    </main>
  )
}
