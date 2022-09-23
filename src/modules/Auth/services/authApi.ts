import { baseQuery } from "@/core/services";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TRegisterSchema } from "../components";

interface IRegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery("auth"),
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, TRegisterSchema>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
        credentials: "include",
      }),
    }),
    resendActivationCode: builder.mutation<void, void>({
      query: () => ({
        url: "activation-code",
        method: "POST",
      }),
    }),
    activateAccount: builder.mutation<{}, { code: string }>({
      query: ({ code }) => ({
        url: `activate-account?code=${code}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useResendActivationCodeMutation,
  useActivateAccountMutation,
} = authApi;

export const {
  endpoints: { register },
} = authApi;
