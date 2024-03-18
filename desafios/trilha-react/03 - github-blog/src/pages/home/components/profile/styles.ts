import { styled } from '../../../../styles'

export const ProfileContainer = styled('header', {
  display: 'flex',
  flex: 1,
  backgroundColor: '$baseProfile',
  padding: '2rem',
  borderRadius: 8,
  gap: '2rem',
  marginTop: 'calc(-212px * 0.4)',

  '@media (max-width:768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },

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
    flexDirection: 'column',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: 'auto',

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
