import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 0 32px 24px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.XL}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
`
