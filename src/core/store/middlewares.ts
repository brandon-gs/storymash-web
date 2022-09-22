import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { SnackbarUtils } from "../utils";
import Router from "next/router";

const SNACKBAR_RTK_MIDDLEWARE = {
  success: "rtk_middleware_api_success_message",
  error: "rtk_middleware_api_error_message",
};
/**
 * Show snackbar message and
 * Also clear the user session if the api response with a 401 code
 */
export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line no-unused-vars
  (_api: MiddlewareAPI) => (next) => (action) => {
    const { payload } = action;
    // Handle sucess request
    if (isFulfilled(action)) {
      const sucessMessage = payload.message ?? payload.data?.message;
      if (typeof sucessMessage === "string") {
        SnackbarUtils.close(SNACKBAR_RTK_MIDDLEWARE.success);
        SnackbarUtils.success(sucessMessage, {
          preventDuplicate: true,
          key: SNACKBAR_RTK_MIDDLEWARE.success,
        });
      }
    }

    // handle api errors
    if (isRejectedWithValue(action)) {
      const errorMessage =
        payload.data ??
        payload.data?.message ??
        "Error al conectar con el servidor";

      SnackbarUtils.close(SNACKBAR_RTK_MIDDLEWARE.error);
      SnackbarUtils.error(errorMessage, {
        preventDuplicate: true,
        key: SNACKBAR_RTK_MIDDLEWARE.error,
      });

      // redirect to login page
      if (payload.originalStatus === 401) {
        Router.push("/login");
      }
    }

    return next(action);
  };
