import { Outlet } from 'react-router-dom'
import { globalStyles } from './styles/global'
import { Header } from './components/header'

globalStyles()

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
