import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './auth/guard/access.token.guard'
import { OpsModule } from './ops/ops.module'

@Module({
  imports: [AuthModule, PrismaModule, OpsModule],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
