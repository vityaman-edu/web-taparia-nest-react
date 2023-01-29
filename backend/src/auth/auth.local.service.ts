import { Injectable } from '@nestjs/common'
import { AccountRepository } from 'src/auth/account.repository'
import { AuthSecretService } from 'src/auth/auth.secret.service'
import { LocalCredentials } from 'src/auth/model/local.credentials'
import { Tokens } from 'src/auth/model/token.pair'
import { AuthLocalRepository } from './auth.local.repository'
import { AuthService } from './auth.service'
import { AccountNotFoundError } from './error/account.not.found.error'

@Injectable()
export class AuthLocalService {
  constructor(
    private auth: AuthService,
    private secret: AuthSecretService,
    private account: AccountRepository,
    private localAuth: AuthLocalRepository,
  ) {}

  async signUp(credentials: LocalCredentials): Promise<Tokens> {
    const auth = await this.localAuth.create({
      email: credentials.email,
      passwordHash: await this.secret.hash(credentials.password),
    })
    const account = await this.account.create(auth.toAuthId())
    await this.account.createProfile({
      accountId: account.id,
      name: auth.email,
    })
    const tokens = this.auth.issueTokens(account)
    return tokens
  }

  async signIn(credentials: LocalCredentials): Promise<Tokens> {
    const auth = await this.localAuth.findByEmail(credentials.email)
    if (auth == null) {
      throw new AccountNotFoundError('email', credentials.email)
    }
    this.secret.ensureMatches(
      'password',
      credentials.password,
      auth.passwordHash,
    )
    const account = await this.account.findByAuthId(auth.toAuthId())
    const tokens = this.auth.issueTokens(account)
    return tokens
  }
}
