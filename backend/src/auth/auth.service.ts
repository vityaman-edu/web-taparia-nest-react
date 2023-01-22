import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AccountRepository } from './account.repository'
import { LocalCredentials } from './entity/local.credentials'
import * as bcrypt from 'bcrypt'
import { TokenPair } from './entity/token.pair'
import { AccountAlreadyExistsError } from './error/account.already.exists.error'

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private jwtService: JwtService,
  ) {}

  async localSignUp(credentials: LocalCredentials): Promise<TokenPair> {
    const passwordHash = await this.hash(credentials.password)
    const account = await this.accountRepository
      .create({
        email: credentials.email,
        passwordHash: passwordHash,
      })
      .catch((error) => {
        if (error instanceof AccountAlreadyExistsError) {
          throw new ForbiddenException(error.message)
        }
        throw error
      })
    const tokens = await this.generateTokenPair(account)
    await this.accountRepository.setRefrestTokenHash({
      accountId: account.id,
      hash: await this.hash(tokens.refreshToken),
    })
    return tokens
  }

  async localSignIn(credentials: LocalCredentials): Promise<TokenPair> {
    const account = await this.accountRepository.findByEmail(credentials.email)
    if (account == null) {
      throw new ForbiddenException('User not found')
    }
    const arePasswordsMatch = bcrypt.compare(
      credentials.password,
      account.passwordHash,
    )
    if (!arePasswordsMatch) {
      throw new ForbiddenException('Password does not match')
    }
    const tokens = await this.generateTokenPair(account)
    await this.accountRepository.setRefrestTokenHash({
      accountId: account.id,
      hash: await this.hash(tokens.refreshToken),
    })
    return tokens
  }

  async logout(accountId: number): Promise<void> {
    await this.accountRepository.removeRefreshTokenHash(accountId)
  }

  async refreshTokenPair(a: {
    accountId: number
    refreshToken: string
  }): Promise<TokenPair> {
    const account = await this.accountRepository.findById(a.accountId)
    if (account == null) {
      throw new ForbiddenException('User not found')
    }
    if (account.refreshTokenHash == null) {
      throw new ForbiddenException('Refresh token was expired')
    }
    const refreshTokenMatches = bcrypt.compare(
      a.refreshToken,
      account.refreshTokenHash,
    )
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Refresh token does not match')
    }
    const tokens = await this.generateTokenPair(account)
    await this.accountRepository.setRefrestTokenHash({
      accountId: account.id,
      hash: await this.hash(tokens.refreshToken),
    })
    return tokens
  }

  private async generateTokenPair(account: {
    id: number
    email: string
  }): Promise<TokenPair> {
    const DURATION_15_MINUTES = 15 * 60
    const DURATION_7_DAYS = 7 * 24 * 60 * 60
    // TODO: access and refresh token secrets in .env
    return {
      accessToken: this.jwtService.sign(
        { sub: account.id, email: account.email },
        { secret: 'access-token-secret', expiresIn: DURATION_15_MINUTES },
      ),
      refreshToken: this.jwtService.sign(
        { sub: account.id, email: account.email },
        { secret: 'refresh-token-secret', expiresIn: DURATION_7_DAYS },
      ),
    }
  }

  private async hash(data: string) {
    const salt = 10
    return bcrypt.hash(data, salt)
  }
}
