import React from 'react'
import { Container, IconBox, Message, TextHighlight } from './styles'
import { Key, Car } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  licensePlate?: string
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
  const Icon = licensePlate ? Car : Key
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso `
    : 'Nenhum veículo em uso'

  const status = licensePlate ? 'chegada' : 'saída'

  const theme = useTheme()
  return (
    <Container {...rest}>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message style={{ textAlignVertical: 'center' }}>{message}</Message>
      <TextHighlight>Clique aqui para registrar {status}</TextHighlight>
    </Container>
  )
}
