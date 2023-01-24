import { Vector } from '../astraction/vector'
import { Figure } from '../astraction/figure'

export class Ellipse extends Figure {
  constructor(public readonly center: Vector, public readonly radius: Vector) {
    super('ellipse')
  }
}

export namespace Ellipse {
  export function fromJson(json: Map<string, any>) {
    return new Ellipse(
      Vector.fromJson(json.get('center')),
      Vector.fromJson(json.get('radius')),
    )
  }
}
