import { Injectable } from '@nestjs/common'
import { AccountRepository } from './account.repository'
import { LocalCredentials } from './model/local.credentials'
import { Tokens } from './model/token.pair'
import { AccountNotFoundError } from './error/account.not.found.error'
import { AccessDeniedError } from './error/access.denied.error'
import { AuthSecretService } from './auth.secret.service'
import { Account } from './model/account'

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private secretService: AuthSecretService,
  ) {}

  async localSignUp(credentials: LocalCredentials): Promise<Tokens> {
    const account = await this.accountRepository.create({
      email: credentials.email,
      passwordHash: await this.secretService.hash(credentials.password),
    })
    const tokens = this.issueTokensFor(account)
    return tokens
  }

  async localSignIn(credentials: LocalCredentials): Promise<Tokens> {
    const account = await this.accountRepository.findByEmail(credentials.email)
    if (account == null) {
      throw new AccountNotFoundError('email', credentials.email)
    }
    this.secretService.ensureMatches(
      'password',
      credentials.password,
      account.passwordHash,
    )
    const tokens = this.issueTokensFor(account)
    return tokens
  }

  async refreshTokenPair(credentials: {
    accountId: number
    refreshToken: string
  }): Promise<Tokens> {
    const account = await this.accountRepository.findById(credentials.accountId)
    if (account == null) {
      throw new AccountNotFoundError('id', credentials.accountId)
    }
    if (account.refreshTokenHash == null) {
      throw new AccessDeniedError('refresh token was expired')
    }
    this.secretService.ensureMatches(
      'refresh token',
      credentials.refreshToken,
      account.refreshTokenHash,
    )
    const tokens = this.issueTokensFor(account)
    return tokens
  }

  async logout(accountId: number): Promise<void> {
    await this.accountRepository.removeRefreshTokenHash(accountId)
  }

  private async issueTokensFor(account: Account) {
    const tokens = this.secretService.generateTokens({
      sub: account.id,
      email: account.email,
    })
    await this.accountRepository.setRefrestTokenHash({
      accountId: account.id,
      hash: await this.secretService.hash(tokens.refresh),
    })
    return tokens
  }
}
