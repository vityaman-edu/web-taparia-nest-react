import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Vector } from "../model/picture/figure/astraction/vector"
import { Ellipse } from "../model/picture/figure/primitive/ellipse"
import { Picture } from "../model/picture/picture"

export namespace PictureExplorer {
  export enum State {
    EDITING, 
    VIEWING
  }

  export const Slice = createSlice({
    name: "pictureExplorerSlice",
    initialState: {
      currentPicture: new Picture(-1, -1, "unnamed", new Ellipse(
        { x: 0, y: 0 } as Vector, 
        { x: 0, y: 0 } as Vector
      )),
      pictureHeaders: [] as Picture.Header[],
      state: PictureExplorer.State.EDITING
    },
    reducers: {
      setCurrentPicture(state, action: PayloadAction<Picture>): void {
        const picture = action.payload
        state.currentPicture = picture
        if (picture.id == -1) return
        if (!state.pictureHeaders.some(pic => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      },
      addPicture(state, action: PayloadAction<Picture.Header>): void {
        const picture = action.payload
        if (!state.pictureHeaders.some(pic => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      },
      setState(state, action: PayloadAction<State>) {
        state.state = action.payload
      }
    },
  })
}

export const pictureExplorerAction = 
  PictureExplorer.Slice.actions
