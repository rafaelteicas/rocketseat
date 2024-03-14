import styled from 'styled-components'

export const SuccessContainer = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;

  h1 {
    color: ${(props) => props.theme['yellow-dark']};
    font-size: 2rem;
    line-height: 1.3;
    font-family: 'Baloo 2', sans-serif;
  }
`

export const SuccessCard = styled.div`
  background: linear-gradient(#dbac2c, #8047f8);
  width: 1px;
  padding: 1px;
  width: 100%;
  border-radius: 6px;
  border-top-right-radius: 36px;
  border-bottom-left-radius: 36px;
  margin-top: 2rem;

  [class='content'] {
    display: flex;
    flex-direction: column;
    background: white;
    padding: 2.5rem;
    border-radius: 6px;
    border-top-right-radius: 36px;
    gap: 2rem;
    border-bottom-left-radius: 36px;
  }
`

interface ItemContainerProps {
  color?: 'purple' | 'yellow' | 'yellow-dark'
}

export const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme[props.color || 'yellow']};
    padding: 0.4rem;
    border-radius: 9999px;
  }
`
