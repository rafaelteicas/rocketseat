import { ProfileContainer, ProfileContent } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

interface ProfileProps {
  name: string
  bio: string
  avatarUrl: string
  login: string
  followers: number
  profileUrl: string
}

export function Profile({
  name,
  bio,
  followers,
  avatarUrl,
  login,
  profileUrl,
}: ProfileProps) {
  return (
    <ProfileContainer>
      <img src={avatarUrl} alt="avatar" />
      <ProfileContent>
        <header>
          <div className="profile-name">
            <h1>{name}</h1>
            <a href={profileUrl} target="_blank" rel="noreferrer">
              GITHUB <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
          <p>{bio}</p>
        </header>
        <footer>
          <p>
            <FontAwesomeIcon icon={faGithub} />
            {login}
          </p>
          <p>
            <FontAwesomeIcon icon={faBuilding} />
            Rocketseat
          </p>
          <p>
            <FontAwesomeIcon icon={faUserGroup} />
            {followers} seguidores
          </p>
        </footer>
      </ProfileContent>
    </ProfileContainer>
  )
}
