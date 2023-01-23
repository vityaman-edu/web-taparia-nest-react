export class PictureNotFoundError extends Error {
  constructor(pictureId: number) {
    super(`Picture with id ${pictureId} not found`)
  }
}
