import React from 'react'
import { Container, Greeting, Name, Picture } from './styled'
import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'
import { useApp, useUser } from '@realm/react'
import theme from '../../theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()

  const { top } = useSafeAreaInsets()

  function handleLogout() {
    app.currentUser.logOut()
  }

  return (
    <Container style={{ paddingTop: top + 32 }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>Olá</Greeting>
      <Name>Rafael</Name>
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
