import styles from './Card.module.css'
import trash from '../assets/trash.svg'
import checked from '../assets/checked.svg'

interface CardProps {
  task: string
  completed: boolean
  removeTask: () => void
  completeTask: () => void
}

export function Card({ task, completed, removeTask, completeTask }: CardProps) {
  const isCompleted = completed ? styles.checked : styles.unchecked
  return (
    <div className={styles.card}>
      <div className={styles.task}>
        <div
          className={`${styles.checkbox} ${isCompleted}`}
          onClick={completeTask}
        >
          {completed && <img src={checked} />}
        </div>
        <p className={completed ? styles.completed : styles.uncompleted}>
          {task}
        </p>
      </div>
      <img
        src={trash}
        alt="trash"
        width={14}
        height={14}
        onClick={removeTask}
      />
    </div>
  )
}
