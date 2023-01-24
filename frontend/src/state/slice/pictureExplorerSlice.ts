import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, userId } from '../api'
import { useAppDispatch } from '../hooks'
import { Figure } from '../model/picture/figure/astraction/figure'
import { Picture } from '../model/picture/picture'

export namespace PictureExplorer {
  export const fetchPictures = createAsyncThunk(
    'pictures/fetchPictures',
    async () => {
      const pictures = await api.pictures.getAllByOwnerId(userId())
      return pictures
    },
  )

  export const postPicture = createAsyncThunk(
    'pictures/postPicture',
    async (p: { name: string; content: Figure }) => {
      const picture = await api.pictures.post(p.name, p.content)
      return picture
    },
  )

  export enum State {
    EDITING,
    VIEWING,
    COMMITED,
  }

  export const Slice = createSlice({
    name: 'pictureExplorerSlice',
    initialState: {
      currentPicture: null as Picture | null,
      pictureHeaders: [] as Picture.Header[],
      state: PictureExplorer.State.EDITING,
      status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
      error: '',
    },
    reducers: {
      setCurrentPicture(state, action: PayloadAction<Picture>): void {
        const picture = action.payload
        state.currentPicture = picture
        state.error = ''
        state.status = 'succeeded'
      },
      setState(state, action: PayloadAction<State>) {
        state.state = action.payload
      },
      setError(state, action: PayloadAction<string>) {
        state.status = 'failed'
        state.error = action.payload
      },
      setOk(state) {
        state.error = ''
        state.status = 'succeeded'
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
        .addCase(postPicture.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(postPicture.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.pictureHeaders.push(action.payload)
          state.currentPicture = action.payload
          state.state = State.VIEWING
        })
        .addCase(postPicture.rejected, (state, action) => {
          state.status = 'failed'
          if (action.error.message) {
            state.error = action.error.message
          }
        })
    },
  })
}

export const pictureExplorerAction = PictureExplorer.Slice.actions
