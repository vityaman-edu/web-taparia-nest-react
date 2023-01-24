import { Vector } from '../astraction/vector'
import { Figure } from '../astraction/figure'

export class Polygon extends Figure {
  constructor(public readonly points: Array<Vector>) {
    super('polygon')
  }
}

export namespace Polygon {
  export function fromJson(json: Map<string, any>) {
    return new Polygon(
      (json.get('points') as Array<Map<string, any>>).map(Vector.fromJson),
    )
  }
}
