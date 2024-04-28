import '../css/globals.css'

import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'

import { Providers } from './providers'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'Rocketseat challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="pt-BR">
        <body className={nunito.className}>
          <main className="box-border min-h-screen bg-gray-800 bg-fixed text-gray-200">
            {children}
          </main>
        </body>
      </html>
    </Providers>
  )
}
