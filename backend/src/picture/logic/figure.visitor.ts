import { ColoredFigure } from '../model/figure/colored.figure'
import { Ellipse } from '../model/figure/ellipse'
import { Figure } from '../model/figure/figure'
import { Polygon } from '../model/figure/polygon'

const defaultParser = new Map<string, (figure: Figure) => Figure>()
defaultParser.set('ellipse', (figure) => {
  const center = parseXY(figure['center'])
  const radius = parseXY(figure['radius'])
  return new Ellipse(center, radius)
})
defaultParser.set('polygon', (figure) => {
  const points = (figure['points'] as Array<XY>).map(validatedXY)
  return new Polygon(points)
})
defaultParser.set('colored', (figure) => {
  const color = figure['color']
  assertType(color, 'string')
  const child = figure['child']
  assertType(child, 'object')
  return new ColoredFigure(color, defaultParser.get(child['type'])(child))
})

export const DefaultParser = (type: string) => {
  if (!defaultParser.has(type)) {
    throw new Error(`type ${type} is not supported`)
  }
  return defaultParser.get(type)
}

export const IdentityVisitor = () => (f: Figure) => f

export class FigureVisitor<T> {
  constructor(
    private parser: (type: string) => (f: Figure) => Figure,
    private visitor: (type: string) => (f: Figure) => T,
  ) {}

  parseObject(obj: object): T {
    const figure = obj as Figure
    return this.visitor(figure.type)(this.parser(figure.type)(figure))
  }
}

type XY = {
  x: number
  y: number
}

function parseXY(obj: object): XY {
  return validatedXY({ x: obj['x'], y: obj['y'] })
}

function assertType(x: any, type: string) {
  if (typeof x != type) {
    throw new Error(`expected ${type}, got ${x}`)
  }
}

function validatedXY(xy: { x: any; y: any }): XY {
  assertType(xy.x, 'number')
  assertType(xy.y, 'number')
  return xy
}
