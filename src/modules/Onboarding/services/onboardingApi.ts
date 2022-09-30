import { baseQuery } from "@/core/services";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IOnboardingInfoFormSchema } from "../components";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  baseQuery: baseQuery("user/onboarding"),
  endpoints: (builder) => ({
    onboardingUpdateInfo: builder.mutation<void, IOnboardingInfoFormSchema>({
      query: (info) => ({
        url: "info",
        method: "PUT",
        body: info,
      }),
    }),
    onboardingUpdateGender: builder.mutation<void, { gender: string }>({
      query: (body) => ({
        url: "gender",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useOnboardingUpdateGenderMutation,
  useOnboardingUpdateInfoMutation,
} = onboardingApi;

export const {
  endpoints: { onboardingUpdateGender, onboardingUpdateInfo },
} = onboardingApi;
