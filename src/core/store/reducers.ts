import { activateEmailSlice } from "@/modules/Auth/store";
import { counterSlice } from "@/modules/Counter/store";
import { combineReducers } from "@reduxjs/toolkit";
import { globalApi } from "../services";
import { globalSlice } from "./global/globalSlice";

const reducers = combineReducers({
  [globalApi.reducerPath]: globalApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [activateEmailSlice.name]: activateEmailSlice.reducer,
  counter: counterSlice,
});

export const whitelist = [];

export const storeMiddlewares = [globalApi.middleware];

export default reducers;
