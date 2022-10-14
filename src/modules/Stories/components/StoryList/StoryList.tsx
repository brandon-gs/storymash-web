import { FC, useState } from "react";
import { useGetAllStoriesQuery } from "../../services";
import StoryCard from "../StoryCard/StoryCard";

const StoryList: FC = () => {
  const [page] = useState(0);

  const { data: stories, ...storiesQuery } = useGetAllStoriesQuery({
    page,
    limit: 5,
  });

  if (storiesQuery.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      {stories?.docs.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </>
  );
};

export default StoryList;
