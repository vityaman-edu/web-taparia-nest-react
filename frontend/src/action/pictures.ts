import { Action } from "@reduxjs/toolkit"
import { Picture } from "../state/model/picture/picture"

export namespace Pictures {
  const PICTURES             = "pictures/"
  export const PICTURE_CREATED      = `${PICTURES}/pictureCreated`
  export const PICTURE_REQUESTED    = `${PICTURES}/pictureRequested`
  export const PICTURES_LISTED      = `${PICTURES}/allPicturesListed`
  export const PICTURE_LIST_UPDATED = `${PICTURES}/pictureListUpdated`

  export const created = (picture: Picture) => ({
    type: PICTURE_CREATED,
    payload: {
      picture
    }
  }) as Action
}
