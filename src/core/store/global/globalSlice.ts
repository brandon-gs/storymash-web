import { getUser } from "@/core/services";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IGlobalState } from "./globalTypes";

const initialState: IGlobalState = {
  userId: undefined,
  drawer: {
    open: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleOpenDrawer: (state) => {
      state.drawer.open = true;
    },
    handleCloseDrawer: (state) => {
      state.drawer.open = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getUser.matchFulfilled, (state, { payload }) => {
      state.userId = payload._id;
    });
  },
});

// Actions
export const { handleCloseDrawer, handleOpenDrawer } = globalSlice.actions;

// Selectors
export const selectDrawer = (state: AppState) => state.global.drawer;
