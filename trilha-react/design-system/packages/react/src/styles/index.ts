import {
  colors,
  fontSizes,
  fonts,
  fontWeights,
  lineHeights,
  radii,
  space,
} from '@rafaelteicas-ignite-ui/tokens'
import { createStitches, defaultThemeMap } from '@stitches/react'

export const {
  theme,
  config,
  prefix,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  reset,
} = createStitches({
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
  },
  theme: {
    colors,
    fontSizes,
    fonts,
    radii,
    fontWeights,
    lineHeights,
    space,
  },
})
