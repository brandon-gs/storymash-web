import { AppState } from "@/core/store";
import { createSlice } from "@reduxjs/toolkit";
import { getAllStories } from "../../services";
import { StoriesAllState } from "./storiesAllTypes";

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
  },
  extraReducers: (build) => {
    build.addMatcher(getAllStories.matchFulfilled, (state, { payload }) => {
      state.stories =
        state.page > 0 ? [...state.stories, ...payload.docs] : payload.docs;
      state.hasNextPage = payload.hasNextPage;
    });
  },
});

export const { updateAllStoriesNextPage } = storiesAllSlice.actions;

export const selectAllStories = (state: AppState) => state.allStories.stories;
export const selectAllStoriesPage = (state: AppState) => state.allStories.page;
export const selectAllStoriesHasNextPage = (state: AppState) =>
  state.allStories.hasNextPage;
