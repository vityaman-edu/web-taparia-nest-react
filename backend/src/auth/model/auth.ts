export enum AuthMethod {
  Local = 'LOCAL',
  YandexId = 'YANDEX_ID',
}

export function authMethodFromString(string: string): AuthMethod {
  switch (string) {
    case 'LOCAL':
      return AuthMethod.Local
    case 'YANDEX_ID':
      return AuthMethod.YandexId
    default:
      throw new Error(`Unknown auth method ${string}`)
  }
}

export interface AuthId {
  readonly method: AuthMethod
  readonly external: number
}

export class AuthLocalDraft {
  constructor(readonly email: string, readonly passwordHash: string) {}
}

export interface AuthEntry {
  toAuthId(): AuthId
}

export class AuthLocal extends AuthLocalDraft implements AuthEntry {
  constructor(readonly id: number, email: string, passwordHash: string) {
    super(email, passwordHash)
  }

  toAuthId(): AuthId {
    return {
      method: AuthMethod.Local,
      external: this.id,
    }
  }
}

export class AuthExternal implements AuthEntry {
  readonly method: AuthMethod
  readonly id: number
  readonly login: string

  toAuthId(): AuthId {
    return {
      method: this.method,
      external: this.id,
    }
  }
}
