import { Colored } from "../../../../state/model/picture/figure/astraction/colored"
import { Drawable } from "../../../../state/model/picture/figure/astraction/drawable"
import { Vector } from "../../../../state/model/picture/figure/astraction/vector"
import { Ellipse } from "../../../../state/model/picture/figure/primitive/ellipse"
import { Polygon } from "../../../../state/model/picture/figure/primitive/polygon"
import { CoordinatesDrawable } from "./coordinatesDrawable"

type MouseEventCallback = (mousePosition: Vector) => void

export class Canvas {
  private readonly coordinates = new CoordinatesDrawable()

  constructor(
    private readonly canvas: () => HTMLCanvasElement,
    private readonly origin: Vector
  ) {  }

  tap(point: Vector, color: string) {
    this.draw(new Colored(color, new Ellipse(
      point, new Vector(5, 5)
    )))
  }

  redraw(drawable: Drawable) {
    this.clear()
    this.draw(drawable)
  }

  draw(drawable: Drawable): Canvas {
    const ctx = this.canvas().getContext("2d")!
    ctx.save()
    ctx.translate(this.origin.x, this.origin.y)
    ctx.scale(1, -1)
    ctx.fillStyle = "#888"
    ctx.lineWidth = 2
    drawable.draw(ctx)
    ctx.restore()
    return this
  }

  clear() {
    const INF = 9999
    this.draw(new Colored("#FFFFFF",new Polygon([
      new Vector(-INF, -INF),
      new Vector(INF, -INF),
      new Vector(INF, INF),
      new Vector(-INF, INF)
    ])))
    this.draw(this.coordinates)
  }

  setMouseClickListener(callback: MouseEventCallback): Canvas {
    console.log('click')
    this.canvas().onclick = ((e: MouseEvent) => {
      const mousePosition = new Vector(e.clientX, e.clientY)
      callback(this.translate(mousePosition))
    }).bind(this)
    return this
  }

  private translate(point: Vector) {
    const topLeftCorner = this.topLeftCorner()
    return new Vector(
      point.x - topLeftCorner.x - this.origin.x,
      -(point.y - topLeftCorner.y - this.origin.y)
    )
  }

  private topLeftCorner(): Vector {
    const rectangle = this.canvas().getBoundingClientRect()
    return new Vector(rectangle.left, rectangle.top)
  }
}
