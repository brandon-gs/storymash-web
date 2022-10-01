import { authQuery } from "../authQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IUser, IUserAccount } from "@/core/store/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authQuery("user"),
  endpoints: (builder) => ({
    getUserAccount: builder.query<{ account: IUserAccount }, void>({
      query: () => ({
        url: "account",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserAccountQuery, useGetUserQuery } = userApi;

export const {
  endpoints: { getUserAccount, getUser },
} = userApi;
