import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { PUBLIC_ENDPOINT_KEY } from '../decorator/public.endpoint.decorator'
import { JWT_ACCESS_TOKEN_STRATEGY } from '../jwt/access.token.strategy'

@Injectable()
export class AccessTokenGuard extends AuthGuard(JWT_ACCESS_TOKEN_STRATEGY) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_ENDPOINT_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    return isPublic || super.canActivate(context)
  }
}
