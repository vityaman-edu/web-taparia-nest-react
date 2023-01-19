import {Figure} from "../astraction/figure"
import {FigureAggregator} from "./figureAggregator"

export class Intersection extends FigureAggregator {
  constructor(children: Array<Figure>) {
    super("intersection", children)
  }
}
