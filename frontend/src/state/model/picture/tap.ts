export type Tap = {
  readonly id: number
  readonly ownerId: number
  readonly pictureId: number
  readonly x: number
  readonly y: number
  readonly status: 'HIT' | 'MISS'
  readonly createdAt: Date
}
