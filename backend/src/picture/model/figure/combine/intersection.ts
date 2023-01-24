import { Figure } from '../astraction/figure'
import { Point } from '../astraction/vector'
import { FigureAggregator } from './figure.aggregator'

export class Intersection extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super('intersection', children)
  }

  contains(point: Point): boolean {
    return this.children.every((child) => child.contains(point))
  }
}
