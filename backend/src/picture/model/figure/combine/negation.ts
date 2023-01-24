import { Figure } from '../astraction/figure'
import { Vector } from '../astraction/vector'

export class Negation extends Figure {
  constructor(public readonly child: Figure) {
    super('negation')
  }

  contains(point: Vector): boolean {
    return !this.child.contains(point)
  }
}
