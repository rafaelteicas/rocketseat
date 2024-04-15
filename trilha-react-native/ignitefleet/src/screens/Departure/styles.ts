import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const Message = styled.Text`
  color: ${(props) => props.theme.COLORS.WHITE};
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin: 24px;
`
