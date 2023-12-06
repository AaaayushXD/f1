import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const driverSlice = createSlice({
  name: "driversDetail",
  initialState,
  reducers: {
    driversAdded: (state, action) => {
      state.splice(0, state.length);
      state.push(action.payload);
    },
  },
});

export const selectAllDrivers = (state) => state.drivers;
export const { driversAdded } = driverSlice.actions;
export default driverSlice.reducer;
