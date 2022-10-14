import { globalApi } from "@/core/services";
import type { IOnboardingInfoFormSchema } from "../components";
import type { IOnboardingProfileRequest } from "./onboardingApiTypes";

export const onboardingApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    onboardingUpdateInfo: builder.mutation<void, IOnboardingInfoFormSchema>({
      query: (info) => ({
        url: "/user/onboarding/info",
        method: "PUT",
        body: info,
      }),
      invalidatesTags: ["User"],
    }),
    onboardingUpdateGender: builder.mutation<void, { gender: string }>({
      query: (body) => ({
        url: "/user/onboarding/gender",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    onboardingUpdateProfile: builder.mutation<void, IOnboardingProfileRequest>({
      query: (body) => ({
        url: "/user/onboarding/profile",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    onboardingSkip: builder.mutation<void, void>({
      query: () => ({
        url: "user/onboarding/finish",
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useOnboardingUpdateGenderMutation,
  useOnboardingUpdateInfoMutation,
  useOnboardingUpdateProfileMutation,
  useOnboardingSkipMutation,
} = onboardingApi;

export const {
  endpoints: {
    onboardingUpdateGender,
    onboardingUpdateInfo,
    onboardingUpdateProfile,
    onboardingSkip,
  },
} = onboardingApi;
