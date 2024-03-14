import { HTMLAttributes, InputHTMLAttributes, forwardRef } from 'react'
import { InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerProps?: HTMLAttributes<HTMLDivElement>
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ containerProps, ...inputProps }: InputProps, ref) => {
    return (
      <InputContainer {...containerProps}>
        <input {...inputProps} ref={ref} />
      </InputContainer>
    )
  },
)
