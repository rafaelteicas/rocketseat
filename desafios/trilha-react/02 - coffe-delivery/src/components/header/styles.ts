import styled from 'styled-components'
import { MapPin, ShoppingCart } from 'phosphor-react'

export const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;

  img {
    cursor: pointer;
  }

  @media (max-width: 1280px) {
    padding: 2rem 0;
  }
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-height: 38px;
`

export const LocalCard = styled.div`
  color: ${(props) => props.theme['purple-dark']};
  background-color: ${(props) => props.theme['purple-light']};
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.3;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 5px;
`

export const Cart = styled.button`
  position: relative;
  background: ${(props) => props.theme['yellow-light']};
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
  }
`

interface CartProps {
  width?: string
  height?: string
  color?: string
}

export const CartIcon = styled(ShoppingCart)<CartProps>`
  fill: ${(props) => props.theme[props.color || 'yellow-dark']};
  width: ${(props) => props.width || '1.125rem'};
  height: ${(props) => props.weight || '1.125rem'};
`

export const MapIcon = styled(MapPin)`
  fill: ${(props) => props.theme.purple};
  width: 1.125rem;
  height: 1.125rem;
`

export const CartCounter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 12px;
  color: ${(props) => props.theme.white};
  font-weight: bold;
  background-color: ${(props) => props.theme['yellow-dark']};
  border-radius: 100%;
  right: -7px;
  top: -7px;
  width: 20px;
  height: 20px;
`
