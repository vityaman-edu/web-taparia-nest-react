export class AccessDeniedError extends Error {
  constructor(cause: string) {
    super(`Access denied because ${cause}`)
  }
}
