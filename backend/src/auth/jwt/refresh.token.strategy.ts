import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'

export const jwtRefrestTokenStrategy = 'jwt-refresh'

@Injectable()
export class RefrestTokenStrategy extends PassportStrategy(
  Strategy,
  jwtRefrestTokenStrategy,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: refresh token secret in .env
      secretOrKey: 'refresh-token-secret',
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
