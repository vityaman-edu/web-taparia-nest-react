import { Injectable } from '@nestjs/common'
import { AccountRepository } from './account.repository'
import { AuthService } from './auth.service'
import { AuthMethod } from './model/auth'
import { Tokens } from './model/token.pair'
import { YandexCredentials } from './model/yandex.credentials'
import { YandexApi } from './yandex.api'

@Injectable()
export class AuthYandexService {
  constructor(
    private yandex: YandexApi,
    private auth: AuthService,
    private account: AccountRepository,
  ) {}

  async signIn(credentials: YandexCredentials): Promise<Tokens> {
    const yandexUser = await this.yandex.getUserInfo(credentials)
    const authId = {
      method: AuthMethod.YandexId,
      external: yandexUser.id,
    }
    let account = await this.account.findByAuthId(authId)
    if (account == null) {
      account = await this.account.create(authId)
      await this.account.createProfile({
        accountId: account.id,
        name: yandexUser.name,
      })
    }
    const tokens = this.auth.issueTokens(account)
    return tokens
  }
}
