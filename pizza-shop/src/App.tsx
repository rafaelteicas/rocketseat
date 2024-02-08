import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import './global.css'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza-shop" />
      <RouterProvider router={router} />
      <Toaster richColors />
    </HelmetProvider>
  )
}
