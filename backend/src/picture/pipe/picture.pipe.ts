import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { FigureFactory } from '../model/figure/figure.factory'
import { Figure } from '../model/figure2/figure'
import { PictureDraft } from '../model/picture'

type Input = {
  name: string
  content: Figure
}

@Injectable()
export class PicturePipe implements PipeTransform<Input, PictureDraft> {
  transform(value: Input) {
    try {
      return {
        name: value.name,
        content: FigureFactory.fromObject(value.content),
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
