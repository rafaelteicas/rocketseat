import React from 'react'
import { Container, Title } from './styled'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title: string
}

export function Header({ title }: Props) {
  const { top } = useSafeAreaInsets()
  const theme = useTheme()
  const { goBack } = useNavigation()

  return (
    <Container style={{ paddingTop: top + 42 }}>
      <TouchableOpacity onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={theme.COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <Title>{title}</Title>
    </Container>
  )
}
