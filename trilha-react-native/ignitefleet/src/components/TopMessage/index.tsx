import React from 'react'
import { Container, Title } from './styles'
import { IconBoxProps } from '../ButtonIcon'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  icon?: IconBoxProps
  title: string
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme()
  const { top } = useSafeAreaInsets()

  return (
    <Container style={{ paddingTop: top + 5 }}>
      {Icon && <Icon color={COLORS.GRAY_100} size={18} />}
      <Title>{title}</Title>
    </Container>
  )
}
