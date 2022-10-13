import { Paginate } from "@/core/interfaces";

export interface StoryCardResponse {
  _id: string;
  author: {
    _id: string;
    username: string;
    imageUrl: string;
  };
  title: string;
  imageUrl: string;
  categories: string[];
  isPublished: boolean;
  isComplete: boolean;
  isDeleted: boolean;
  createdAt: string;
  firstChapter: {
    content: string;
    likes: string[];
  };
  lastChapter: string;
  views: string[];
  totalLikes: number;
  totalComments: number;
}

export type AllStoriesResponse = Paginate<StoryCardResponse>;
