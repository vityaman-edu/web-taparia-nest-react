import {Vector} from "../astraction/vector"
import {Figure} from "../astraction/figure"

export class Ellipse extends Figure {
  constructor(
    public readonly center: Vector,
    public readonly radius: Vector
  ) {
    super("ellipse")
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.ellipse(
      this.center.x, this.center.y,
      this.radius.x, this.radius.y,
      0, 0, 2 * Math.PI
    )
    ctx.fill()
    ctx.stroke()
  }
}

export namespace Ellipse {
    export function fromJson(json: Map<string, any>) {
      return new Ellipse(
        Vector.fromJson(json.get('center')),
        Vector.fromJson(json.get('radius'))
      )
    }
}