import { styled } from '../../../../styles'

export const ArticleHeaderContainer = styled('div', {
  display: 'flex',
  flex: 1,
  backgroundColor: '$baseProfile',
  padding: '2rem',
  borderRadius: 8,
  gap: '0.5rem',
  transform: 'translate(0, -40%)',
  flexDirection: 'column',

  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',

    p: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '$baseSubtitle',
      fontSize: '$md',
      svg: {
        color: '$baseLabel',
      },
    },
  },
})

export const ArticleHeaderActions = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flex: 1,
  textTransform: 'uppercase',
  fontSize: '$sm',
  color: '$blue',

  a: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '$blue',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
