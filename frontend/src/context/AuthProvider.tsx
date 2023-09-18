import React, { useEffect, useState } from 'react'
import AuthContext from './authContext'
import { LoginSignUpFormData, User, login, signUp } from '../shared/api/auth'
import { EVENT_STORATE_UNAUTH } from 'shared/constants'
import { ApiSuccessResponse, ApiErrorResponse } from 'shared/api'

type Props = { children: React.ReactNode }

export type LocalStorageUser = { userId?: string; profileId?: string | null }
const AuthProvider = (props: Props) => {
  const { children } = props
  const [user, setUser] = React.useState<LocalStorageUser>(() =>
    JSON.parse(localStorage.getItem('user') || '{}'),
  )
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const onUnAuthenticated = () => {
      setUser({})
      localStorage.removeItem('user')
    }
    document.addEventListener(EVENT_STORATE_UNAUTH, onUnAuthenticated)

    return () => {
      document.removeEventListener(EVENT_STORATE_UNAUTH, onUnAuthenticated)
    }
  }, [])

  const signin = async (
    userData: LoginSignUpFormData,
    callback: (result: ApiSuccessResponse<User> | ApiErrorResponse) => void,
  ) => {
    const response = await login(userData)
    if (response.isOk) {
      const loggedUser = {
        userId: response.data.id,
        profileId: response.data?.profile?.id,
      }
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
    }
    callback(response)
  }

  const register = async (
    userData: LoginSignUpFormData,
    callback: (result: ApiSuccessResponse<User> | ApiErrorResponse) => void,
  ) => {
    const response = await signUp(userData)
    if (response.isOk) {
      const loggedUser = {
        userId: response.data.id,
        profileId: null,
      }
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
    }
    callback(response)
  }

  const value = {
    user,
    signin,
    register,
    authModalOpen,
    setAuthModalOpen,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
