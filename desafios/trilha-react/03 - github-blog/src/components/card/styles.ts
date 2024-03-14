import { styled } from '../../styles'
import { Link } from 'react-router-dom'

export const CardContainer = styled(Link, {
  padding: '2rem 2rem',
  backgroundColor: '$basePost',
  height: 260,
  borderRadius: 10,
  cursor: 'pointer',

  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
  color: 'inherit',
  flexDirection: 'column',
  flex: 1,

  aside: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  h2: {
    fontWeight: 'bold',
    fontSize: '$2xl',
    color: '$baseTitle',
    wordWrap: 'break-word',
    display: 'inline-block',
  },

  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 4,
    display: '-webkit-box',
  },

  span: {
    whiteSpace: 'nowrap',
    fontSize: '$sm',
  },

  '&:hover': {
    boxShadow: '0px 0px 0px 2px $colors$baseLabel',
  },
})
