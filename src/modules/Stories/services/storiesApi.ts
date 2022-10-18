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
      query: ({ storyId, chapterId, action }) => ({
        method: "PUT",
        url: `/story/chapter/like?storyId=${storyId}&chapterId=${chapterId}&action=${action}`,
      }),
      onQueryStarted: async (
        { storyId, storyIndex, action },
        { dispatch, getState, queryFulfilled }
      ) => {
        const state = getState() as AppState;
        const userId = state.global.userId;
        if (!userId) {
          return;
        }
        const addLikeAction = addLikeToStoryCard({
          storyIndex,
          storyId,
          userId,
        });
        const removeLikeAction = removeLikeToStoryCard({
          storyId,
          storyIndex,
          userId,
        });
        const currentAction =
          action === "add" ? addLikeAction : removeLikeAction;

        dispatch(currentAction);
        try {
          await queryFulfilled;
        } catch {
          const undoAction =
            action === "add" ? removeLikeAction : addLikeAction;
          dispatch(undoAction);
        }
      },
    }),
  }),
});

export const { useGetAllStoriesQuery, useLikeStoryCardMutation } = storiesApi;

export const {
  endpoints: { getAllStories, likeStoryCard },
} = storiesApi;
