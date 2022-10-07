import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IGlobalState } from "./globalTypes";

const initialState: IGlobalState = {
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
});

// Actions
export const { handleCloseDrawer, handleOpenDrawer } = globalSlice.actions;

// Selectors
export const selectDrawer = (state: AppState) => state.global.drawer;
