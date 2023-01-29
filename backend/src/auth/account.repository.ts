import { Injectable } from '@nestjs/common'
import { Account as AccountEntity } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { Account, Profile } from './model/account'
import { AuthId, authMethodFromString } from './model/auth'

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  create(authId: AuthId): Promise<Account> {
    return this.prisma.account
      .create({
        data: {
          authMethod: authId.method,
          externalId: authId.external,
        },
      })
      .then(this.convert)
  }

  async createProfile(profile: Profile): Promise<void> {
    await this.prisma.profile.create({
      data: {
        accountId: profile.accountId,
        name: profile.name,
      },
    })
  }

  findById(id: number): Promise<Account> {
    return this.prisma.account
      .findUnique({
        where: { id: id },
      })
      .then(this.convert)
  }

  findByAuthId(id: AuthId): Promise<Account> {
    return this.prisma.account
      .findUnique({
        where: {
          authMethod_externalId: {
            authMethod: id.method,
            externalId: id.external,
          },
        },
      })
      .then(this.convert)
  }

  setRefrestTokenHash(arg: { accountId: number; hash: string }) {
    return this.prisma.account.update({
      where: { id: arg.accountId },
      data: { refreshTokenHash: arg.hash },
    })
  }

  removeRefreshTokenHash(accountId: number) {
    return this.prisma.account.update({
      where: { id: accountId },
      data: { refreshTokenHash: null },
    })
  }

  private convert(entity: AccountEntity): Account {
    return {
      ...entity,
      authId: {
        method: authMethodFromString(entity.authMethod),
        external: entity.externalId,
      },
    }
  }
}
