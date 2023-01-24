import { Figure } from './figure'

export class Colored extends Figure {
  constructor(public readonly color: string, public readonly child: Figure) {
    super('colored')
  }
}
