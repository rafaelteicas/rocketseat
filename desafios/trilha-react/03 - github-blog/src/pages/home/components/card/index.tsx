import { formatDistanceToNowStrict } from 'date-fns'
import { PostCardContainer, CardContent } from './styles'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Markdown } from '../../../../components/markdown'

interface PostCardProps {
  id: number
  title: string
  time: string
  body: string
}

export function PostCard({ id, body, time, title }: PostCardProps) {
  return (
    <PostCardContainer to={`/article/${id}`}>
      <header>
        <h2>{title}</h2>
        <span>
          Há{' '}
          {formatDistanceToNowStrict(time, {
            locale: ptBR,
          })}
        </span>
      </header>
      <CardContent>
        <Markdown>{body}</Markdown>
      </CardContent>
    </PostCardContainer>
  )
}
