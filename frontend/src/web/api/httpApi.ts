import $ from 'jquery'
import { Picture } from '../../state/model/picture/picture'
import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Utility } from './utility'
import { User } from './dto/user'
import { Api } from './api'
import { LocalCredentials } from './dto/local.credentials'
import { TokenPair } from './dto/token.pair'
import { Tap } from '../../state/model/picture/Tap'

const GET = 'GET'
const POST = 'POST'

export class HttpApi implements Api {
  constructor(
    private readonly host: string,
    private readonly timeout: number,
    private readonly tokens: () => TokenPair,
  ) {}

  ops = new (class {
    constructor(private readonly api: HttpApi) {}

    ping(): Promise<void> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path('/securePing'),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: resolve,
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/ops${suffix}`)}`
    }
  })(this)

  users = new (class {
    constructor(private readonly api: HttpApi) {}

    getByName(username: string): Promise<User> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path(`?name=${username}`),
          timeout: this.api.timeout,
          success: (data: object) => {
            const json = Utility.deepConvertToMap(data)
            const user = User.fromJson(json)
            resolve(user)
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/users${suffix}`)}`
    }
  })(this)

  pictures = new (class {
    constructor(private readonly api: HttpApi) {}

    post(name: string, content: Figure): Promise<Picture> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: POST,
          url: this.path(''),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          contentType: 'application/json',
          data: JSON.stringify({
            name: name,
            content: content,
          }),
          success: (data: object) => {
            const json = Utility.deepConvertToMap(data)
            resolve(Picture.fromJson(json))
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    getById(pictureId: number): Promise<Picture> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path(`/${pictureId}`),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: (data: object) => {
            const json = Utility.deepConvertToMap(data)
            const picture = Picture.fromJson(json)
            resolve(picture)
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    getAllByOwnerId(ownerId: number): Promise<Array<Picture>> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path(`?owner_id=${ownerId}`),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: (data: object) => {
            const pictures = $.makeArray(data as ArrayLike<any>)
              .map(Utility.deepConvertToMap)
              .map(Picture.fromJson)
            resolve(pictures)
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/pictures${suffix}`)}`
    }
  })(this)

  taps = new (class {
    constructor(private readonly api: HttpApi) {}

    post(pictureId: number, point: Vector): Promise<Tap> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: POST,
          url: this.path(''),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          contentType: 'application/json',
          data: JSON.stringify({
            pictureId: pictureId,
            x: point.x,
            y: point.y,
          }),
          success: (data: object) => {
            const tap = data as Tap
            resolve({ ...tap, createdAt: new Date(tap.createdAt) })
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    getAllWith(filter: {
      pictureId: number
      ownerId: number
    }): Promise<Array<Tap>> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path(
            `?owner_id=${filter.ownerId}&picture_id=${filter.pictureId}`,
          ),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: (data: object) => {
            const results = $.makeArray(data as ArrayLike<any>)
              .map((tap) => tap as Tap)
              .map((tap) => {
                return { ...tap, createdAt: new Date(tap.createdAt) }
              })
            resolve(results)
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/taps${suffix}`)}`
    }
  })(this)

  auth = new (class {
    constructor(private readonly api: HttpApi) {}
    local = new (class {
      constructor(private readonly api: HttpApi) {}

      signUp(credentials: LocalCredentials): Promise<TokenPair> {
        return new Promise((resolve, reject) =>
          $.ajax({
            type: POST,
            url: this.path(`/signUp`),
            timeout: this.api.timeout,
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: (data: object) => {
              const json = Utility.deepConvertToMap(data)
              resolve(
                new TokenPair(
                  json.get('access'),
                  json.get('refresh'),
                ),
              )
            },
            error: (http) => {
              reject({ json: http.responseJSON })
            },
          }),
        )
      }

      signIn(credentials: LocalCredentials): Promise<TokenPair> {
        return new Promise((resolve, reject) =>
          $.ajax({
            type: POST,
            url: this.path(`/signIn`),
            timeout: this.api.timeout,
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: (data: object) => {
              const json = Utility.deepConvertToMap(data)
              resolve(
                new TokenPair(
                  json.get('access'),
                  json.get('refresh'),
                ),
              )
            },
            error: (http) => {
              reject({ json: http.responseJSON })
            },
          }),
        )
      }

      path(suffix: string): string {
        return `${this.api.host}/api/auth/local${suffix}`
      }
    })(this.api)

    refresh(): Promise<TokenPair> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: POST,
          url: this.path(`/refresh`),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().refreshToken}`,
          },
          success: (data: object) => {
            const json = Utility.deepConvertToMap(data)
            resolve(
              new TokenPair(json.get('access'), json.get('refresh')),
            )
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    logout(): Promise<void> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: POST,
          url: this.path(`/logout`),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: (data: object) => {
            console.log('aaa')
            resolve()
          },
          error: (http) => {
            reject({ json: http.responseJSON })
          },
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.host}/api/auth${suffix}`
    }
  })(this)

  private path(suffix: string): string {
    return `${this.host}/api${suffix}`
  }
}
