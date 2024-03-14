import { createStitches } from '@stitches/react'

export const {
  theme,
  config,
  prefix,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  reset,
  styled,
} = createStitches({
  theme: {
    colors: {
      blue: '#3294F8',
      baseTitle: '#E7EDF4',
      baseSubtitle: ' #C4D4E3',
      baseText: '#AFC2D4 ',
      baseSpan: '#7B96B2',
      baseLabel: '#3A536B',
      baseBorder: '#1C2F41',
      basePost: '#112131 ',
      baseProfile: '#0B1B2B',
      baseBackground: '#071422',
      baseInput: '#040F1A',
    },
    fontSizes: {
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
    },
    space: {
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '3rem',
    },
    fonts: {
      default: 'Nunito, sans-serif',
    },
    fontWeights: {
      regular: '400',
      bold: '700',
    },
  },
})
