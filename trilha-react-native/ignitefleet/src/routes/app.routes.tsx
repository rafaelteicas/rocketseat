import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '../screens/Home'
import { Departure } from '../screens/Departure'
import { Arrival } from '../screens/Arrival'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="Departure" component={Departure} />
      <Screen name="Arrival" component={Arrival} />
    </Navigator>
  )
}
