import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Api } from './api'
import { LocalCredentials } from './dto/local.credentials'
import { TokenPair } from './dto/token.pair'

export class RefreshingTokenApi implements Api {
  constructor(
    private origin: Api,
    private setTokens: (tokens: TokenPair) => void,
  ) {}

  ops = {
    ping: () => this.origin.ops.ping(),
  }

  users = {
    getByName: (username: string) => this.origin.users.getByName(username),
  }

  pictures = {
    post: (name: string, data: Figure) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.pictures.post(name, data),
      ),

    getById: (pictureId: number) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.pictures.getById(pictureId),
      ),

    getAllByOwnerId: (ownerId: number) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.pictures.getAllByOwnerId(ownerId),
      ),
  }

  picturesTaps = {
    post: (pictureId: number, point: Vector) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.picturesTaps.post(pictureId, point),
      ),

    getAllByOwnerId: (pictureId: number, ownerId: number) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.picturesTaps.getAllByOwnerId(pictureId, ownerId),
      ),
  }

  auth = {
    local: {
      signUp: (credentials: LocalCredentials) =>
        this.origin.auth.local.signUp(credentials),

      signIn: (credentials: LocalCredentials) =>
        this.origin.auth.local.signIn(credentials),
    },
    refresh: () => this.origin.auth.refresh(),

    logout: () =>
      this.performOrRetryWithRefreshedTokens(() => this.origin.auth.logout()),
  }

  async performOrRetryWithRefreshedTokens<T>(action: () => Promise<T>): Promise<T> {
    try {
      const result = await action()
      return result
    } catch (e) {
      if (e instanceof Object && e.hasOwnProperty('error')) {
        if ((e as any).error == 'Unauthorized') {
          await this.auth.refresh().then(this.setTokens)
          const result = await action()
          return result
        }
      }
      throw e
    }
  }
}
