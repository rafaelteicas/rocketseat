import { styled } from '../../styles'
import bg from '../../assets/bg.svg'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: 296,
  background: `url(${bg})`,
  overflow: 'hidden',
  zIndex: '-1',
  userSelect: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  'img[class="logo"]': {
    marginTop: 64,
  },
})
