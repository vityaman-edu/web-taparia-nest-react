import { Figure } from './figure'
import { Point } from './point'

export class Polygon implements Figure {
  type = 'polygon'
  constructor(readonly points: Point[]) {}
}
