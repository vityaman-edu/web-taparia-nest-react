import { Figure } from "../../state/model/picture/figure/astraction/figure"
import { Vector } from "../../state/model/picture/figure/astraction/vector"
import { Ellipse } from "../../state/model/picture/figure/primitive/ellipse"
import { Picture } from "../../state/model/picture/picture"
import { TapResult } from "./dto/tapResult"
import { User } from "./dto/user"
import { FakeApi } from "./fakeApi"

export interface Api {
  ops: {
    ping: () => Promise<void>,
  },
  users: {
    getByName: (username: string) => Promise<User>
  },
  pictures: {
    post: (name: string, data: Figure) => Promise<number>,
    getById: (pictureId: number) => Promise<Picture>,
    getAllByOwnerId: (ownerId: number) => Promise<Array<Picture>>
  },
  picturesTaps: {
    post: (pictureId: number, point: Vector) => Promise<TapResult>,
    getAllByOwnerId: (pictureId: number, ownerId: number) => Promise<Array<TapResult>>
  }
}

let nextId = 0
const userId = 0
const picturesById = new Map<number, Picture>()
while (nextId < 10) {
  picturesById.set(++nextId, new Picture(
    nextId, userId, `Test picture ${nextId}`, new Ellipse(
    {x: nextId * 10, y: nextId * 10} as Vector, 
    {x: nextId * 10, y: nextId * 10} as Vector
    )))
}
export const api = new FakeApi(picturesById, nextId)
