import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    userAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
    userRemoved: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const selectAllUsers = (state) => state.users;
export const { userAdded, userRemoved } = userSlice.actions;
export default userSlice.reducer;
