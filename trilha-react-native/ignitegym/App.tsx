import { Loading } from '@components/Loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Routes } from '@routes/index';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { AuthContextProvider } from 'src/context/AuthContext';

import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
