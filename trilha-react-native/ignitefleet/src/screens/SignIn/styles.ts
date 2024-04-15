import styled from 'styled-components/native'

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${(props) => props.theme.COLORS.GRAY_800};
`

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.BRAND_LIGHT};
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
  font-size: ${(props) => props.theme.FONT_SIZE.XXXL}px;
  text-align: center;
`

export const Slogan = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  text-align: center;
  margin: 32px;
`
