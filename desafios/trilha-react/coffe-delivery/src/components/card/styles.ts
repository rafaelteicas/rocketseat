import styled from 'styled-components'

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme['base-card']};
  width: 256px;
  height: 310px;
  border-radius: 6px;
  border-top-right-radius: 36px;
  border-bottom-left-radius: 36px;
  padding: 1.5rem;

  img {
    position: absolute;
    transform: translate(0%, -30%);
    width: 120px;
    height: 120px;
    top: 0;
  }
`

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 0.3rem;

  p {
    color: ${(props) => props.theme['base-label']};
    font-size: 0.875rem;
    line-height: 1.3;
    text-align: center;
  }

  h3 {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1.3rem;
    font-weight: bold;
  }

  span {
    background-color: ${(props) => props.theme['yellow-light']};
    text-transform: uppercase;
    font-size: 0.6rem;
    font-weight: bold;
    padding: 0.4rem;
    border-radius: 9999px;
    color: ${(props) => props.theme['yellow-dark']};
  }
`

export const CartActions = styled.footer`
  display: flex;
  justify-content: space-between;
`

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 38px;

  button {
    border: none;
    background: ${(props) => props.theme['purple-dark']};
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.purple};
    }
  }
`

export const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  p {
    color: ${(props) => props.theme['base-text']};
    font-size: 0.875rem;
    line-height: 1.3;
  }

  h1 {
    color: ${(props) => props.theme['base-text']};
    font-size: 1.5rem;
    line-height: 1.3;
    font-weight: 900;
  }
`
export const Selector = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 72px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme['base-button']};
  border-radius: 6px;
  padding: 0.5rem;

  svg {
    color: ${(props) => props.theme.purple};
    font-size: 0.875rem;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme['purple-dark']};
    }
  }

  p {
    color: ${(props) => props.theme['base-title']};
    font-size: 1rem;
    line-height: 1.3;
  }
`
