import Router from "next/router";
import { authApi } from "@/modules/Auth/services";
import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "@/core/store";
import type { IActivateEmailState } from "./types";

const initialState: IActivateEmailState = {
  formErrors: {
    email: undefined,
    username: undefined,
  },
};

export const activateEmailSlice = createSlice({
  name: "activateEmail",
  initialState,
  reducers: {
    setResetRegisterFormErrors: (state) => {
      state.formErrors = initialState.formErrors;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
      // Clear errors if the request was success and redirect to the activate account page
      state.formErrors = initialState.formErrors;
      Router.push("/activate-account");
    });
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, { payload }) => {
        // Show an error if it is a field error
        if (
          payload !== undefined &&
          "data" in payload &&
          "field" in payload.data
        ) {
          state.formErrors = {
            ...initialState.formErrors,
            [payload.data.field]: payload.data.message,
          };
        }
      }
    );
  },
});

// Actions
export const { setResetRegisterFormErrors } = activateEmailSlice.actions;

// Selectors
export const selectActivateEmail = (state: AppState) =>
  state.activateEmail.email;

export const selectActivateEmailErrors = (state: AppState) =>
  state.activateEmail.formErrors;
