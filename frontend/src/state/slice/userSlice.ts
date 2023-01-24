import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    id: 1,
    name: "stranger",
  },
  reducers: {
  },
})

export const userAction = userSlice.actions 
