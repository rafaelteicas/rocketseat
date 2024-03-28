import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Groups } from '@screens/Groups'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'

export type AppStackProps = {
  groups: undefined;
  new: undefined;
  players: {
    group: string;
  }
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackProps>()

export function AppRoutes() {
  return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name='groups'
          component={Groups}
        />
        <Screen
          name='new'
          component={NewGroup}
        />
        <Screen
          name='players'
          component={Players}
        />
      </Navigator>
  )
}
