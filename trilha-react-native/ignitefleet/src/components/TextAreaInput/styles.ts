import { TextInput } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Label = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_300};
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
`

export const Input = styled(TextInput)`
  color: ${(props) => props.theme.COLORS.GRAY_200};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
  vertical-align: top;
  margin-top: 16px;
`
