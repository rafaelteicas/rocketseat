import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import React from 'react';

export type AuthRoutesProps = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps<T extends keyof AuthRoutesProps> = NativeStackScreenProps<
  AuthRoutesProps,
  T
>;

const Stack = createNativeStackNavigator<AuthRoutesProps>();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
    </Stack.Navigator>
  );
}
