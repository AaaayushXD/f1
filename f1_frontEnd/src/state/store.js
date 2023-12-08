import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import driversReducer from "../reducers/DriverSlice";
import teamReducer from "../reducers/TeamSlice";
import circuitReducer from "../reducers/CircuitSlice";
import scheduleReducer from "../reducers/ScheduleSlice";
import resultReducer from "../reducers/ResultSlice";
import userReducer from "../reducers/UserSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  drivers: driversReducer,
  teams: teamReducer,
  circuits: circuitReducer,
  schedules: scheduleReducer,
  results: resultReducer,
  users: userReducer,
});
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
});

export const persistor = persistStore(store);
