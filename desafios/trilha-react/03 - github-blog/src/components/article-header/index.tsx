import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArticleHeaderActions, ArticleHeaderContainer } from './styles'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'

interface ArticleHeaderProps {
  title: string
  url: string
  user: string
  comments: number
}

export function ArticleHeader({
  title,
  url,
  user,
  comments,
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
        <a href={url}>
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
          <FontAwesomeIcon icon={faGithub} />
          Rocketseat
        </p>
        {comments && <p>{comments} comentários</p>}
      </footer>
    </ArticleHeaderContainer>
  )
}
