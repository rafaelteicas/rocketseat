import { Outlet } from 'react-router-dom'
import { globalStyles } from './styles/global'
import { Header } from './components/header'
import { Container } from './app-styles'

globalStyles()

export function App() {
  return (
    <Container>
      <Header />
      <section>
        <Outlet />
      </section>
    </Container>
  )
}
