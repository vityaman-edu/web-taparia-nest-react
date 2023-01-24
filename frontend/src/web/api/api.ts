import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Picture } from '../../state/model/picture/picture'
import { LocalCredentials } from './dto/local.credentials'
import { TapResult } from './dto/tapResult'
import { TokenPair } from './dto/token.pair'
import { User } from './dto/user'
export interface Api {
  ops: {
    ping: () => Promise<void>
  }
  users: {
    getByName: (username: string) => Promise<User>
  }
  pictures: {
    post: (name: string, data: Figure) => Promise<number>
    getById: (pictureId: number) => Promise<Picture>
    getAllByOwnerId: (ownerId: number) => Promise<Array<Picture>>
  }
  picturesTaps: {
    post: (pictureId: number, point: Vector) => Promise<TapResult>
    getAllByOwnerId: (
      pictureId: number,
      ownerId: number,
    ) => Promise<Array<TapResult>>
  }
  auth: {
    local: {
      signUp: (credentials: LocalCredentials) => Promise<TokenPair>
      signIn: (credentials: LocalCredentials) => Promise<TokenPair>
    }
    refresh: () => Promise<TokenPair>
    logout: () => Promise<void>
  }
}
