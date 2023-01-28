import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Tap, TapStatus, TapPrecreated } from './model/tap'
import { Tap as TapEntity, TapStatus as TapEntityStatus } from '@prisma/client'

@Injectable()
export class TapRepository {
  constructor(private prisma: PrismaService) {}

  getAllWith(filter: { ownerId?: number; pictureId?: number }): Promise<Tap[]> {
    return this.prisma.tap
      .findMany({
        where: {
          ownerId: filter.ownerId,
          pictureId: filter.pictureId,
        },
      })
      .then((items) => items.map(this.convert))
  }

  create(tap: TapPrecreated): Promise<Tap> {
    return this.prisma.tap.create({ data: tap }).then(this.convert)
  }

  private convert = (entity: TapEntity) => {
    return {
      ...entity,
      status:
        entity.status == TapEntityStatus.HIT ? TapStatus.Hit : TapStatus.Miss,
    }
  }
}
