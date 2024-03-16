import { styled } from '../../styles'

export const HomeContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
})

export const PostsContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  header: {
    display: 'flex',
    justifyContent: 'space-between',

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
  gridTemplateColumns: '1fr 1fr',
  gap: '$4xl',
  marginTop: '$5xl',
})
