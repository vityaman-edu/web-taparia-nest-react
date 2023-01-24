import { Figure } from '../astraction/figure'
import { FigureAggregator } from './figure.aggregator'

export class Union extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super('union', children)
  }
}
