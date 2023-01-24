import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { PictureExplorer } from './slice/pictureExplorerSlice'
import { tableSlice } from './slice/tableSlice'

export const store = configureStore({
  reducer: {
    pictureExplorer: PictureExplorer.Slice.reducer,
    table: tableSlice.reducer,
  },
  middleware: [thunkMiddleware, logger] as const,
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export type AppDispatch = AppThunkDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
