export class AccountAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`The account with email ${email} already exists`)
  }
}
