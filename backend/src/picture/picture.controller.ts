import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { AuthInfo, AuthPayload } from '../auth/decorator/auth.payload.decorator'
import { PictureNotFoundError } from './error/picture.not.found.error'
import { Picture, PictureDraft } from './model/picture'
import { PictureService } from './picture.service'
import { PicturePipe } from './pipe/picture.pipe'

@Controller('api/pictures')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @Post()
  post(
    @AuthPayload() auth: AuthInfo,
    @Body(PicturePipe) picture: PictureDraft,
  ) {
    return this.pictureService.create(auth.accountId, picture)
  }

  @Get(':id')
  async getById(
    @AuthPayload() auth: AuthInfo,
    @Param('id', ParseIntPipe) pictureId: number,
  ) {
    const picture = await this.pictureService.getById(pictureId).catch((e) => {
      if (e instanceof PictureNotFoundError) {
        throw new NotFoundException(e.message)
      }
      throw e
    })
    if (picture.ownerId != auth.accountId) {
      throw new ForbiddenException(
        `You does not own picture with id ${pictureId}`,
      )
    }
    return picture
  }

  @Get()
  getAllByOwnerId(
    @AuthPayload() auth: AuthInfo,
    @Query('owner_id', ParseIntPipe) ownerId: number,
  ): Promise<Array<Picture>> {
    if (ownerId != auth.accountId) {
      throw new ForbiddenException('You can get only your pictures')
    }
    return this.pictureService.getAllByOwnerId(ownerId)
  }
}
