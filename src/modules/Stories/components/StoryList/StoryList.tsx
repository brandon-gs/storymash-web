import { Masonry } from "@/core/components";
import { FC, useState } from "react";
import { useGetAllStoriesQuery } from "../../services";
import StoryCard from "../StoryCard/StoryCard";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  660: 1,
};

const StoryList: FC = () => {
  const [page] = useState(0);

  const { data: stories, ...storiesQuery } = useGetAllStoriesQuery({
    page,
    limit: 5,
  });

  if (storiesQuery.isLoading) {
    return <p>Loading</p>;
  }

  if (!stories) {
    return <p>Ocurrio un error al intentar obtener las historias</p>;
  }

  return (
    <>
      <Masonry breakpointsCols={breakpointColumnsObj} fixedColumnWidth={284}>
        {stories.docs.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </Masonry>
    </>
  );
};

export default StoryList;
