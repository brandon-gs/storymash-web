import { AppState } from "@/core/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllStories } from "../../services";
import { ILikeStoryCardPayload, StoriesAllState } from "./storiesAllTypes";

const initialState: StoriesAllState = {
  page: 0,
  stories: [],
  hasNextPage: false,
};

export const storiesAllSlice = createSlice({
  name: "allStories",
  initialState,
  reducers: {
    updateAllStoriesNextPage(state) {
      state.page = state.page + 1;
    },
    updateAllStoriesPage(
      state,
      { payload }: PayloadAction<{ newPage: number }>
    ) {
      state.page = payload.newPage;
    },
    addLikeToStoryCard(
      state,
      { payload }: PayloadAction<Omit<ILikeStoryCardPayload, "action">>
    ) {
      const { userId, storyIndex } = payload;
      state.stories[storyIndex].firstChapter.likes = [userId];
      state.stories[storyIndex].totalLikes += 1;
    },
    removeLikeToStoryCard(
      state,
      { payload }: PayloadAction<Omit<ILikeStoryCardPayload, "action">>
    ) {
      const { userId, storyIndex } = payload;
      state.stories[storyIndex].totalLikes -= 1;
      const likes = state.stories[storyIndex].firstChapter.likes;
      const userLikeIdx = likes.findIndex((id) => userId === id);
      const updatedLikes = [...likes];
      updatedLikes.splice(userLikeIdx, 1);
      state.stories[storyIndex].firstChapter.likes = updatedLikes;
    },
  },
  extraReducers: (build) => {
    build.addMatcher(getAllStories.matchFulfilled, (state, { payload }) => {
      state.stories =
        state.page > 0 ? [...state.stories, ...payload.docs] : payload.docs;
      state.hasNextPage = payload.hasNextPage;
    });
  },
});

export const {
  updateAllStoriesNextPage,
  addLikeToStoryCard,
  removeLikeToStoryCard,
  updateAllStoriesPage,
} = storiesAllSlice.actions;

export const selectAllStories = (state: AppState) => state.allStories.stories;
export const selectAllStoriesPage = (state: AppState) => state.allStories.page;
export const selectAllStoriesHasNextPage = (state: AppState) =>
  state.allStories.hasNextPage;
