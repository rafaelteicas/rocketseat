import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 2rem;
    font-weight: bolder;
    font-family: 'Baloo 2', serif;
  }

  @media (max-width: 1280px) {
    align-items: center;
  }
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 80px;
  grid-column-gap: 40px;
  margin-top: 5rem;

  @media (max-width: 1280px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`
