import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthInfo, AuthPayload } from './decorator/auth.payload.decorator'
import { PublicEndpoint } from './decorator/public.endpoint.decorator'
import { LocalCredentials } from './model/local.credentials'
import { AccessTokenGuard } from './guard/access.token.guard'
import { RefreshTokenGuard } from './guard/refresh.token.guard'
import { AccountAlreadyExistsError } from './error/account.already.exists.error'
import { AccountNotFoundError } from './error/account.not.found.error'
import { AccessDeniedError } from './error/access.denied.error'
import { AuthLocalService } from './auth.local.service'
import { YandexCredentials } from './model/yandex.credentials'
import { AuthYandexService } from './auth.yandex.service'
import { Tokens } from './model/token.pair'

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authLocalService: AuthLocalService,
    private authYandexService: AuthYandexService,
  ) {}

  @PublicEndpoint()
  @Post('/local/signUp')
  @HttpCode(HttpStatus.CREATED)
  localSignUp(@Body() credentials: LocalCredentials) {
    return this.authLocalService.signUp(credentials).catch((e) => {
      if (e instanceof AccountAlreadyExistsError) {
        throw new ForbiddenException(e.message)
      }
      throw e
    })
  }

  @PublicEndpoint()
  @Post('/local/signIn')
  @HttpCode(HttpStatus.OK)
  localSignIn(@Body() credentials: LocalCredentials) {
    return this.authLocalService.signIn(credentials).catch((e) => {
      // TODO: code repetition, maybe extend these errors with nestjs
      if (e instanceof AccountNotFoundError) {
        throw new NotFoundException(e.message)
      }
      if (e instanceof AccessDeniedError) {
        throw new ForbiddenException(e.message)
      }
      throw e
    })
  }

  @PublicEndpoint()
  @Post('yandex/signIn')
  @HttpCode(HttpStatus.OK)
  yandexSignIn(@Body() credentials: YandexCredentials): Promise<Tokens> {
    return this.authYandexService.signIn(credentials)
  }

  @PublicEndpoint()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@AuthPayload() auth: AuthInfo) {
    return this.authService.refreshTokenPair(auth.refreshToken).catch((e) => {
      if (e instanceof AccountNotFoundError) {
        throw new NotFoundException(e.message)
      }
      if (e instanceof AccessDeniedError) {
        throw new ForbiddenException(e.message)
      }
      throw e
    })
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@AuthPayload() auth: AuthInfo) {
    return this.authService.logout(auth.accountId)
  }
}
