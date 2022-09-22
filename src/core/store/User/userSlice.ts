import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import type { IUserState, IActionSetUser } from "./userTypes";

const initialState: IUserState = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as IUserState,
  reducers: {
    setUserAction: (state, action: PayloadAction<IActionSetUser>) => {
      state = action.payload;
    },
  },
});

// Actions
export const { setUserAction } = userSlice.actions;

// Selectors
export const selectUser = (state: AppState) => state.user;
