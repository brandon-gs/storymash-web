import { globalApi } from "@/core/services";
import { AppState } from "@/core/store";
import {
  addLikeToStoryCard,
  ILikeStoryCardPayload,
  ILikeStoryCardResponse,
  removeLikeToStoryCard,
} from "../store";
import type { AllStoriesRequest, AllStoriesResponse } from "./storiesApiTypes";

export const storiesApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllStories: build.query<AllStoriesResponse, AllStoriesRequest>({
      query: ({ page, limit }) => ({
        url: `/story?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    likeStoryCard: build.mutation<
      ILikeStoryCardResponse,
      ILikeStoryCardPayload & { chapterId: string }
    >({
      query: ({ storyId, chapterId }) => ({
        method: "PUT",
        url: `/story/chapter/like?storyId=${storyId}&chapterId=${chapterId}`,
      }),
      onQueryStarted: async (
        { storyId, storyIndex },
        { dispatch, getState, queryFulfilled }
      ) => {
        const state = getState() as AppState;
        const userId = state.global.userId;
        if (!userId) {
          return;
        }
        dispatch(
          addLikeToStoryCard({
            storyIndex,
            storyId,
            userId,
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            removeLikeToStoryCard({
              storyId,
              storyIndex,
              userId,
            })
          );
        }
      },
    }),
  }),
});

export const { useGetAllStoriesQuery, useLikeStoryCardMutation } = storiesApi;

export const {
  endpoints: { getAllStories, likeStoryCard },
} = storiesApi;
