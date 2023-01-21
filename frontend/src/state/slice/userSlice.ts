import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    id: 0,
    name: "stranger",
    authToken: ""
  },
  reducers: {
    
  },
})

export const userAction = userSlice.actions 
