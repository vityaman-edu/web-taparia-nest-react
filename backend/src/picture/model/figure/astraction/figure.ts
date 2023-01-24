import { Vector } from './vector'

export abstract class Figure {
  protected constructor(public readonly type: string) {}

  abstract contains(point: Vector): boolean
}
