import { ProfileContainer, ProfileContent } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'

interface ProfileProps {
  name: string
  bio: string
  avatar_url: string
  login: string
  followers: string
  html_url: string
}

export function Profile() {
  const [data, setData] = useState<ProfileProps>()

  useEffect(() => {
    getData().then((data) => setData(data))
  })

  async function getData() {
    const response = await fetch('http://api.github.com/users/rafaelteicas')
    return response.json()
  }

  if (data) {
    return (
      <ProfileContainer>
        <img src={data.avatar_url} alt="avatar" />
        <ProfileContent>
          <header>
            <div className="profile-name">
              <h1>{data.name}</h1>
              <a href={data.html_url} target="_blank" rel="noreferrer">
                GITHUB <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
            <p>{data.bio}</p>
          </header>
          <footer>
            <p>
              <FontAwesomeIcon icon={faGithub} />
              {data.login}
            </p>
            <p>
              <FontAwesomeIcon icon={faGithub} />
              Rocketseat
            </p>
            <p>
              <FontAwesomeIcon icon={faGithub} />
              {data.followers} seguidores
            </p>
          </footer>
        </ProfileContent>
      </ProfileContainer>
    )
  }
}
