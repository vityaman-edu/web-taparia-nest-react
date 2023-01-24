import { ColoredFigure } from '../model/figure2/colored.figure'
import { Ellipse } from '../model/figure2/ellipse'
import { Figure } from '../model/figure2/figure'
import { Polygon } from '../model/figure2/polygon'

export class FigureParsingVisitor<T> {
  constructor(
    private parser: (type: string) => (f: Figure) => Figure,
    private visitor: (type: string) => (f: Figure) => T,
  ) {}

  parseObject(obj: object): T {
    const figure = obj as Figure
    return this.visitor(figure.type)(this.parser(figure.type)(figure))
  }
}

export class DefaultParser {
  map = new Map<string, (figure: Figure) => Figure>()
  constructor() {
    this.map.set('ellipse', (figure) => {
      const center = parseXY(figure['center'])
      const radius = parseXY(figure['radius'])
      return new Ellipse(center, radius)
    })
    this.map.set('polygon', (figure) => {
      const points = (figure['points'] as Array<XY>).map(validatedXY)
      return new Polygon(points)
    })
    this.map.set('colored', (figure) => {
      return new ColoredFigure(figure['color'], this.parse(figure['child']))
    })
    const multipleAggregatorParser = (figure: Figure) => {
      const children = (figure['children'] as Array<Figure>).map(this.parse)
      return { type: figure.type, children: children }
    }
    this.map.set('intersection', multipleAggregatorParser)
    this.map.set('union', multipleAggregatorParser)
  }

  public parse(figure: Figure) {
    return this.parserForType(figure.type)(figure)
  }

  public parserForType(type: string) {
    if (!this.map.has(type)) {
      throw new Error(`type ${type} is not supported`)
    }
    return this.map.get(type)
  }
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

type XY = {
  x: number
  y: number
}
