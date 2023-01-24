import { Module } from '@nestjs/common'
import { TapService } from './tap.service'
import { TapController } from './tap.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TapRepository } from './tap.repository'
import { PictureModule } from 'src/picture/picture.module'

@Module({
  imports: [PrismaModule, PictureModule],
  providers: [TapService, TapRepository],
  controllers: [TapController],
})
export class TapModule {}
