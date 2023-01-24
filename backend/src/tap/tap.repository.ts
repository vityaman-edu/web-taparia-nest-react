import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Tap } from './model/tap'

@Injectable()
export class TapRepository {
  constructor(private prisma: PrismaService) {}

  getAllWith(filter: { ownerId?: number; pictureId?: number }): Promise<Tap[]> {
    return this.prisma.tap.findMany({
      where: {
        ownerId: filter.ownerId,
        pictureId: filter.pictureId,
      },
    })
  }
}
