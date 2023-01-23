import { Injectable } from '@nestjs/common'
import { Picture, PictureDraft } from './model/picture'
import { PictureRepository } from './picture.repository'

@Injectable()
export class PictureService {
  constructor(private pictureRepository: PictureRepository) {}

  async create(ownerId: number, picture: PictureDraft): Promise<Picture> {
    return this.pictureRepository.create(ownerId, picture)
  }

  async getById(id: number): Promise<Picture> {
    return this.pictureRepository.getById(id)
  }

  async getAllByOwnerId(ownerId: number): Promise<Picture[]> {
    return this.pictureRepository.getByOwnerId(ownerId)
  }
}
