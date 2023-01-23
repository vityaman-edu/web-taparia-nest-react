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
}
