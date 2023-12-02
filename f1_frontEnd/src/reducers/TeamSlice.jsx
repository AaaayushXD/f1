import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const teamSlice = createSlice({
  name: "teamDetail",
  initialState,
  reducers: {
    teamsAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
  },
});

export const selectAllTeams = (state) => state.teams;
export const { teamsAdded } = teamSlice.actions;
export default teamSlice.reducer;
