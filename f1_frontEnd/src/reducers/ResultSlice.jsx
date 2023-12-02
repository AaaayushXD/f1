import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const resultSlice = createSlice({
  name: "raceWinners",
  initialState,
  reducers: {
    resultAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
  },
});

export const selectAlllWinners = (state) => state.results;
export const { resultAdded } = resultSlice.actions;
export default resultSlice.reducer;
