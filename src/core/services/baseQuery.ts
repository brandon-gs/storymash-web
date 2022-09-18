import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
// import { AppState } from "../store";

/**
 * TODO: Implement refresh token and logout on 401,403 errors
 * reference: https://codevoweb.com/react-redux-toolkit-refresh-token-authentication/
 */

export type IRegisterErrorResponse = {
  message: string;
  field: string;
};

type IBaseQueryErrors = {
  data: IRegisterErrorResponse; // Add other type of errors
};

export const baseQuery = (prefix: string) =>
  fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${prefix}`,
    // prepareHeaders: async (headers, { getState }) => {
    //   const token = (getState() as AppState).auth.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }) as unknown as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IBaseQueryErrors,
    {}
  >;
