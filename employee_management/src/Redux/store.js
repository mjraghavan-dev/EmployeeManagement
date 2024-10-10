import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { EmployeeReducer } from "./reducers/employeeReducers";

// Combine reducers if you have more than one reducer
const reducer = combineReducers({
  user: userReducer,
  employees: EmployeeReducer
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production", // Enable devTools only in development
});

export default store;
