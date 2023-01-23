import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  AuthInfo,
  AuthPayload,
} from 'src/auth/decorator/auth.payload.decorator'
import { PublicEndpoint } from 'src/auth/decorator/public.endpoint.decorator'
import { AccessTokenGuard } from 'src/auth/guard/access.token.guard'

@Controller('/api/ops')
export class OpsController {
  @PublicEndpoint()
  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return { message: 'pong' }
  }

  @UseGuards(AccessTokenGuard)
  @Get('/security')
  @HttpCode(HttpStatus.OK)
  security(@AuthPayload() auth: AuthInfo) {
    return { message: `Welcome, user with id ${auth.accountId}!` }
  }
}
