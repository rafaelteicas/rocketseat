import { InputHTMLAttributes, forwardRef } from 'react'
import { InputContainer } from './styles'

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <InputContainer ref={ref} placeholder="Buscar conteúdo" {...props} />
})

Input.displayName = 'Input'
