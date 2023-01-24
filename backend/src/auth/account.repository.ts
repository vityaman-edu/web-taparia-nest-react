import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { AccountAlreadyExistsError } from './error/account.already.exists.error'

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  create(account: { email: string; passwordHash: string }) {
    return this.prisma.account
      .create({
        data: {
          email: account.email,
          passwordHash: account.passwordHash,
        },
      })
      .then((account) =>
        this.prisma.profile
          .create({
            data: {
              name: account.email,
              account_id: account.id,
            },
          })
          .then(() => account),
      )
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new AccountAlreadyExistsError(account.email)
          }
        }
        throw e
      })
  }

  findByEmail(email: string) {
    return this.prisma.account.findUnique({
      where: { email: email },
    })
  }

  findById(id: number) {
    return this.prisma.account.findUnique({
      where: { id: id },
    })
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
}
