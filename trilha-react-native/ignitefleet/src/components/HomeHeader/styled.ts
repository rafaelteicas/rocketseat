import styled from 'styled-components/native'
import { Image } from 'expo-image'

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const Message = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
`

export const Name = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.LG}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
`

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`
