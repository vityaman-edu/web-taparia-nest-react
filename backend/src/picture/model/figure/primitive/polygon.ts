import { Vector } from '../astraction/vector'
import { Figure } from '../astraction/figure'
import { Segment } from '../astraction/segment'

export class Polygon extends Figure {
  private static CORNER = new Vector(999, 999)

  constructor(public readonly points: Array<Vector>) {
    super('polygon')
  }

  contains(point: Vector) {
    const ray = new Segment(point, Polygon.CORNER)
    return this.sides().filter((side) => side.intersects(ray)).length % 2 == 1
  }

  private sides() {
    const result = []
    for (let i = 1; i <= this.points.length; i++) {
      result.push(
        new Segment(this.points[i - 1], this.points[i % this.points.length]),
      )
    }
    return result
  }
}

export namespace Polygon {
  export function fromJson(json: Map<string, any>) {
    return new Polygon(
      (json.get('points') as Array<Map<string, any>>).map(Vector.fromJson),
    )
  }
}
