import { authQuery } from "../authQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IUserAccount } from "@/core/store/User";

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
    // register: builder.mutation<IRegisterResponse, TRegisterSchema>({
    //   query: (user) => ({
    //     url: "register",
    //     method: "POST",
    //     body: user,
    //     credentials: "include",
    //   }),
    // }),
    // resendActivationCode: builder.mutation<{}, {}>({
    //   query: () => ({
    //     url: "activation-code",
    //     method: "POST",
    //     // body,
    //   }),
    // }),
  }),
});

export const { useGetUserAccountQuery } = userApi;

export const {
  endpoints: { getUserAccount },
} = userApi;
