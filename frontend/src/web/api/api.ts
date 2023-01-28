import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Picture } from '../../state/model/picture/picture'
import { Tap } from '../../state/model/picture/tap'
import { LocalCredentials } from './dto/local.credentials'
import { Tokens } from './dto/token.pair'
import { User } from './dto/user'

export interface Api {
  ops: {
    ping: () => Promise<void>
  }
  users: {
    getByName: (username: string) => Promise<User>
  }
  pictures: {
    post: (name: string, data: Figure) => Promise<Picture>
    getById: (pictureId: number) => Promise<Picture>
    getAllByOwnerId: (ownerId: number) => Promise<Array<Picture>>
  }
  taps: {
    post: (pictureId: number, point: Vector) => Promise<Tap>
    getAllWith: (filter: {
      pictureId: number
      ownerId: number
    }) => Promise<Array<Tap>>
  }
  auth: {
    local: {
      signUp: (credentials: LocalCredentials) => Promise<Tokens>
      signIn: (credentials: LocalCredentials) => Promise<Tokens>
    }
    refresh: () => Promise<Tokens>
    logout: () => Promise<void>
  }
}
