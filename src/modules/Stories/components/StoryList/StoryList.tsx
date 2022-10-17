import { Masonry } from "@/core/components";
import { Box } from "@mui/material";
import { FC } from "react";
import { AllStoriesResponse } from "../../services";
import StoriesEmpty from "../StoriesEmpty/StoriesEmpty";
import StoryCard from "../StoryCard/StoryCard";
import StoryListSkeleton from "./StoryListSkeleton";

export const storyListBreakpoints = {
  default: 4,
  1200: 3,
  900: 2,
  660: 1,
};

interface StoryListProps {
  stories?: AllStoriesResponse["docs"];
  isLoading?: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  observerRef: (node: HTMLDivElement) => void;
}

const StoryList: FC<StoryListProps> = ({
  stories,
  isLoading,
  isFetching,
  hasNextPage,
  observerRef,
}) => {
  if (isLoading) {
    return <StoryListSkeleton length={12} />;
  }

  // TODO: Add component to try to refetch the stories
  if (!Array.isArray(stories)) {
    return <Box sx={{ height: "100%", width: "100%" }}>Recargar...</Box>;
  }

  return (
    <>
      <Masonry breakpointsCols={storyListBreakpoints} fixedColumnWidth={284}>
        {stories.map((story, idx) => (
          <StoryCard key={`${story._id}-${idx}`} story={story} index={idx} />
        ))}
      </Masonry>
      {hasNextPage && (
        <>
          <StoryListSkeleton length={12} />;
          <div ref={observerRef} />
        </>
      )}
      {!isLoading && !isFetching && <StoriesEmpty />}
    </>
  );
};

export default StoryList;
