import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const dimensions = Dimensions.get('window')

export const Container = styled.View`
  width: ${dimensions.width}px;
  position: absolute;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
  margin-left: 4px;
`
