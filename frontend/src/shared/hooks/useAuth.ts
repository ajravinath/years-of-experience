import { useContext } from 'react'
import AuthContext from '../../context/authContext'

const useAuth = (profileId?: string): [boolean, boolean] => {
  const auth = useContext(AuthContext)
  const isAuthenticated = Boolean(auth.user.userId)
  const isMyProfile = Boolean(
    isAuthenticated && profileId && auth.user.profileId && auth.user.profileId === profileId,
  )
  return [isAuthenticated, isMyProfile] as [boolean, boolean]
}

export default useAuth
