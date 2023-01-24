import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthInfo, AuthPayload } from '../auth/decorator/auth.payload.decorator'
import { PublicEndpoint } from '../auth/decorator/public.endpoint.decorator'

@Controller('/api/ops')
export class OpsController {
  @PublicEndpoint()
  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return { message: 'pong' }
  }

  @Get('/securePing')
  @HttpCode(HttpStatus.OK)
  security(@AuthPayload() auth: AuthInfo) {
    return { message: `Welcome, user with id ${auth.accountId}!` }
  }
}
