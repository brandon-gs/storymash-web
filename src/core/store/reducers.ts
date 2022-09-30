import { authApi } from "@/modules/Auth/services";
import { activateEmailSlice } from "@/modules/Auth/store";
import { counterSlice } from "@/modules/Counter/store";
import { onboardingApi } from "@/modules/Onboarding/services";
import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "../services/User/userApi";
import { userSlice } from "./User";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  [activateEmailSlice.name]: activateEmailSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  counter: counterSlice,
});

export const whitelist = [];

export const storeMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  onboardingApi.middleware,
];

export default reducers;
