import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { DefaultParser, FigureParsingVisitor } from '../logic/figure.parser'
import { IdentityVisitor } from '../logic/figure.visitor'
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
        content: FigureFactory.fromJson(
          Utility.deepConvertToMap(value.content),
        ),
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}

namespace Utility {
  export function deepConvertToMap(object: object): Map<string, any> {
    return new Map(
      Object.entries(object).map((entry) => {
        if (entry[1] instanceof Array) {
          return [entry[0], entry[1].map(deepConvertToMap)]
        }
        if (entry[1] instanceof Object) {
          return [entry[0], deepConvertToMap(entry[1])]
        }
        return [entry[0], entry[1]]
      }),
    )
  }
}
