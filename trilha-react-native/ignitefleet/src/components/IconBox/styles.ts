import styled, { css } from 'styled-components/native'

export type SizeProps = 'SMALL' | 'NORMAL'

type Props = {
  size: SizeProps
}

const variantSizeStyles = (size: SizeProps) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    BIG: css`
      width: 46px;
      height: 46px;
    `,
  }[size]
}

export const Container = styled.View<Props>`
  border-radius: 6px;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  ${({ size }) => variantSizeStyles(size)}
`
