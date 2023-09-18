import axios, { AxiosError } from 'axios'
import { onSignedOut } from 'shared/util/authUtil'

export const Api = axios.create({
  withCredentials: false,
  baseURL: `${process.env.REACT_APP_BASE_URL}api/`,
})

const errorHandler = (error: AxiosError) => {
  const status = error.response?.status
  switch (status) {
    case 401:
      console.error('status', status, error)
      onSignedOut()
      return Promise.reject(error)
    default:
      console.error('status', status, error)
      return Promise.reject(error)
  }
}

Api.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
)
