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
}
export interface ILikeStoryCardResponse {
  storyId: string;
  chapterId: string;
  action: "add" | "remove";
  chapterLikes: string[];
}
