import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'center',
  height: 296,
  overflow: 'hidden',

  'img[class="bg"]': {
    position: 'absolute',
    zIndex: '-1',
    userSelect: 'none',
    height: 296,
    width: '100%',
    objectFit: 'cover',
  },
  'img[class="logo"]': {
    marginTop: 64,
  },
})
