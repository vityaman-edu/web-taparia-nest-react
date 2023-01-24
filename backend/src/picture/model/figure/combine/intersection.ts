import { Figure } from '../astraction/figure'
import { Vector } from '../astraction/vector'
import { FigureAggregator } from './figure.aggregator'

export class Intersection extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super('intersection', children)
  }

  contains(point: Vector): boolean {
    return this.children.every((child) => child.contains(point))
  }
}
