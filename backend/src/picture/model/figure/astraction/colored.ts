import { Figure } from './figure'
import { Vector } from './vector'

export class Colored extends Figure {
  constructor(readonly color: string, readonly child: Figure) {
    super('colored')
  }

  contains(point: Vector): boolean {
    return this.child.contains(point)
  }
}
