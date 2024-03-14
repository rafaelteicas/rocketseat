import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Outlet } from 'react-router-dom'
import { Header } from './components/header'
import { CartProvider } from './contexts/CartProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CartProvider>
        <Header />
        <Outlet />
      </CartProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
