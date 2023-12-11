import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    favouriteAdded: (state, action) => {
      state.splice(0, state.length);

      state.push(action.payload);
    },
    favouriteRemoved: (state) => {
      state.splice(0);
    },
  },
});

export const selectFavourite = (state) => state.favourites;
export const { favouriteAdded, favouriteRemoved } = favouriteSlice.actions;
export default favouriteSlice.reducer;
