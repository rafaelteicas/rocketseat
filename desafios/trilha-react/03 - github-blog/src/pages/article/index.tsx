import { useState, useEffect } from 'react'
import { ArticleHeader } from '../../components/article-header'
import { ArticleContainer } from './styles'
import { useParams } from 'react-router-dom'
import { Markdown } from '../../components/markdown'

interface ArticleDataType {
  body: string
  title: string
  html_url: string
  user: {
    login: string
  }
  comments: number
  created_at: string
}

export function Article() {
  const { id } = useParams()
  const [articleData, setArticleData] = useState<ArticleDataType>()

  async function getArticleData() {
    const response = await fetch(
      `https://api.github.com/repos/rafaelteicas/rocketseat/issues/${id}`,
    )
    return response.json()
  }

  useEffect(() => {
    getArticleData().then((data) => setArticleData(data))
  }, [])

  if (articleData) {
    return (
      <div>
        <ArticleHeader
          title={articleData.title}
          comments={articleData.comments}
          url={articleData.html_url}
          user={articleData.user.login}
          date={articleData.created_at}
        />
        <ArticleContainer>
          <Markdown>{articleData.body}</Markdown>
        </ArticleContainer>
      </div>
    )
  }
}
