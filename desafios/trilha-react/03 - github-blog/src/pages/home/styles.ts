import { styled } from '../../styles'

export const HomeContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
})

export const PostsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  'div[class="postsInfo"]': {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4.5rem',

    h3: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$baseSubtitle',
      marginBottom: '$sm',
    },

    p: {
      fontSize: '$md',
      color: '$baseSpan',
    },
  },
})

export const PostsContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$4xl',
  marginTop: '$5xl',

  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 260,
  },
})
