import { Figure } from './figure/figure'

export class Picture {
  readonly id: number
  readonly ownerId: number
  readonly name: string
  readonly content: Figure
}

export class PictureDraft {
  readonly name: string
  readonly content: Figure
}
