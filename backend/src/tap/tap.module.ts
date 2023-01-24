import { Module } from '@nestjs/common'
import { TapService } from './tap.service'
import { TapController } from './tap.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TapRepository } from './tap.repository'
import { PictureService } from 'src/picture/picture.service'

@Module({
  imports: [PrismaModule, PictureService],
  providers: [TapService, TapRepository],
  controllers: [TapController],
})
export class TapModule {}
