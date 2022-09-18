import Router from "next/router";
import { authApi } from "@/modules/Auth/services";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import type { AppState, IRehydrateAppAction } from "@/core/store";
import type { IActivateEmailState, ISetEmailToActiveAction } from "../types";

const initialState: IActivateEmailState = {
  email: undefined,
  formErrors: {
    email: undefined,
    username: undefined,
  },
};

const activateEmailSlice = createSlice({
  name: "activateEmail",
  initialState,
  reducers: {
    setEmailToActivate: (
      state,
      action: PayloadAction<ISetEmailToActiveAction>
    ) => {
      state.email = action.payload.email;
    },
    setResetRegisterFormErrors: (state) => {
      state.formErrors = initialState.formErrors;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      REHYDRATE,
      (state, rehydrateParams: IRehydrateAppAction) => {
        if (rehydrateParams.payload && rehydrateParams.payload.activateEmail) {
          state = rehydrateParams.payload.activateEmail;
        }
      }
    );
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
      // Clear errors if the request was success and redirect to the activate account page
      state.formErrors = initialState.formErrors;
      Router.push("/activate-account");
    });
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, { payload }) => {
        // Show an error if it is a field error
        if (payload?.data.field !== undefined) {
          state.formErrors = {
            ...state.formErrors,
            [payload.data.field]: payload.data.message,
          };
        }
      }
    );
  },
});

// Actions
export const { setEmailToActivate, setResetRegisterFormErrors } =
  activateEmailSlice.actions;

// Selectors
export const selectActivateEmail = (state: AppState) =>
  state.activateEmail.email;

export const selectActivateEmailErrors = (state: AppState) =>
  state.activateEmail.formErrors;

// Reducer
export default activateEmailSlice;
