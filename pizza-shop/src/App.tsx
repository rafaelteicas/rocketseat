import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import './global.css'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza-shop" />
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </HelmetProvider>
  )
}
