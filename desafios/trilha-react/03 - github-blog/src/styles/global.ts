import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    background: '$baseBackground',
    color: '$baseText',
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 18rem $5xl',
    '-webkit-font-smoothing': 'antialiased',
  },

  ':focus': {
    outline: 0,
    boxShadow: '0 0 0 2px $baseSpan',
  },

  'body, input, textarea, button': {
    fontFamily: '$default',
    lineHeight: 1.6,
    fontWeight: '$regular',
  },

  h1: { color: '$baseTitle', fontSize: '$3xl', fontWeight: '$bold' },
})
