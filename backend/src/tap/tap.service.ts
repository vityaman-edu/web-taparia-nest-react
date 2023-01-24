import { ForbiddenException, Injectable } from '@nestjs/common'
import { PictureService } from 'src/picture/picture.service'
import { Tap, TapDraft } from './model/tap'
import { TapRepository } from './tap.repository'

@Injectable()
export class TapService {
  constructor(
    private pictureService: PictureService,
    private tapRepository: TapRepository,
  ) {}

  getTapsWhere(filter: {
    ownerId?: number
    pictureId?: number
  }): Promise<Tap[]> {
    return this.tapRepository.getAllWith(filter)
  }

  async registerTap(ownerId: number, tap: TapDraft) {
    const picture = await this.pictureService.getById(tap.pictureId)
    if (picture.ownerId != ownerId) {
      throw new ForbiddenException(
        `Access to picture with id ${picture.id} denied`,
      )
    }
    picture.content
  }
}
