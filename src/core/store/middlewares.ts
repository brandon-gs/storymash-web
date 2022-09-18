import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { SnackbarUtils } from "../utils";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line no-unused-vars
  (_api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const message =
        action.payload.status === "FETCH_ERROR"
          ? "Error al conectar con el servidor"
          : action.payload.data.message ?? "Error";
      SnackbarUtils.error(message, {
        preventDuplicate: true,
        key: "rtk_middleware_api_error",
      });
    }

    return next(action);
  };
