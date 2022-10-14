import type { IUser, IUserAccount } from "./userApiTypes";
import { globalApi } from "../globalApi";

export const userApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
      keepUnusedDataFor: 300,
      providesTags: ["User"],
    }),
    getUserAccount: builder.query<{ account: IUserAccount }, void>({
      query: () => ({
        url: "/user/account",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserAccountQuery, useGetUserQuery } = userApi;

export const {
  endpoints: { getUserAccount, getUser },
} = userApi;
