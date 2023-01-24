import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './auth/guard/access.token.guard'
import { OpsModule } from './ops/ops.module'
import { ConfigModule } from '@nestjs/config'
import { PictureModule } from './picture/picture.module'
import { TapModule } from './tap/tap.module';

@Module({
  imports: [
    AuthModule,
    OpsModule,
    PictureModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local'],
    }),
    TapModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
