import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { YandexCredentials } from './model/yandex.credentials'
import { YandexUserInfo } from './model/yandex.user.info'

@Injectable()
export class YandexApi {
  constructor(private http: HttpService) {}

  async getUserInfo(credentials: YandexCredentials): Promise<YandexUserInfo> {
    const { data } = await firstValueFrom(
      this.http.get<{
        id: string
        login: string
        real_name: string
      }>('https://login.yandex.ru/info?format=json', {
        headers: {
          Authorization: `OAuth ${credentials.token}`,
        },
      }),
    )
    return {
      id: parseInt(data.id),
      login: data.login,
      name: data.real_name,
    }
  }
}
