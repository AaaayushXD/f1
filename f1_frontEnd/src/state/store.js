import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../reducers/LoadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
