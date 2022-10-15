import { Masonry } from "@/core/components";
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

const StoryList: FC<StoryListProps> = ({ stories, isLoading, isFetching }) => {
  if (isLoading || isFetching) {
    return <div>Cargando...</div>;
  }

  if (!Array.isArray(stories)) {
    return <div>Recargar...</div>;
  }

  return (
    <>
      <Masonry breakpointsCols={breakpointColumnsObj} fixedColumnWidth={284}>
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </Masonry>
    </>
  );
};

export default StoryList;
