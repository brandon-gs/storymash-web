import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import { Path } from "react-hook-form";
import fetchFn from "isomorphic-fetch";
// import { AppState } from "../store";

/**
 * TODO: Implement refresh token and logout on 401,403 errors
 * reference: https://codevoweb.com/react-redux-toolkit-refresh-token-authentication/
 */

export type IRegisterErrorResponse = {
  message: string;
  field: string;
};

export type IBaseQueryErrors = {
  data: IRegisterErrorResponse; // Add other type of errors
};

export type IValidationErrors<ISchema> = {
  data: {
    validationErrors: Array<{
      path: [string, Path<ISchema>];
      message: string;
    }>;
  };
};

export const baseQuery = (prefix: string) =>
  fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${prefix}`,
    credentials: "include",
    fetchFn,
  }) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IBaseQueryErrors | IValidationErrors<any>,
    {}
  >;
