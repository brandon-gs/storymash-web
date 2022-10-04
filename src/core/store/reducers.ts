import { authApi } from "@/modules/Auth/services";
import { activateEmailSlice } from "@/modules/Auth/store";
import { counterSlice } from "@/modules/Counter/store";
import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "../services/User/userApi";
import { globalSlice } from "./global/globalSlice";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [activateEmailSlice.name]: activateEmailSlice.reducer,
  counter: counterSlice,
});

export const whitelist = [];

export const storeMiddlewares = [authApi.middleware, userApi.middleware];

export default reducers;
