import { Module } from '@nestjs/common'
import { PictureService } from './picture.service'
import { PictureController } from './picture.controller'
import { PictureRepository } from './picture.repository'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [PictureController],
  providers: [PictureService, PictureRepository],
  exports: [PictureService],
})
export class PictureModule {}
