import { authApi } from "@/modules/Auth/services";
import { activateEmailSlice } from "@/modules/Auth/store";
import { counterSlice } from "@/modules/Counter/store";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [activateEmailSlice.name]: activateEmailSlice.reducer,
  counter: counterSlice,
});

export const whitelist = [activateEmailSlice.name];

export const storeMiddlewares = [authApi.middleware];

export default reducers;
