import { AxiosError } from 'axios'
import { Api } from './axiosConfig'
import {
  ApiErrorResponse,
  ApiErrorResponseDTO,
  ApiSuccessResponse,
  ApiSuccessResponseDTO,
} from './types'
import { LoginPost, SignUpPost, RefreshPost } from './models'
import { ProfileDTO } from './profile'

export type LoginSignUpFormData = {
  email: string
  password: string
}

interface UserDTO {
  id: string
  email: string
  token: string
  createdAt: string
  updatedAt: string
  profile?: ProfileDTO
}

export interface User {
  id: string
  email: string
  token: string
  createdAt: string
  updatedAt: string
  profile?: ProfileDTO
}

export const AuthApi = {
  loginRequest(formData: LoginSignUpFormData) {
    return new LoginPost(formData)
  },
  signUpRequest(formData: LoginSignUpFormData) {
    return new SignUpPost(formData)
  },
  refreshRequest() {
    return new RefreshPost()
  },
}

export const login = async (
  formData: LoginSignUpFormData,
): Promise<ApiSuccessResponse<User> | ApiErrorResponse> => {
  try {
    const request = AuthApi.loginRequest(formData)
    const { data } = await Api.post<ApiSuccessResponseDTO<UserDTO>>(
      request.getUrl(),
      { data: request.formData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return { isOk: true, data: data.data, error: null }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<ApiErrorResponseDTO>
      if (response && response?.data?.additional) {
        return { isOk: false, data: null, error: response.data.additional }
      }
    }
    return { isOk: false, data: null, error: (error as Error).message }
  }
}

export const signUp = async (
  formData: LoginSignUpFormData,
): Promise<ApiSuccessResponse<User> | ApiErrorResponse> => {
  try {
    const request = AuthApi.signUpRequest(formData)
    const { data } = await Api.post<ApiSuccessResponseDTO<UserDTO>>(
      request.getUrl(),
      { data: request.formData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return { isOk: true, data: data.data, error: null }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<ApiErrorResponseDTO>
      if (response && response?.data?.additional) {
        return { isOk: false, data: null, error: response.data.additional }
      }
    }
    return { isOk: false, data: null, error: (error as Error).message }
  }
}

export const refresh = async (): Promise<ApiSuccessResponse<User> | ApiErrorResponse> => {
  try {
    const request = AuthApi.refreshRequest()
    const { data } = await Api.post<ApiSuccessResponseDTO<UserDTO>>(request.getUrl())
    return { isOk: true, data: data.data, error: null }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<ApiErrorResponseDTO>
      if (response && response?.data?.additional) {
        return { isOk: false, data: null, error: response.data.additional }
      }
    }
    return { isOk: false, data: null, error: (error as Error).message }
  }
}
