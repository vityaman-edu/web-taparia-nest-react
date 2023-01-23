import { Figure } from './figure'

export interface MultipleFigureAggregator extends Figure {
  readonly children: Figure[]
}

export interface OnlyFigureAggregator extends Figure {
  readonly child: Figure
}
