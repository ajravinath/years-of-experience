import { AxiosError } from 'axios'
import { Api } from './axiosConfig'
import {
  ApiErrorResponse,
  ApiErrorResponseDTO,
  ApiSuccessResponse,
  ApiSuccessResponseDTO,
} from './types'
import { ProfileGet } from './models/ProfileGet'
import { ProfilePost } from './models/ProfilePost'
import { ProfilePut } from './models/ProfilePut'

interface ProfileDTO {
  id: string
  firstName: string
  lastName: string
  title: string
  image: string
  dob: string
}

export interface Profile {
  id: string
  firstName: string
  lastName: string
  title: string
  image: string
  dob: string
}

export const ProfileApi = {
  getRequest(id: string) {
    return new ProfileGet(id)
  },
  postRequest(formData: FormData) {
    return new ProfilePost(formData)
  },
  putRequest(id: string, formData: FormData) {
    return new ProfilePut(id, formData)
  },
}

export const getProfileById = async (
  id: string,
): Promise<ApiSuccessResponse<Profile> | ApiErrorResponse> => {
  try {
    const request = ProfileApi.getRequest(id)
    const { data } = await Api.get<ApiSuccessResponseDTO<ProfileDTO>>(request.getUrl())
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

export const createProfile = async (
  formData: FormData,
): Promise<ApiSuccessResponse<Profile> | ApiErrorResponse> => {
  try {
    const request = ProfileApi.postRequest(formData)
    const { data } = await Api.post<ApiSuccessResponseDTO<ProfileDTO>>(
      request.getUrl(),
      request.formData,
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

export const editProfile = async (
  id: string,
  formData: FormData,
): Promise<ApiSuccessResponse<Profile> | ApiErrorResponse> => {
  try {
    const request = ProfileApi.putRequest(id, formData)
    const { data } = await Api.put<ApiSuccessResponseDTO<ProfileDTO>>(
      request.getUrl(),
      request.formData,
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
