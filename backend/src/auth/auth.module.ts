import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AccountRepository } from './account.repository'
import { AuthConfig } from './auth.config'
import { AuthController } from './auth.controller'
import { AuthLocalRepository } from './auth.local.repository'
import { AuthLocalService } from './auth.local.service'
import { AuthSecretService } from './auth.secret.service'
import { AuthService } from './auth.service'
import { AccessTokenStrategy } from './jwt/access.token.strategy'
import { RefrestTokenStrategy } from './jwt/refresh.token.strategy'

@Module({
  imports: [PrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthLocalService,
    AuthSecretService,
    AuthLocalRepository,
    AccountRepository,
    AuthConfig,
    AccessTokenStrategy,
    RefrestTokenStrategy,
  ],
})
export class AuthModule {}
