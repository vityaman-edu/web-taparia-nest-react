import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaKnownErrorCode } from 'src/prisma/prisma.known.error.code'
import { PrismaService } from 'src/prisma/prisma.service'
import { PictureNotFoundError } from './error/picture.not.found.error'
import { Figure } from './model/figure2/figure'
import { Picture, PictureDraft } from './model/picture'

@Injectable()
export class PictureRepository {
  constructor(private prisma: PrismaService) {}

  create(ownerId: number, picture: PictureDraft) {
    return this.prisma.picture
      .create({
        data: {
          owner: { connect: { account_id: ownerId } },
          name: picture.name,
          content: picture.content as object,
        },
      })
      .then(convert)
  }

  getById(id: number) {
    return this.prisma.picture
      .findUniqueOrThrow({ where: { id: id } })
      .then(convert)
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case PrismaKnownErrorCode.NotFound:
              throw new PictureNotFoundError(id)
          }
        }
        throw e
      })
  }

  getByOwnerId(ownerId: number) {
    return this.prisma.picture
      .findMany({ where: { ownerId: ownerId } })
      .then((list) => list.map(convert))
  }
}

// TODO: this 'as unknown as smth' looks like a mess
const convert = (pic: {
  id: number
  ownerId: number
  name: string
  content: Prisma.JsonValue
}) => {
  return {
    id: pic.id,
    ownerId: pic.ownerId,
    name: pic.name,
    content: pic.content as unknown as Figure,
  } as unknown as Picture
}
