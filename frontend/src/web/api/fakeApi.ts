import { Figure } from "../../state/model/picture/figure/astraction/figure"
import { Vector } from "../../state/model/picture/figure/astraction/vector"
import { Picture } from "../../state/model/picture/picture"
import { Api } from "./api"
import { TapResult } from "./dto/tapResult"
import { User } from "./dto/user"

export class FakeApi implements Api {
  constructor(
    private picturesById = new Map<number, Picture>(),
    private nextId = 0
  ) {}

  ops = { 
    ping: () => new Promise<void>(resolve => resolve())
  }
  
  users = { 
    getByName: (username: string) => new Promise<User>(
      resolve => resolve(new User(1, username))
    )
  }

  pictures = { 
    post: (name: string, data: Figure) => new Promise<number>(
      resolve => {
        this.picturesById.set(++this.nextId, new Picture(
          this.nextId, 1, name, data
        ))
        resolve(this.nextId)
      }
    ),
    getById: (pictureId: number) => new Promise<Picture>(
      (resolve, reject) => {
        const pic = this.picturesById.get(pictureId)
        if (pic == undefined) reject() 
        else resolve(pic)
      }
    ),
    getAllByOwnerId: (ownerId: number) => new Promise<Picture[]>(
      resolve => resolve(
        [...this.picturesById.values()]
          .filter(pic => pic.ownerId == ownerId)
      )
    )
  }

  picturesTaps = { 
    post: (pictureId: number, point: Vector) => new Promise<TapResult>(
      (resolve, reject) => resolve(
        new TapResult(1, 1, 1, { x: 10, y: 10 } as Vector, "HIT")
      )
    ),
    getAllByOwnerId: (pictureId: number, ownerId: number) => new Promise<Array<TapResult>>(
      (resolve, reject) => resolve([])
    )
  }
}