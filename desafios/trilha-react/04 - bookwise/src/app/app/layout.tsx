import { Menu } from '@/components/menu'
import React from 'react'

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="grid p-5 min-h-screen grid-cols-[auto_1fr] gap-[56px] w-[1440px] mx-auto">
      <Menu />
      {children}
    </main>
  )
}
