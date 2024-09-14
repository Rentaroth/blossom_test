import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const characterReducer = createSlice({
  name: 'character',
  initialState,
  reducers: {

  }
})

export const { } = characterReducer.actions;

export default characterReducer.reducer;