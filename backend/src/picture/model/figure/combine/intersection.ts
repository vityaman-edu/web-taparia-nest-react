import { Figure } from '../astraction/figure'
import { FigureAggregator } from './figure.aggregator'

export class Intersection extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super('intersection', children)
  }
}
