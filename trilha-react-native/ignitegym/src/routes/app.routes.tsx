import HistoryIcon from '@assets/history.svg';
import HomeIcon from '@assets/home.svg';
import ProfileIcon from '@assets/profile.svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { useTheme } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

export type AppRoutesProps = {
  home: undefined;
  exercise: {
    exerciseId: string;
  };
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps<T extends keyof AppRoutesProps> = NativeStackScreenProps<
  AppRoutesProps,
  T
>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const ICON_SIZE = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />,
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoryIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
          ),
        }}
      />
      <Screen name="exercise" component={Exercise} options={{ tabBarButton: () => null }} />
    </Navigator>
  );
}
