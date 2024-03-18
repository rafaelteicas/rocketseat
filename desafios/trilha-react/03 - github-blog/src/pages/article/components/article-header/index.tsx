import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArticleHeaderActions, ArticleHeaderContainer } from './styles'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faCalendar,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ArticleHeaderProps {
  title: string
  url: string
  user: string
  comments: number
  date: string
}

export function ArticleHeader({
  title,
  url,
  user,
  comments,
  date,
}: ArticleHeaderProps) {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <ArticleHeaderContainer>
      <ArticleHeaderActions>
        <a onClick={handleGoBack}>
          <FontAwesomeIcon icon={faAngleLeft} />
          Voltar
        </a>
        <a href={url} target="_blank" rel="noreferrer">
          Ver no Github
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </ArticleHeaderActions>
      <h2>{title}</h2>
      <footer>
        <p>
          <FontAwesomeIcon icon={faGithub} />
          {user}
        </p>
        <p>
          <FontAwesomeIcon icon={faCalendar} />
          {formatDistanceToNowStrict(date, { locale: ptBR })}
        </p>
        {comments > 0 && (
          <p>
            <FontAwesomeIcon icon={faComment} />
            {comments} comentários
          </p>
        )}
      </footer>
    </ArticleHeaderContainer>
  )
}
