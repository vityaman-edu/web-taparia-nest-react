import { FigureFactory } from "./figure/figureFactory"
import { Figure } from "./figure/astraction/figure"

export class Picture {
  constructor(
    public readonly id: number,
    public readonly ownerId: number,
    public readonly name: string,
    public readonly figure: Figure
  ) {}
}

export namespace Picture {
  export type Header = {
    id: number,
    ownerId: number,
    name: string
  }

  export function fromJson(json: Map<string, any>) {
    return new Picture(
      json.get('id'),
      json.get('ownerId'),
      json.get('name'),
      FigureFactory.fromJson(json.get('content'))
    ) 
  }
}