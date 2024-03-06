import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeTypes = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes {}
}
