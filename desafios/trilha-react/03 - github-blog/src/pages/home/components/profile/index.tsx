import { ProfileContainer, ProfileContent } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'

interface ProfileProps {
  name: string
  bio: string
  avatar_url: string
  login: string
  followers: number
  html_url: string
}

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({} as ProfileProps)

  useEffect(() => {
    getUserData().then((user) => setUserData(user))
  }, [])

  async function getUserData() {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.github.com/users/rafaelteicas ')
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileContainer>
      {isLoading ? (
        <b>Carregando</b>
      ) : (
        <>
          <img src={userData.avatar_url} alt="avatar" />
          <ProfileContent>
            <header>
              <div className="profile-name">
                <h1>{userData.name}</h1>
                <a href={userData.html_url} target="_blank" rel="noreferrer">
                  GITHUB <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              </div>
            </header>
            <p>{userData.bio}</p>
            <footer>
              <p>
                <FontAwesomeIcon icon={faGithub} />
                {userData.login}
              </p>
              <p>
                <FontAwesomeIcon icon={faBuilding} />
                Rocketseat
              </p>
              <p>
                <FontAwesomeIcon icon={faUserGroup} />
                {userData.followers} seguidores
              </p>
            </footer>
          </ProfileContent>
        </>
      )}
    </ProfileContainer>
  )
}
