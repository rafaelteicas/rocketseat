import {
  ButtonsContainer,
  Cart,
  CartCounter,
  CartIcon,
  HeaderContainer,
  LocalCard,
  MapIcon,
} from './styles'
import logo from '../../assets/icons/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export function Header() {
  const { items } = useCart()

  const navigate = useNavigate()

  function handleNavigateToHomePage() {
    navigate('/')
  }

  function handleNavigateToCartPage() {
    navigate('/cart')
  }

  return (
    <HeaderContainer>
      <img src={logo} alt="logo" onClick={handleNavigateToHomePage} />
      <ButtonsContainer>
        <LocalCard>
          <MapIcon weight="fill" />
          Porto Alegre, RS
        </LocalCard>
        <Cart onClick={handleNavigateToCartPage} disabled={items.length === 0}>
          {items && items.length > 0 && (
            <CartCounter>{items.length}</CartCounter>
          )}
          <CartIcon weight="fill" size={16} />
        </Cart>
      </ButtonsContainer>
    </HeaderContainer>
  )
}
