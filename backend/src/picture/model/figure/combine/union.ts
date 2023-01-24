import { Figure } from '../astraction/figure'
import { Vector } from '../astraction/vector'
import { FigureAggregator } from './figure.aggregator'

export class Union extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super('union', children)
  }

  contains(point: Vector): boolean {
    return !this.children.some((child) => child.contains(point))
  }
}
