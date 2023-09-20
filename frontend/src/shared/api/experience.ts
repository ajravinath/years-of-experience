import { AxiosError } from 'axios'
import { Api } from './axiosConfig'
import {
  ApiErrorResponse,
  ApiErrorResponseDTO,
  ApiSuccessResponse,
  ApiSuccessResponseDTO,
} from './types'
import { ExperienceGet } from './models/ExperienceGet'
import { ExperiencePost } from './models/ExperiencePost'
import { ExperiencePut } from './models/ExperiencePut'

interface ExperienceDTO {
  id: string
  title: string
  company: string
  currentlyWorking: boolean
  startDate: string
  endDate: string
  image: string
  description: string
}

export interface Experience {
  id: string
  title: string
  company: string
  currentlyWorking: boolean
  startDate: string
  endDate: string
  image: string
  description: string
}

export const ExperienceApi = {
  getRequest(id: string) {
    return new ExperienceGet(id)
  },
  postRequest(id: string, formData: FormData) {
    return new ExperiencePost(id, formData)
  },
  putRequest(id: string, experienceId: string, formData: FormData) {
    return new ExperiencePut(id, experienceId, formData)
  },
}

export const getAllExperiencesById = async (
  id: string,
): Promise<ApiSuccessResponse<Experience[]> | ApiErrorResponse> => {
  try {
    const request = ExperienceApi.getRequest(id)
    const { data } = await Api.get<ApiSuccessResponseDTO<ExperienceDTO[]>>(request.getUrl(), {
      withCredentials: true,
    })
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

export const createExperience = async (
  id: string,
  formData: FormData,
): Promise<ApiSuccessResponse<Experience> | ApiErrorResponse> => {
  try {
    const request = ExperienceApi.postRequest(id, formData)
    const { data } = await Api.post<ApiSuccessResponseDTO<ExperienceDTO>>(
      request.getUrl(),
      request.formData,
      { withCredentials: true },
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

export const editExperience = async (
  id: string,
  experienceId: string,
  formData: FormData,
): Promise<ApiSuccessResponse<Experience> | ApiErrorResponse> => {
  try {
    const request = ExperienceApi.putRequest(id, experienceId, formData)
    const { data } = await Api.put<ApiSuccessResponseDTO<ExperienceDTO>>(
      request.getUrl(),
      formData,
      { withCredentials: true },
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
