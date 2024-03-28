import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const nunito = Nunito({ subsets: ['latin'] })

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
        <body
          className={`${nunito.className} bg-gray-800 text-gray-200 min-h-screen box-border`}
        >
          {children}
        </body>
      </html>
    </Providers>
  )
}
