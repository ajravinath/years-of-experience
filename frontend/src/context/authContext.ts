import { LoginSignUpFormData } from 'shared/api/auth'
import { User } from './../shared/api/auth'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { ApiSuccessResponse, ApiErrorResponse } from 'shared/api'
import { LocalStorageUser } from './AuthProvider'

export default React.createContext({
  user: {} as LocalStorageUser,
  signin: (
    _user: LoginSignUpFormData,
    _callback: (result: ApiSuccessResponse<User> | ApiErrorResponse) => void,
  ) => Promise.resolve(),
  register: (
    userData: LoginSignUpFormData,
    _callback: (result: ApiSuccessResponse<User> | ApiErrorResponse) => void,
  ) => Promise.resolve(),
  authModalOpen: false,
  setAuthModalOpen: (_isOpen: boolean) => {},
})
