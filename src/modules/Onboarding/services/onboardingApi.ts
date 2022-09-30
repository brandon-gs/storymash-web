import { baseQuery } from "@/core/services";
import { createApi } from "@reduxjs/toolkit/query/react";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  baseQuery: baseQuery("user/onboarding"),
  endpoints: (builder) => ({
    onboardingUpdateGender: builder.mutation<void, { gender: string }>({
      query: (body) => ({
        url: "gender",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const { useOnboardingUpdateGenderMutation } = onboardingApi;

export const {
  endpoints: { onboardingUpdateGender },
} = onboardingApi;
