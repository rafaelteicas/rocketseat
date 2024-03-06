import styles from './Header.module.css'
import toDoLogo from '../assets/to-do-logo.svg'

export function Header() {
  return (
    <div className={styles.header}>
      <img width={22} height={36} src={toDoLogo} alt="Logo" />
      <h1>
        to<span>do</span>
      </h1>
    </div>
  )
}
