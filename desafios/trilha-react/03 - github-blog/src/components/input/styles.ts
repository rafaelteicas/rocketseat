import { styled } from '../../styles'

export const InputContainer = styled('input', {
  display: 'flex',
  flex: 1,
  backgroundColor: '$baseInput',
  color: '$baseText',
  border: 'none',
  borderRadius: 4,
  boxShadow: '0px 0px 0px 1px $colors$baseBorder',
  padding: '0.75rem 1rem',
  fontSize: '$lg',
  lineHeight: 1,

  '&:focus': {
    boxShadow: '0px 0px 0px 1px $colors$blue',
  },

  '&::placeholder': {
    color: '$baseLabel',
  },
})
