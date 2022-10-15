import { FC, useState } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";
import { StoryList } from "@/modules/Stories/components";
import { useGetAllStoriesQuery } from "@/modules/Stories";

const StoriesPage: FC = () => {
  const [page] = useState(0);

  const {
    data: stories,
    isLoading,
    isFetching,
  } = useGetAllStoriesQuery({
    page,
    limit: 5,
  });

  return (
    <>
      <Head>
        <title>Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <StoryList
          stories={stories?.docs}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </Main>
    </>
  );
};
export default StoriesPage;
