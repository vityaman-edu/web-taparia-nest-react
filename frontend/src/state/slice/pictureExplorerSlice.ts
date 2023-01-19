import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Vector } from "../model/picture/figure/astraction/vector"
import { Ellipse } from "../model/picture/figure/primitive/ellipse"
import { Picture } from "../model/picture/picture"

export const pictureExplorerSlice = createSlice({
  name: "pictureExplorerSlice",
  initialState: {
    currentId: 1,
    all: [
      new Picture(1, 0, "Test picture 1", new Ellipse(
        {x: 10, y: 10} as Vector, 
        {x: 10, y: 10} as Vector
      )),
      new Picture(2, 0, "Test picture 2", new Ellipse(
        {x: 10, y: 20} as Vector, 
        {x: 10, y: 60} as Vector
      )),
    ]
  },
  reducers: {
    post: (state, action: PayloadAction<Picture>) => {
      state.all.push(action.payload)
    },
    set: (state, action: PayloadAction<number>) => {
      state.currentId = action.payload
    }
  },
})

export const pictureExplorerAction = pictureExplorerSlice.actions
