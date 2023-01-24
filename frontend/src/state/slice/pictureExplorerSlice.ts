import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Utility } from '../../web/api/utility'
import { api, userId } from '../api'
import { Figure } from '../model/picture/figure/astraction/figure'
import { FigureFactory } from '../model/picture/figure/figureFactory'
import { Picture } from '../model/picture/picture'

export namespace PictureExplorer {
  const parseFigure = (text: string) =>
    FigureFactory.fromJson(Utility.deepConvertToMap(JSON.parse(text)))

  export const fetchPictures = createAsyncThunk(
    'pictures/fetchPictures',
    async () => {
      const pictures = await api.pictures.getAllByOwnerId(userId())
      return pictures
    },
  )

  export const postPicture = createAsyncThunk(
    'pictures/postPicture',
    async (p: { name: string; content: Figure }, { dispatch }) => {
      const picture = await api.pictures.post(p.name, p.content)
      dispatch(pictureExplorerAction.setCurrentPicture(picture))
      return picture
    },
  )

  export const setParsedPictureDraft = createAsyncThunk(
    'pictures/setParsedPicture',
    async (p: { name: string; content: string }, { dispatch }) => {
      const figure = parseFigure(p.content)
      const picture = new Picture(0, userId(), p.name, figure)
      dispatch(
        pictureExplorerAction.setCurrentPicture(
          new Picture(0, userId(), picture.name, picture.content),
        ),
      )
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
        .addCase(setParsedPictureDraft.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(setParsedPictureDraft.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.currentPicture = action.payload
        })
        .addCase(setParsedPictureDraft.rejected, (state, action) => {
          state.status = 'failed'
          if (action.error.message) {
            state.error = action.error.message
          }
        })
    },
  })
}

export const pictureExplorerAction = PictureExplorer.Slice.actions
