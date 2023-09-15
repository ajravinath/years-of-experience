export type ApiSuccessResponseDTO<T> = {
  data: T
}

export type ApiErrorResponseDTO = {
  name: string
  message: string
  status: number
  additional: string
}

export type ApiSuccessResponse<T> = {
  isOk: true
  data: T
  error: null
}

export type ApiErrorResponse = {
  isOk: false
  data: null
  error: string
}
