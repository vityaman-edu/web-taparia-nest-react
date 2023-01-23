export class Account {
  readonly id: number
  readonly email: string
  readonly passwordHash: string
  readonly refreshTokenHash?: string
}
