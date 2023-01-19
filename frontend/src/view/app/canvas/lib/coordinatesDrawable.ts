import { Segment } from "./segment"
import { Vector } from "../../../../state/model/picture/figure/astraction/vector"
import { Colored } from "../../../../state/model/picture/figure/astraction/colored"
import { Ellipse } from "../../../../state/model/picture/figure/primitive/ellipse"
import { Drawable } from "../../../../state/model/picture/figure/astraction/drawable"

const INF = 999

export class CoordinatesDrawable implements Drawable {
  private origin = Drawable.union([
    new Segment(
      new Vector(-INF, 0),
      new Vector(INF, 0),
      2,
      '#A00'
    ),
    new Segment(
      new Vector(0, -INF),
      new Vector(0, INF),
      2,
      '#A00'
    ),
    new Colored('#00F', new Ellipse(
      new Vector(0, 0),
      new Vector(3, 3)
    ))
  ])

  draw(ctx: CanvasRenderingContext2D): void {
    this.origin.draw(ctx)
  }
}