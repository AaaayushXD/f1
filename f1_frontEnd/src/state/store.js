import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loadingReducer from "../reducers/LoadingSlice";
import driversReducer from "../reducers/DriverSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  loading: loadingReducer,
  drivers: driversReducer,
});
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
});

export const persistor = persistStore(store);
