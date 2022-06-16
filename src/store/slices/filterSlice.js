import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
  val: 2
}

export const counterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 2
    },
    decrement: (state) => {
      state.value -= state.val
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer