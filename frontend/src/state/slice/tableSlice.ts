import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import { globalState } from '../globalState'
import { Vector } from '../model/picture/figure/astraction/vector'
import { Tap } from '../model/picture/tap'

export const fetchTaps = createAsyncThunk(
  'taps/fetchTaps',
  async (pictureId: number) => {
    const taps = await api.taps.getAllWith({
      pictureId: pictureId,
      ownerId: globalState.getUserId(),
    })
    return taps
  },
)

export const postTap = createAsyncThunk(
  'taps/postTap',
  async (t: {pictureId: number, pos: Vector}) => {
    const tap = await api.taps.post(t.pictureId, t.pos)
    return tap
  },
)

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState: {
    taps: [] as Tap[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: '',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTaps.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTaps.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.taps = action.payload
      })
      .addCase(fetchTaps.rejected, (state, action) => {
        state.status = 'failed'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
      .addCase(postTap.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(postTap.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.taps.push(action.payload)
        state.taps = state.taps.reverse()
      })
      .addCase(postTap.rejected, (state, action) => {
        state.status = 'failed'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
  },
})

export const tableActions = tableSlice.actions
