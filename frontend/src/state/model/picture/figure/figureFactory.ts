import {Ellipse} from "./primitive/ellipse"
import {Polygon} from "./primitive/polygon"
import {Figure} from "./astraction/figure"
import {Intersection} from "./combine/intersection"
import {Union} from "./combine/union"
import {Negation} from "./combine/negation"
import {Colored} from "./astraction/colored"

export namespace FigureFactory {
  export function fromJson(json: Map<string, any>): Figure {
    switch (json.get('type') as string) {
    case 'ellipse':      return Ellipse.fromJson(json)
    case 'polygon':      return Polygon.fromJson(json)
    case 'intersection': return intersectionFromJson(json)
    case 'union':        return unionFromJson(json)
    case 'negation':     return negationFromJson(json)
    case 'colored':      return coloredFromJson(json)
    default: throw new Error(`type ${json.get('type')} is not supported`)
    }
  }

  function intersectionFromJson(json: Map<string, any>) {
    return new Intersection(
      (json.get('children') as Array<Map<string, any>>)
        .map(fromJson)
    )
  }

  function unionFromJson(json: Map<string, any>) {
    return new Union(
      (json.get('children') as Array<Map<string, any>>)
        .map(fromJson)
    )
  }

  function negationFromJson(json: Map<string, any>) {
    return new Negation(
      fromJson(json.get("child") as Map<string, any>)
    )
  }

  function coloredFromJson(json: Map<string, any>): Colored {
    return new Colored(
      json.get('color') as string,
      fromJson(json.get("child") as Map<string, any>)
    )
  }
}
