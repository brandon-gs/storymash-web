import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import fetchFn from "isomorphic-fetch";
// import { AppState } from "../store";

/**
 * TODO: Implement refresh token and logout on 401,403 errors
 * reference: https://codevoweb.com/react-redux-toolkit-refresh-token-authentication/
 */

export type IErrorResponse = {
  message: string;
  field: string;
};

type IAuthQueryErrors = {
  data: IErrorResponse; // Add other type of errors
};

export const authQuery = (prefix: string) =>
  fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${prefix}`,
    credentials: "include",
    fetchFn,
  }) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IAuthQueryErrors,
    {}
  >;
