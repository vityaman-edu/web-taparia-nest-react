import { IsInt, IsNumber, IsPositive } from 'class-validator'

export class Tap {
  readonly id: number
  readonly ownerId: number
  readonly pictureId: number
  readonly x: number
  readonly y: number
  readonly status: 'HIT' | 'MISS'
  readonly createdAt: Date
}

export class TapDraft {
  @IsPositive()
  @IsInt()
  readonly pictureId: number

  @IsNumber()
  readonly x: number

  @IsNumber()
  readonly y: number
}
