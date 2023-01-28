import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthConfig {
  constructor(private configService: ConfigService) {}

  jwtAccessTokenSecret(): string {
    return this.configService.get('AUTH_JWT_ACCESS_TOKEN_SECRET')
  }

  jwtRefreshTokenSecret(): string {
    return this.configService.get('AUTH_JWT_REFRESH_TOKEN_SECRET')
  }

  accessTokenTtlSeconds(): number {
    return parseInt(this.configService.get('AUTH_ACCESS_TOKEN_TTL_SECONDS'))
  }

  refreshTokenTtlSeconds(): number {
    return parseInt(this.configService.get('AUTH_REFRESH_TOKEN_TTL_SECONDS'))
  }

  hashSalt(): number {
    return parseInt(this.configService.get('AUTH_HASH_SALT'))
  }
}
