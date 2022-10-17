import { activateEmailSlice } from "@/modules/Auth/store";
import { counterSlice } from "@/modules/Counter/store";
import { storiesAllSlice } from "@/modules/Stories/store";
import { combineReducers } from "@reduxjs/toolkit";
import { globalApi } from "../services";
import { globalSlice } from "./global/globalSlice";

const reducers = combineReducers({
  [globalApi.reducerPath]: globalApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [activateEmailSlice.name]: activateEmailSlice.reducer,
  [storiesAllSlice.name]: storiesAllSlice.reducer,
  counter: counterSlice,
});

export const whitelist = [];

export const storeMiddlewares = [globalApi.middleware];

export default reducers;
