import { baseQuery } from "@/core/services";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import type { AllStoriesResponse } from "./storiesApiTypes";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: baseQuery("story"),
  endpoints: (builder) => ({
    getAllStories: builder.query<
      AllStoriesResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllStoriesQuery } = storiesApi;

export const {
  endpoints: { getAllStories },
} = storiesApi;
