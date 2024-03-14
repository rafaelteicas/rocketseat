import styled, { css } from 'styled-components'

export const CartContainer = styled.form`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;

  h2 {
    font-size: 1.25rem;
    line-height: 1.3;
    color: ${(props) => props.theme['base-subtitle']};
    margin-bottom: 1rem;
    font-family: 'Baloo 2', sans-serif;

    @media (max-width: 1280px) {
      display: none;
    }
  }

  @media (max-width: 1280px) {
    display: flex;
    gap: 0rem;
    flex-direction: column;
  }
`

interface CartBoxProps {
  totalBox?: boolean
}

export const CartBox = styled.div<CartBoxProps>`
  background-color: ${(props) => props.theme['base-card']};
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  table {
    color: ${(props) => props.theme['base-text']};
    font-weight: 400;
    border-spacing: 0 1rem;

    tr {
      &:nth-child(3) {
        th,
        td {
          color: ${(props) => props.theme['base-subtitle']};
          line-height: 1.3;
          font-weight: 600;
          font-size: 1.3rem;
        }
      }
    }

    th {
      text-align: left;
      font-weight: 400;
      font-size: 0.875rem;
    }

    td {
      font-size: 1rem;
      text-align: right;
    }
  }

  ${(props) =>
    props.totalBox &&
    css`
      border-top-right-radius: 44px;
      border-bottom-left-radius: 44px;
      justify-content: space-between;
      align-self: self-start;
    `}
`

interface HeaderContainerProps {
  color?: 'yellow-dark' | 'purple'
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  line-height: 1.3;
  margin-bottom: 2rem;

  h4 {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1rem;
    font-weight: 400;
  }

  p {
    color: ${(props) => props.theme['base-text']};
    font-size: 0.875rem;
  }

  svg {
    color: ${(props) => props.theme[props.color || 'yellow-dark']};
  }
`
