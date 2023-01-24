import { Figure } from './figure'
import { OnlyFigureAggregator } from './figure.aggregator'

type Color = string

export class ColoredFigure implements OnlyFigureAggregator {
  readonly type = 'colored'
  constructor(readonly color: Color, readonly child: Figure) {}
}
