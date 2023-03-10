import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface AuthInfo {
  readonly accountId: number
  readonly refreshToken: string
}

export const AuthPayload = createParamDecorator(
  (data: undefined, context: ExecutionContext): AuthInfo => {
    const user = context.switchToHttp().getRequest().user
    return {
      accountId: user['sub'],
      refreshToken: user['refreshToken'],
    }
  },
)
