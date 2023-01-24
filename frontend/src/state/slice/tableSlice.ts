import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import { Tap } from '../model/picture/Tap'
import { store } from '../store'

export const fetchTaps = createAsyncThunk(
  'taps/fetchTaps',
  async (pictureId: number) => {
    const taps = await api.taps.getAllWith({
      pictureId: pictureId,
      ownerId: store.getState().user.id,
    })
    return taps
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
  },
})

export const tableActions = tableSlice.actions
