import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { AuthConfig } from '../auth.config'

export const jwtRefrestTokenStrategy = 'jwt-refresh'

@Injectable()
export class RefrestTokenStrategy extends PassportStrategy(
  Strategy,
  jwtRefrestTokenStrategy,
) {
  constructor(private config: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtRefreshTokenSecret(),
      passReqToCallback: true,
    })
  }

  validate(request: Request, payload: any) {
    const refreshToken = request
      .get('authorization')
      .replace('Bearier', '')
      .trim()
    return { ...payload, refreshToken }
  }
}
