export class AccountNotFoundError extends Error {
  constructor(searchKey: string, value: any) {
    super(`An account with ${searchKey} ${value} not found`)
  }
}
