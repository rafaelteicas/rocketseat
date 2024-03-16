import { formatDistanceToNowStrict } from 'date-fns'
import { CardContainer, CardContent } from './styles'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Markdown } from '../markdown'

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
        <span>
          Há{' '}
          {formatDistanceToNowStrict(time, {
            locale: ptBR,
          })}
        </span>
      </aside>
      <CardContent>
        <Markdown>{body}</Markdown>
      </CardContent>
    </CardContainer>
  )
}
