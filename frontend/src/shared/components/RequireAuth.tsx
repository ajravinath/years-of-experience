import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../../context/authContext'

type Props = {
  children: JSX.Element
}

const RequireAuth = (props: Props) => {
  const { children } = props
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
