import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AccountRepository } from './account.repository'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessTokenStrategy } from './jwt/access.token.strategy'
import { RefrestTokenStrategy } from './jwt/refresh.token.strategy'

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountRepository,
    AccessTokenStrategy,
    RefrestTokenStrategy,
  ],
})
export class AuthModule {}
