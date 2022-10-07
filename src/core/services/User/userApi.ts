import { authQuery } from "../authQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
// import { RTKTags } from "@/core/store";
import type {
  IOnboardingProfileRequest,
  IUser,
  IUserAccount,
} from "./userApiTypes";
import type { IOnboardingInfoFormSchema } from "@/modules/Onboarding/components";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authQuery("user"),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserAccount: builder.query<{ account: IUserAccount }, void>({
      query: () => ({
        url: "account",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    onboardingUpdateInfo: builder.mutation<void, IOnboardingInfoFormSchema>({
      query: (info) => ({
        url: "onboarding/info",
        method: "PUT",
        body: info,
      }),
      invalidatesTags: ["User"],
    }),
    onboardingUpdateGender: builder.mutation<void, { gender: string }>({
      query: (body) => ({
        url: "onboarding/gender",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    onboardingUpdateProfile: builder.mutation<void, IOnboardingProfileRequest>({
      query: (body) => ({
        url: "onboarding/profile",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetUserAccountQuery,
  useGetUserQuery,
  useOnboardingUpdateGenderMutation,
  useOnboardingUpdateInfoMutation,
  useOnboardingUpdateProfileMutation,
} = userApi;

export const {
  endpoints: {
    getUserAccount,
    getUser,
    onboardingUpdateGender,
    onboardingUpdateInfo,
    onboardingUpdateProfile,
  },
} = userApi;
