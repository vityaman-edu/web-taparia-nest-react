import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthConfig } from './auth.config'
import * as bcrypt from 'bcrypt'
import { AccessDeniedError } from './error/access.denied.error'
import { JwtPayload } from './jwt/jwt.payload'

@Injectable()
export class AuthSecretService {
  constructor(private jwtService: JwtService, private config: AuthConfig) {}

  hash(data: string) {
    return bcrypt.hash(data, this.config.hashSalt())
  }

  ensureMatches(secretName: string, data: string, encrypted: string) {
    if (!bcrypt.compare(data, encrypted)) {
      throw new AccessDeniedError(`${secretName} does not match actual`)
    }
  }

  generateTokens(payload: JwtPayload) {
    return {
      access: this.jwtService.sign(payload, {
        secret: this.config.jwtAccessTokenSecret(),
        expiresIn: this.config.accessTokenTtlSeconds(),
      }),
      refresh: this.jwtService.sign(payload, {
        secret: this.config.jwtRefreshTokenSecret(),
        expiresIn: this.config.refreshTokenTtlSeconds(),
      }),
    }
  }
}
