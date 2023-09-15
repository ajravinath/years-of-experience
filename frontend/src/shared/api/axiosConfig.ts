import axios, { AxiosError } from 'axios'

export const Api = axios.create({
  withCredentials: false,
  baseURL: `${process.env.REACT_APP_BASE_URL}api/`,
})

const errorHandler = (error: AxiosError) => {
  const status = error.response?.status
  console.error('status', status, error)
  return Promise.reject(error)
}

Api.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
)
