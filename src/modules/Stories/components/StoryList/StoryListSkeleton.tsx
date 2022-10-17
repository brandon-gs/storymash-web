import { Masonry } from "@/core/components";
import { FC } from "react";
import StoryCardSkeleton from "../StoryCard/StoryCardSkeleton";
import { storyListBreakpoints } from "./StoryList";

interface IStoryListSkeletonProps {
  length: number;
}

const StoryListSkeleton: FC<IStoryListSkeletonProps> = ({ length }) => {
  return (
    <Masonry breakpointsCols={storyListBreakpoints} fixedColumnWidth={284}>
      {new Array(length).fill(0).map((value, index) => (
        <StoryCardSkeleton key={`story-list-card-skeleton-${index}`} />
      ))}
    </Masonry>
  );
};
export default StoryListSkeleton;
