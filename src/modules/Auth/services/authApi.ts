import { baseQuery } from "@/core/services";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TRegisterSchema } from "../components";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery("auth"),
  endpoints: (builder) => ({
    register: builder.mutation<{}, TRegisterSchema>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;

export const {
  endpoints: { register },
} = authApi;
