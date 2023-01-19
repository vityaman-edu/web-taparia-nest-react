import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    name: "stranger",
    id: 0,
    authToken: ""
  },
  reducers: {
    
  },
})

export const userAction = userSlice.actions 
