import styled from 'styled-components'

export const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  min-height: 50vh;

  @media (max-width: 1280px) {
    flex-direction: column;
    width: 100%;

    img {
      max-width: 500px;
      width: 90%;
    }
  }
`

export const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: ${(props) => props.theme['base-title']};
    font-family: 'Baloo 2', serif;
    line-height: 1;
    font-size: 3rem;
    font-weight: bolder;
  }
  p {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1.25rem;
    line-height: 1;
  }
`

interface ItemContainerProps {
  spanColor?: string
}

export const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  p {
    color: ${(props) => props.theme['base-text']};
    font-size: 1rem;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme[props.spanColor || 'purple']};
    padding: 0.4rem;
    border-radius: 9999px;
  }
`

export const Items = styled.div`
  display: grid;
  margin-top: 10%;
  gap: 2rem;
  grid-template-columns: repeat(2, 2fr);

  @media (max-width: 1280px) {
    display: flex;
    flex-wrap: wrap;
  }
`

export const HeroBackground = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;

  img {
    width: 100vw;
  }
`
