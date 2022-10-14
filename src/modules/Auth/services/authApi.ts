import { globalApi } from "@/core/services";
import { TRegisterSchema } from "../components";
import { ILoginSchema } from "../components/FormLogin/FormLoginSchema";

interface IRegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const authApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, TRegisterSchema>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
        credentials: "include",
      }),
    }),
    login: builder.mutation<ILoginSchema, ILoginSchema>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    resendActivationCode: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/activation-code",
        method: "POST",
      }),
    }),
    activateAccount: builder.mutation<{}, { code: string }>({
      query: ({ code }) => ({
        url: `/auth/activate-account?code=${code}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendActivationCodeMutation,
  useActivateAccountMutation,
  useLogoutMutation,
} = authApi;

export const {
  endpoints: { register, login, logout, activateAccount, resendActivationCode },
} = authApi;
