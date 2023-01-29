import { AuthId } from './auth'

export class Account {
  readonly id: number
  readonly authId: AuthId
  readonly refreshTokenHash?: string
}

export class Profile {
  readonly accountId: number
  readonly name: string
}
