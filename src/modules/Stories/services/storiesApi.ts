import { globalApi } from "@/core/services";
import type { AllStoriesResponse } from "./storiesApiTypes";

export const storiesApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStories: build.query<
      AllStoriesResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/story?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllStoriesQuery } = storiesApi;

export const {
  endpoints: { getAllStories },
} = storiesApi;
