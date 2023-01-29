import { Injectable } from '@nestjs/common'
import { AuthLocal as AuthLocalEntity, Prisma } from '@prisma/client'
import { AuthLocal, AuthLocalDraft } from 'src/auth/model/auth'
import { PrismaKnownErrorCode } from 'src/prisma/prisma.known.error.code'
import { PrismaService } from 'src/prisma/prisma.service'
import { AccountAlreadyExistsError } from './error/account.already.exists.error'

@Injectable()
export class AuthLocalRepository {
  constructor(private prisma: PrismaService) {}

  create(entry: AuthLocalDraft): Promise<AuthLocal> {
    return this.prisma.authLocal
      .create({
        data: {
          email: entry.email,
          passwordHash: entry.passwordHash,
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case PrismaKnownErrorCode.UninqueConstaintFailed:
              throw new AccountAlreadyExistsError(entry.email)
          }
        }
        throw e
      })
      .then(this.convert)
  }

  findById(id: number): Promise<AuthLocal> {
    return this.prisma.authLocal
      .findUnique({
        where: { id: id },
      })
      .then(this.convert)
  }

  findByEmail(email: string): Promise<AuthLocal> {
    return this.prisma.authLocal
      .findUnique({
        where: { email: email },
      })
      .then(this.convert)
  }

  private convert(e: AuthLocalEntity) {
    return new AuthLocal(e.id, e.email, e.passwordHash)
  }
}
