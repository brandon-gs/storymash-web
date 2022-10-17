import { Masonry } from "@/core/components";
import { Box } from "@mui/material";
import { FC } from "react";
import { AllStoriesResponse } from "../../services";
import StoryCard from "../StoryCard/StoryCard";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  660: 1,
};

interface StoryListProps {
  stories?: AllStoriesResponse["docs"];
  isLoading?: boolean;
  isFetching: boolean;
}

const StoryList: FC<StoryListProps> = ({ stories, isLoading }) => {
  // TODO: Add the loader component
  if (isLoading) {
    return <Box sx={{ height: "100vh", width: "100%" }}>Cargando...</Box>;
  }

  // TODO: Add component to try to refetch the stories
  if (!Array.isArray(stories)) {
    return <Box sx={{ height: "100vh", width: "100%" }}>Recargar...</Box>;
  }

  return (
    <>
      <Masonry breakpointsCols={breakpointColumnsObj} fixedColumnWidth={284}>
        {stories.map((story, idx) => (
          <StoryCard key={`${story._id}-${idx}`} story={story} />
        ))}
      </Masonry>
    </>
  );
};

export default StoryList;
