import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaConfig } from './prisma.config'
import { PrismaService } from './prisma.service'

@Module({
  imports: [ConfigModule],
  exports: [PrismaService],
  providers: [PrismaService, PrismaConfig],
})
export class PrismaModule {}
