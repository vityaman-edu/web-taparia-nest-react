import { 
  configureStore, 
  ThunkAction, 
  Action, 
  combineReducers 
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { pictureListSlice } from './slice/pictureListSlice'

export const store = configureStore({
  reducer: combineReducers([
    pictureListSlice.reducer
  ]),
  middleware: [
    logger
  ] as const,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = 
  ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >
