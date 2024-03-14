import { formatDistanceToNow, parseISO } from 'date-fns'
import { CardContainer } from './styles'
import { ptBR } from 'date-fns/locale/pt-BR'

interface CardProps {
  id: number
  title: string
  time: string
  body: string
}

export function Card({ id, body, time, title }: CardProps) {
  return (
    <CardContainer to={`/article/${id}`}>
      <aside>
        <h2>{title}</h2>
        <span>Há {formatDistanceToNow(parseISO(time), { locale: ptBR })}</span>
      </aside>
      <p>{body}</p>
    </CardContainer>
  )
}
