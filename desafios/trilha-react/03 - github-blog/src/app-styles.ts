import { styled } from './styles/index'

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',

  '> section': {
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 18rem',

    '@media (max-width: 1024px)': {
      padding: '2rem',
      maxWidth: '100%',
    },
  },
})
