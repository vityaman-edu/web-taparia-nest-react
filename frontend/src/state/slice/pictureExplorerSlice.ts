import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Picture } from "../model/picture/picture"

export namespace PictureExplorer {
  export enum State {
    EDITING, 
    VIEWING
  }

  export const Slice = createSlice({
    name: "pictureExplorerSlice",
    initialState: {
      currentPicture: null as (Picture | null),
      pictureHeaders: [] as Picture.Header[],
      state: PictureExplorer.State.EDITING
    },
    reducers: {
      setCurrentPicture(state, action: PayloadAction<Picture>): void {
        const picture = action.payload
        state.state = PictureExplorer.State.VIEWING
        state.currentPicture = picture
        if (!state.pictureHeaders.some(pic => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      },
      addPicture(state, action: PayloadAction<Picture.Header>): void {
        const picture = action.payload
        if (!state.pictureHeaders.some(pic => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      }
    },
  })
}

export const pictureExplorerAction = 
  PictureExplorer.Slice.actions
