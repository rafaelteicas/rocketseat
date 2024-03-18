import { useCallback, useEffect, useMemo, useState } from 'react'
import { PostCard } from './components/card'
import { Input } from '../../components/input'
import { HomeContainer, PostsContainer, PostsContent } from './styles'
import { Profile } from './components/profile'

interface ArticleType {
  number: number
  title: string
  time: Date
  body: string
  created_at: string
}

export function Home() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getArticles().then((article) => setArticles(article.items))
  }, [])

  const getArticles = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = decodeURIComponent(
        'https://api.github.com/search/issues?' +
          new URLSearchParams({
            q: 'repo:rafaelteicas/rocketseat',
          }),
      )
      const response = await fetch(url)

      const articles = await response.json()

      return articles
    } catch (er) {
      console.log(er)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filteredData = useMemo(() => {
    if (searchInput) {
      return articles.filter((article) =>
        article.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    }
    return articles
  }, [articles, searchInput])

  return (
    <HomeContainer>
      {isLoading ? (
        <b>Carregando</b>
      ) : (
        <PostsContainer>
          <Profile />
          <div className="postsInfo">
            <h3>Publicações</h3>
            <p>{articles.length} publicações</p>
          </div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <PostsContent>
            {filteredData.map((article) => (
              <PostCard
                key={article.number}
                title={article.title}
                id={article.number}
                body={article.body}
                time={article.created_at}
              />
            ))}
          </PostsContent>
        </PostsContainer>
      )}
    </HomeContainer>
  )
}
