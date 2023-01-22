import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { PublicEndpointMarker } from '../decorator/public.endpoint.decorator'
import { jwtAccessTokenStrategy } from '../jwt/access.token.strategy'

@Injectable()
export class AccessTokenGuard extends AuthGuard(jwtAccessTokenStrategy) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PublicEndpointMarker, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
