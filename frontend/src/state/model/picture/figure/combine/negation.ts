import {Figure} from "../astraction/figure"

export class Negation extends Figure {
  constructor(public readonly child: Figure) {
    super("negation")
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.child.draw(ctx)
  }
}