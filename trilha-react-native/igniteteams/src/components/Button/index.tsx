import React from 'react'
import { Container, Title, ButtonTypeStyleProps } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Button = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button({title, type = "PRIMARY", ...rest} : Button) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
