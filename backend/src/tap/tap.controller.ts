import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { AuthInfo, AuthPayload } from '../auth/decorator/auth.payload.decorator'
import { TapDraft } from './model/tap'
import { TapService } from './tap.service'

@Controller('/api/taps')
export class TapController {
  constructor(private tapService: TapService) {}

  @Get()
  getById(
    @AuthPayload() auth: AuthInfo,
    @Query('picture_id', ParseIntPipe) pictureId: number,
    @Query('owner_id', ParseIntPipe) ownerId: number,
  ) {
    if (auth.accountId != ownerId) {
      throw new ForbiddenException('You can get only your own taps')
    }
    return this.tapService.getTapsWhere({
      pictureId: pictureId,
      ownerId: ownerId,
    })
  }

  @Post()
  post(@AuthPayload() auth: AuthInfo, @Body() tap: TapDraft) {
    return this.tapService.registerTap(auth.accountId, tap)
  }
}
