import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthInfo, AuthPayload } from './decorator/auth.payload.decorator'
import { PublicEndpoint } from './decorator/public.endpoint.decorator'
import { LocalCredentials } from './entity/local.credentials'
import { AccessTokenGuard } from './guard/access.token.guard'
import { RefreshTokenGuard } from './guard/refresh.token.guard'

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicEndpoint()
  @Post('/local/signUp')
  @HttpCode(HttpStatus.CREATED)
  localSignUp(@Body() credentials: LocalCredentials) {
    return this.authService.localSignUp(credentials)
  }

  @PublicEndpoint()
  @Post('/local/signIn')
  @HttpCode(HttpStatus.OK)
  localSignIn(@Body() credentials: LocalCredentials) {
    return this.authService.localSignIn(credentials)
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@AuthPayload() auth: AuthInfo) {
    this.authService.logout(auth.accountId)
  }

  @PublicEndpoint()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@AuthPayload() auth: AuthInfo) {
    return this.authService.refreshTokenPair(auth)
  }
}
