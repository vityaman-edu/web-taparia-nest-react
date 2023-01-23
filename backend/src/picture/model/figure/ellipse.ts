import { Figure } from './figure'

export class Ellipse implements Figure {
  type = 'ellipse'
  constructor(
    readonly center: { x: number; y: number },
    readonly radius: { x: number; y: number },
  ) {}
}
