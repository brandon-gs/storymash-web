import { AllStoriesResponse } from "../../services";

export interface StoriesAllState {
  page: number;
  stories: AllStoriesResponse["docs"];
  hasNextPage: boolean;
}

export interface ILikeStoryCardPayload {
  userId: string;
  storyId: string;
  storyIndex: number;
  action: "add" | "remove";
}
export interface ILikeStoryCardResponse {
  storyId: string;
  chapterId: string;
}
