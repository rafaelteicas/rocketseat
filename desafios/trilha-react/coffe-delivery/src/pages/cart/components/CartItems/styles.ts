import { styled } from 'styled-components'
import { Selector as SelectorCard } from '../../../../components/card/styles'

export const CartItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &:nth-child(n + 2) {
    margin-top: 1rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    flex: 1;
  }
`
export const ConfirmButton = styled.button`
  background: ${(props) => props.theme.yellow};
  text-transform: uppercase;
  color: ${(props) => props.theme.white};
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: bold;
  cursor: pointer;
  height: 46px;
`

export const ItemInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  line-height: 1.3;
  font-size: 1rem;

  p {
    color: ${(props) => props.theme['base-subtitle']};
    font-weight: 400;
  }

  p:nth-child(2) {
    color: ${(props) => props.theme['base-text']};
    font-weight: bold;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 5px;
`

export const Separator = styled.hr`
  margin: 0;
  border-style: none;
  box-shadow: 0 0 0 0.5px ${(props) => props.theme['base-button']};
`

export const Selector = styled(SelectorCard)`
  max-height: 32px;
  max-width: 72px;
`

export const Remove = styled.div`
  background-color: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};
  font-size: 0.75rem;
  width: 91px;
  max-height: 32px;
  text-decoration: uppercase;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    color: ${(props) => props.theme.purple};
  }
`
