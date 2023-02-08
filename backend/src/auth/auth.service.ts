import { AuthSecretService } from './auth.secret.service'
import { AccessDeniedError } from './error/access.denied.error'
import { AccountNotFoundError } from './error/account.not.found.error'
import { Tokens } from './model/token.pair'
import { AccountRepository } from './account.repository'
import { Injectable } from '@nestjs/common'
import { Account } from './model/account'

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private secretService: AuthSecretService,
  ) {}

  async refreshTokenPair(refreshToken: string): Promise<Tokens> {
    const jwt = this.secretService.decodeJwt(refreshToken)
    if (jwt == null) {
      throw new AccessDeniedError('invalid jwt token')
    }
    const accountId = jwt.sub
    const account = await this.accountRepository.findById(accountId)
    if (account == null) {
      throw new AccountNotFoundError('id', accountId)
    }
    if (account.refreshTokenHash == null) {
      throw new AccessDeniedError('refresh token was expired')
    }
    this.secretService.ensureMatches(
      'refresh token',
      refreshToken,
      account.refreshTokenHash,
    )
    const tokens = this.issueTokens(account)
    return tokens
  }

  async issueTokens(account: Account) {
    const tokens = this.secretService.generateTokens({ sub: account.id })
    await this.accountRepository.setRefrestTokenHash({
      accountId: account.id,
      hash: await this.secretService.hash(tokens.refresh),
    })
    return tokens
  }

  async logout(accountId: number): Promise<void> {
    await this.accountRepository.removeRefreshTokenHash(accountId)
  }
}
