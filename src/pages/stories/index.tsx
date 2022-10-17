import { FC } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";
import { StoriesEmpty, StoryList } from "@/modules/Stories/components";
import { useGetAllStoriesQuery } from "@/modules/Stories";
import { useAppSelector, useNearScreen, useDebounce } from "@/core/hooks";
import {
  selectAllStories,
  selectAllStoriesHasNextPage,
  selectAllStoriesPage,
  updateAllStoriesNextPage,
} from "@/modules/Stories/store";

const StoriesPage: FC = () => {
  const page = useAppSelector(selectAllStoriesPage);
  const stories = useAppSelector(selectAllStories);
  const hasNextPage = useAppSelector(selectAllStoriesHasNextPage);

  const { isNearScreen, observerRef } = useNearScreen<HTMLDivElement>({
    once: false,
    distance: 800,
  });

  const { isLoading, isFetching } = useGetAllStoriesQuery(
    {
      page,
      limit: 12,
    },
    { refetchOnMountOrArgChange: true }
  );

  useDebounce({
    callback: updateAllStoriesNextPage,
    useDispatch: true,
    condition: isNearScreen && hasNextPage && !isLoading && !isFetching,
  });

  return (
    <>
      <Head>
        <title>Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <StoryList
          stories={stories}
          isLoading={isLoading}
          isFetching={isFetching}
        />
        {hasNextPage && (
          <>
            <div style={{ width: "100%", height: "500px" }} />
            <div
              ref={observerRef}
              style={{ width: "100%", height: "10px", background: "red" }}
            />
          </>
        )}
        {!isLoading && <StoriesEmpty />}
      </Main>
    </>
  );
};
export default StoriesPage;
