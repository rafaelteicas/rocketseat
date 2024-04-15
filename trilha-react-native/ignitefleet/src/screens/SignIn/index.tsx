import React, { useState } from 'react'
import { Container, Slogan, Title } from './styles'
import background from '../../assets/background.png'
import { Button } from '../../components/Button'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { Alert } from 'react-native'
import { Realm, useApp } from '@realm/react'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const app = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)
      const { idToken } = await GoogleSignin.signIn()
      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)
        await app.logIn(credentials)
      } else {
        return Alert.alert('Não foi possível entrar com a conta Google')
      }
    } catch (error) {
      console.log(error)
      return Alert.alert('Não foi possível entrar com a conta Google')
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={background}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão e uso de veículos</Slogan>
      <Button
        disabled={isAuthenticating}
        title="Entrar com o Google"
        onPress={handleGoogleSignIn}
      />
    </Container>
  )
}
