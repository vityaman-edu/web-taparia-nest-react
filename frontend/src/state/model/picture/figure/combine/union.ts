import {Figure} from "../astraction/figure"
import {FigureAggregator} from "../combine/figureAggregator"

export class Union extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super("union", children)
  }
}
