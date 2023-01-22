import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { CommonModule } from './common/common.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './auth/guard/access.token.guard'

@Module({
  imports: [AuthModule, PrismaModule, CommonModule],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
