import { IsNotEmpty, IsString } from 'class-validator'
import { Figure } from './figure/astraction/figure'

export class Picture {
  readonly id: number
  readonly ownerId: number
  readonly name: string
  readonly content: Figure
}

export class PictureDraft {
  @IsNotEmpty()
  @IsString()
  readonly name: string
  readonly content: Figure
}
