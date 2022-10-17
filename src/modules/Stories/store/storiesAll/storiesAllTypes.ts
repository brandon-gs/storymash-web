import { AllStoriesResponse } from "../../services";

export interface StoriesAllState {
  page: number;
  stories: AllStoriesResponse["docs"];
  hasNextPage: boolean;
}
