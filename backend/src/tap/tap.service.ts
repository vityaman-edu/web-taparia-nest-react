import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { FigureFactory } from 'src/picture/model/figure/figure.factory'
import { PictureService } from 'src/picture/picture.service'
import { Tap, TapDraft, TapStatus } from './model/tap'
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

  async registerTap(ownerId: number, tap: TapDraft): Promise<Tap> {
    const picture = await this.pictureService.getById(tap.pictureId)
    if (picture == null) {
      throw new NotFoundException(`Picture with id ${tap.pictureId} not found`)
    }
    if (picture.ownerId != ownerId) {
      throw new ForbiddenException(
        `Access to picture with id ${picture.id} denied`,
      )
    }
    const figure = FigureFactory.fromObject(picture.content)
    const status = figure.contains(tap) ? TapStatus.Hit : TapStatus.Miss
    return this.tapRepository.create({ ...tap, ownerId, status })
  }
}
