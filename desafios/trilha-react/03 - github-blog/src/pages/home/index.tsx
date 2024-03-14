import { useEffect, useState } from 'react'
import { Card } from '../../components/card'
import { Input } from '../../components/input'
import { Profile } from '../../components/profile'
import { HomeContainer, PostsContainer, PostsContent } from './styles'

interface ArticleType {
  number: number
  title: string
  time: Date
  body: string
  created_at: string
}

interface ArticleProps {
  items: ArticleType[]
}
export function Home() {
  const [articles, setArticles] = useState<ArticleType[]>([])

  useEffect(() => {
    getArticles().then((article) => setArticles(article.items))
  }, [])

  async function getArticles(): Promise<ArticleProps> {
    const response = await fetch(
      'https://api.github.com/search/issues?q=repo:rafaelteicas/rocketseat',
    )
    return response.json()
  }

  if (articles) {
    return (
      <HomeContainer>
        <Profile />
        <PostsContainer>
          <h3>Publicações</h3>
          <Input />
          <PostsContent>
            {articles.map((article) => (
              <Card
                key={article.number}
                title={article.title}
                id={article.number}
                body={article.body}
                time={article.created_at}
              />
            ))}
          </PostsContent>
        </PostsContainer>
      </HomeContainer>
    )
  }
}
