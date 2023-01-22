import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt.payload'

export const jwtAccessTokenStrategy = 'jwt-access'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  jwtAccessTokenStrategy,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: access token secret in .env
      secretOrKey: 'access-token-secret',
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
