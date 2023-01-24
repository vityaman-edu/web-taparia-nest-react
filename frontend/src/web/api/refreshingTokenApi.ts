import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Api } from './api'
import { LocalCredentials } from './dto/local.credentials'
import { TokenPair } from './dto/token.pair'

export class RefreshingTokenApi implements Api {
  constructor(
    private origin: Api,
    private setTokens: (tokens: TokenPair) => void,
    private onFail: (e: any) => void,
  ) {}

  ops = {
    ping: () =>
      this.performOrRetryWithRefreshedTokens(() => this.origin.ops.ping()),
  }

  users = {
    getByName: (username: string) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.users.getByName(username),
      ),
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

  taps = {
    post: (pictureId: number, point: Vector) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.taps.post(pictureId, point),
      ),

    getAllWith: (filter: { pictureId: number; ownerId: number }) =>
      this.performOrRetryWithRefreshedTokens(() =>
        this.origin.taps.getAllWith(filter),
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

    logout: () => this.origin.auth.logout(),
  }

  async performOrRetryWithRefreshedTokens<T>(
    action: () => Promise<T>,
  ): Promise<T> {
    try {
      const result = await action()
      return result
    } catch (e) {
      const error = e as any
      if (error.json.statusCode == 401 || error.json.statusCode == 403) {
        try {
          await this.auth.refresh().then(this.setTokens)
          const result = await action()
          return result
        } catch (e) {
          this.onFail(error)
          throw error
        }
      }
      throw error
    }
  }
}
