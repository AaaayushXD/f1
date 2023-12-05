import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const circuitSlice = createSlice({
  name: "circuitDetail",
  initialState,
  reducers: {
    circuitAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
  },

});

export const selectAllCircuits = (state) => state.circuits;
export const { circuitAdded } = circuitSlice.actions;
export default circuitSlice.reducer;
