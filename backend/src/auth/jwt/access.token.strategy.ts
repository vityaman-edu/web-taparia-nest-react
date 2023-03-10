import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthConfig } from '../auth.config'
import { JwtPayload } from './jwt.payload'

export const JWT_ACCESS_TOKEN_STRATEGY = 'jwt-access'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_ACCESS_TOKEN_STRATEGY,
) {
  constructor(config: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccessTokenSecret(),
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
