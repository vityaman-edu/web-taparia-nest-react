import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TokenPair } from "../../web/api/dto/token.pair"

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    id: 1,
    name: "stranger",
    tokens: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidml0eWFAdml0eWEucnUiLCJpYXQiOjE2NzQ1NDQzOTAsImV4cCI6MTY3NDU0NTI5MH0.Wo31tMMWOXThpXu7zs1Uz1oU1qbtTebqEi-e5W3RJgQ",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidml0eWFAdml0eWEucnUiLCJpYXQiOjE2NzQ1NDQzOTAsImV4cCI6MTY3NTE0OTE5MH0.d6-FfRhejXRsaUfpIeYNkPCeCrpVwuGMexO6K902w8A",
    }
  },
  reducers: {
    setTokens(state, action: PayloadAction<TokenPair>): void {
      state.tokens = action.payload
    }
  },
})

export const userAction = userSlice.actions 
