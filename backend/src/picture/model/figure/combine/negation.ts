import { Figure } from '../astraction/figure'

export class Negation extends Figure {
  constructor(public readonly child: Figure) {
    super('negation')
  }
}
