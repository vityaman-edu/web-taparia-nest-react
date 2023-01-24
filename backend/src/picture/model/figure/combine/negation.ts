import { Figure } from '../astraction/figure'
import { Point } from '../astraction/vector'

export class Negation extends Figure {
  constructor(public readonly child: Figure) {
    super('negation')
  }

  contains(point: Point): boolean {
    return !this.child.contains(point)
  }
}
