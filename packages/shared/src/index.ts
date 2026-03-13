export type ID = string

export type ApiResponse<T> = {
  ok: boolean
  data: T
}

export type ErrorResponse = {
  ok: false
  error: string
}
