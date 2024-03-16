import { useEffect, useMemo, useState } from 'react'
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

interface UserDataProps {
  name: string
  login: string
  avatar_url: string
  html_url: string
  bio: string
  followers: number
}

export function Home() {
  const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps)
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    getArticles().then((article) => setArticles(article.items))
    getUser().then((user) => setUserData(user))
  }, [])

  const getArticles = useMemo(
    () => async () => {
      const url = decodeURIComponent(
        'https://api.github.com/search/issues?' +
          new URLSearchParams({
            q: 'repo:rafaelteicas/rocketseat',
          }),
      )
      const response = await fetch(url, {
        cache: 'no-cache',
      })

      return response.json()
    },
    [],
  )

  const getUser = useMemo(
    () => async () => {
      const response = await fetch(
        'https://api.github.com/users/rafaelteicas',
        {
          cache: 'no-cache',
        },
      )
      return response.json()
    },
    [],
  )

  const filteredData = useMemo(() => {
    return articles.filter((article) => {
      return article.title.toLowerCase().includes(searchInput.toLowerCase())
    })
  }, [searchInput, articles])

  return (
    <HomeContainer>
      <Profile
        name={userData.name}
        avatarUrl={userData.avatar_url}
        profileUrl={userData.html_url}
        bio={userData.bio}
        login={userData.login}
        followers={userData.followers}
      />
      <PostsContainer>
        <header>
          <h3>Publicações</h3>
          <p>{articles.length} publicações</p>
        </header>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <PostsContent>
          {filteredData.map((article) => (
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
