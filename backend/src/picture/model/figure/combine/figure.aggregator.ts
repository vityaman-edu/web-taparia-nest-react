import { Figure } from '../astraction/figure'

export abstract class FigureAggregator extends Figure {
  protected constructor(type: string, public readonly children: Array<Figure>) {
    super(type)
  }
}
