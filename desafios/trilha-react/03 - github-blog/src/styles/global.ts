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
})
