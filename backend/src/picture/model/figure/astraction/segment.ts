import { Vector } from './vector'

export class Segment {
  constructor(public start: Vector, public end: Vector) {}

  /** https://stackoverflow.com/questions/217578/
   * how-can-i-determine-whether-a-2d-point-is-within-a-polygon */
  intersects(other: Segment) {
    const standartLinearEquationFormOf = (segment: Segment) => [
      segment.end.y - segment.start.y,
      segment.start.x - segment.end.x,
      segment.end.x * segment.start.y - segment.start.x * segment.end.y,
    ]

    const areD1AndD2SuitableHaveSameSign = (
      first: Segment,
      second: Segment,
    ) => {
      const [a, b, c] = standartLinearEquationFormOf(first)
      const d1 = a * second.start.x + b * second.start.y + c
      const d2 = a * second.end.x + b * second.end.y + c
      return (d1 > 0 && d2 > 0) || (d1 < 0 && d2 < 0)
    }

    return (
      !areD1AndD2SuitableHaveSameSign(this, other) &&
      !areD1AndD2SuitableHaveSameSign(other, this)
    )
  }

  toString() {
    return `[${this.start.toString()} -- ${this.end.toString()}]`
  }
}
