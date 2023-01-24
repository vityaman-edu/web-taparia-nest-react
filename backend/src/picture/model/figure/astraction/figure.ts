export abstract class Figure {
  protected constructor(public readonly type: string) {}

  abstract contains(point: { x: number; y: number }): boolean
}
