import $ from 'jquery'
import { Picture } from '../../state/model/picture/picture'
import { Figure } from '../../state/model/picture/figure/astraction/figure'
import { Vector } from '../../state/model/picture/figure/astraction/vector'
import { Utility } from './utility'
import { User } from './dto/user'
import { TapResult } from './dto/tapResult'
import { Api } from './api'
import { LocalCredentials } from './dto/local.credentials'
import { TokenPair } from './dto/token.pair'

const GET = 'GET'
const POST = 'POST'

export class HttpApi implements Api {
  constructor(
    private readonly host: string,
    private readonly timeout: number,
    private readonly tokens: () => TokenPair
  ) {}

  ops = new (class {
    constructor(private readonly api: HttpApi) {}

    ping(): Promise<void> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path('/ping'),
          timeout: this.api.timeout,
          success: resolve,
          error: (request, status, error) => reject({status, error}),
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
          error: (request, status, error) => reject({status, error}),
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/users${suffix}`)}`
    }
  })(this)

  pictures = new (class {
    constructor(private readonly api: HttpApi) {}

    post(name: string, content: Figure): Promise<number> {
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
            resolve(json.get('picture_id'))
          },
          error: (request, status, error) => reject({status, error}),
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
          error: (request, status, error) => reject({status, error}),
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
            console.log(data)
            const pictures = $.makeArray(data as ArrayLike<any>)
              .map(Utility.deepConvertToMap)
              .map(Picture.fromJson)
            resolve(pictures)
          },
          error: (request, status, error) => reject({status, error}),
        }),
      )
    }

    path(suffix: string): string {
      return `${this.api.path(`/pictures${suffix}`)}`
    }
  })(this)

  picturesTaps = new (class {
    constructor(private readonly api: HttpApi) {}

    post(pictureId: number, point: Vector): Promise<TapResult> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: POST,
          url: this.path(pictureId, ''),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          contentType: 'application/json',
          data: JSON.stringify({
            x: point.x,
            y: point.y,
          }),
          success: (data: object) => {
            const json = Utility.deepConvertToMap(data)
            resolve(TapResult.fromJson(json))
          },
          error: (request, status, error) => reject({status, error}),
        }),
      )
    }

    getAllByOwnerId(
      pictureId: number,
      ownerId: number,
    ): Promise<Array<TapResult>> {
      return new Promise((resolve, reject) =>
        $.ajax({
          type: GET,
          url: this.path(pictureId, `?owner_id=${ownerId}`),
          timeout: this.api.timeout,
          headers: {
            Authorization: `Bearer ${this.api.tokens().accessToken}`,
          },
          success: (data: object) => {
            const results = $.makeArray(data as ArrayLike<any>)
              .map(Utility.deepConvertToMap)
              .map(TapResult.fromJson)
            resolve(results)
          },
          error: (request, status, error) => reject({status, error}),
        }),
      )
    }

    path(pictureId: number, suffix: string): string {
      return `${this.api.path(`/pictures/${pictureId}/taps${suffix}`)}`
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
                  json.get('accessToken'),
                  json.get('refreshToken'),
                ),
              )
            },
            error: (request, status, error) => reject({status, error}),
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
                  json.get('accessToken'),
                  json.get('refreshToken'),
                ),
              )
            },
            error: (request, status, error) => reject({status, error}),
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
              new TokenPair(json.get('accessToken'), json.get('refreshToken')),
            )
          },
          error: (request, status, error) => reject({status, error}),
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
            resolve()
          },
          error: (request, status, error) => reject({status, error}),
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
