import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    activateLoading: (state) => {
      state.loading = true;
    },
    deactivateLoading: (state) => {
      state.loading = false;
    },
  },
});

export const selectLoading = (state) => state.loading.loading;
export const { activateLoading, deactivateLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
