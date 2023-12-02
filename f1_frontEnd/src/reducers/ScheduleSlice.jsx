import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    scheduleAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
  },

});

export const selectAllRaceSchedule = (state) => state.schedules;
export const { scheduleAdded } = scheduleSlice.actions;
export default scheduleSlice.reducer;
