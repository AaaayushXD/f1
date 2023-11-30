import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const driverSlice = createSlice({
  name: "driversDetail",
  initialState,
  reducers: {
    driversAdded: (state, action) => {
      state.push(action.payload);
    },
  },
  driversRemoved: {
    reducer(state) {
      state.pop();
    },
  },
});

export const selectAllDrivers = (state) => state.drivers;
export const { driversAdded, driversRemoved } = driverSlice.actions;
export default driverSlice.reducer;
