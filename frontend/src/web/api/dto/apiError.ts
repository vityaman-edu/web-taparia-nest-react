export type ApiError = {
  readonly json: {
    message: string
    statusCode: number
  }
}
