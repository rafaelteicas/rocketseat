import { styled } from '../../styles'

export const ProfileContainer = styled('header', {
  display: 'flex',
  flex: 1,
  backgroundColor: '$baseProfile',
  padding: '2rem',
  borderRadius: 8,
  gap: '2rem',
  transform: 'translate(0, -40%)',

  img: {
    width: 148,
    height: 148,
    borderRadius: 8,
  },
})

export const ProfileContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

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

  'div[class="profile-name"]': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    a: {
      textDecoration: 'none',
      fontSize: '$sm',
      fontWeight: '$bold',
      color: '$blue',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
})
