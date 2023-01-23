import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './auth/guard/access.token.guard'
import { OpsModule } from './ops/ops.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    OpsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development.local'],
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
