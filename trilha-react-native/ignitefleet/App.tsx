import 'react-native-get-random-values'
import './src/libs/dayjs'

import React from 'react'
import { SignIn } from './src/screens/SignIn'
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import Loading from './src/components/Loading'
import { StatusBar } from 'expo-status-bar'
import { AppProvider, UserProvider } from '@realm/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider, syncConfig } from './src/libs/realm'
import { Routes } from './src/routes'
import { TopMessage } from './src/components/TopMessage'
import { WifiSlash } from 'phosphor-react-native'
import { useNetInfo } from '@react-native-community/netinfo'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const netInfo = useNetInfo()

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id="">
      <SafeAreaProvider
        style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
      >
        <ThemeProvider theme={theme}>
          {!netInfo.isConnected && (
            <TopMessage title="Você está offline" icon={WifiSlash} />
          )}
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  )
}
