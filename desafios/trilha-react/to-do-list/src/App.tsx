import { FormEvent, useState } from 'react'
import styles from './App.module.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { EmptyList } from './components/EmptyList'
import { Header } from './components/Header'
import { Input } from './components/Input'
import './global.css'

interface Tasks {
  id: string
  task: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [input, setInput] = useState('')

  const finishedTasks = tasks.reduce((acc, tasks) => {
    if (tasks.completed) {
      return acc + 1
    }
    return acc
  }, 0)

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newTask: Tasks = {
      id: Date.now().toString(),
      task: input,
      completed: false,
    }
    setTasks((tasks) => [...tasks, newTask])
    setInput('')
  }

  function handleDeleteTask(taskId: string) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
  }

  function handleCompleteTask(taskId: string) {
    const updateTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        }
      } else {
        return task
      }
    })
    setTasks(updateTask)
  }

  return (
    <main>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={createTask}>
          <Input
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button type="submit">Criar</Button>
        </form>
        <section className={styles.list}>
          <div className={styles.counter}>
            <aside>
              Tarefas criadas <span>{tasks.length}</span>
            </aside>
            <aside>
              Concluídas
              <span>
                {finishedTasks} de {tasks.length}
              </span>
            </aside>
          </div>
          {tasks.length > 0 ? (
            tasks
              .sort((a, b) => {
                if (a.completed && !b.completed) return 1
                if (!a.completed && b.completed) return -1
                return 0
              })
              .map((task) => (
                <Card
                  key={task.id}
                  completed={task.completed}
                  task={task.task}
                  removeTask={() => handleDeleteTask(task.id)}
                  completeTask={() => handleCompleteTask(task.id)}
                />
              ))
          ) : (
            <EmptyList />
          )}
        </section>
      </div>
    </main>
  )
}
export default App
