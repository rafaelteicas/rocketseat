import { HeaderContainer } from './styles'
import bg from '../../assets/bg.svg'
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} width={148} height={98} alt="" className="logo" />
      <img src={bg} alt="" className="bg" />
    </HeaderContainer>
  )
}
