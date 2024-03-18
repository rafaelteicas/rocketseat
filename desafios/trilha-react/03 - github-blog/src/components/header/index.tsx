import { HeaderContainer } from './styles'
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} width={148} height={98} alt="" className="logo" />
    </HeaderContainer>
  )
}
