import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../functions/LoadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
