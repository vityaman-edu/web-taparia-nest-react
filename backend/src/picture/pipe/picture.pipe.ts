import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import {
  DefaultParser,
  FigureVisitor,
  IdentityVisitor,
} from '../logic/figure.visitor'
import { Figure } from '../model/figure/figure'
import { PictureDraft } from '../model/picture'

type Input = {
  name: string
  content: Figure
}

@Injectable()
export class PicturePipe implements PipeTransform<Input, PictureDraft> {
  transform(value: Input, metadata: ArgumentMetadata) {
    try {
      const parser = new FigureVisitor(DefaultParser, IdentityVisitor)
      return {
        name: value.name,
        content: parser.parseObject(value.content),
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
