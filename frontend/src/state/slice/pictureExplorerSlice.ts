import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'
import { Vector } from '../model/picture/figure/astraction/vector'
import { Ellipse } from '../model/picture/figure/primitive/ellipse'
import { Picture } from '../model/picture/picture'
import { store } from '../store'

export namespace PictureExplorer {
  export const fetchPictures = createAsyncThunk(
    'pictures/fetchPictures',
    async () => {
      const pictures = await api.pictures.getAllByOwnerId(
        store.getState().user.id,
      )
      return pictures
    },
  )

  export enum State {
    EDITING,
    VIEWING,
  }

  export const Slice = createSlice({
    name: 'pictureExplorerSlice',
    initialState: {
      currentPicture: new Picture(
        -1,
        -1,
        'unnamed',
        new Ellipse({ x: 0, y: 0 } as Vector, { x: 0, y: 0 } as Vector),
      ),
      pictureHeaders: [] as Picture.Header[],
      state: PictureExplorer.State.EDITING,
      status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
      error: '',
    },
    reducers: {
      setCurrentPicture(state, action: PayloadAction<Picture>): void {
        const picture = action.payload
        state.currentPicture = picture
        if (picture.id == -1) return
        if (!state.pictureHeaders.some((pic) => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      },
      addPicture(state, action: PayloadAction<Picture.Header>): void {
        const picture = action.payload
        if (!state.pictureHeaders.some((pic) => pic.id == picture.id)) {
          state.pictureHeaders.push(picture)
        }
      },
      setState(state, action: PayloadAction<State>) {
        state.state = action.payload
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPictures.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchPictures.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.pictureHeaders = action.payload
        })
        .addCase(fetchPictures.rejected, (state, action) => {
          state.status = 'failed'
          if (action.error.message) {
            state.error = action.error.message
          }
        })
    },
  })
}

export const pictureExplorerAction = PictureExplorer.Slice.actions
