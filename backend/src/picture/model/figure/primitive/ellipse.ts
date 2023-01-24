import { Vector } from '../astraction/vector'
import { Figure } from '../astraction/figure'

export class Ellipse extends Figure {
  constructor(public readonly center: Vector, public readonly radius: Vector) {
    super('ellipse')
  }

  contains(point: Vector): boolean {
    return (
      square(point.x - this.center.x) / square(this.radius.x) +
        square(point.y - this.center.y) / square(this.radius.y) <=
      1
    )
  }
}

const square = (x: number) => x * x

export namespace Ellipse {
  export function fromJson(json: Map<string, any>) {
    return new Ellipse(
      Vector.fromJson(json.get('center')),
      Vector.fromJson(json.get('radius')),
    )
  }
}
