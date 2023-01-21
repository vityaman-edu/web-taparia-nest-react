import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { PictureExplorer } from './slice/pictureExplorerSlice'
import { userSlice } from './slice/userSlice'

export const store = configureStore({
  reducer: {
    pictureExplorer: PictureExplorer.Slice.reducer,
    user: userSlice.reducer
  },
  middleware: [
    logger
  ] as const,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = 
  ThunkAction<ReturnType, RootState, unknown, Action<string>>
