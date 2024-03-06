import styles from './Button.module.css'
import { ButtonHTMLAttributes } from 'react'
import plus from '../assets/plus.svg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
      <img src={plus} alt="icon" />
    </button>
  )
}
