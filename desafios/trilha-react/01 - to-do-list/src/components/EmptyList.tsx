import styles from './EmptyList.module.css'
import list from '../assets/list.svg'

export function EmptyList() {
  return (
    <div className={styles.empty_list}>
      <img src={list} width={56} height={56} />
      <b>Você ainda não tem tarefas cadastradas</b>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
