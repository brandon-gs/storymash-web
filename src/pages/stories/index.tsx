import { FC, useEffect } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";
import { StoryList } from "@/modules/Stories/components";
import { useGetAllStoriesQuery } from "@/modules/Stories";
import {
  useAppSelector,
  useNearScreen,
  useDebounce,
  useAppDispatch,
} from "@/core/hooks";
import {
  selectAllStories,
  selectAllStoriesHasNextPage,
  selectAllStoriesPage,
  updateAllStoriesNextPage,
  updateAllStoriesPage,
} from "@/modules/Stories/store";
import { useGetUserQuery } from "@/core/services";

const StoriesPage: FC = () => {
  useGetUserQuery();
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectAllStoriesPage);
  const stories = useAppSelector(selectAllStories);
  const hasNextPage = useAppSelector(selectAllStoriesHasNextPage);

  const { isNearScreen, observerRef } = useNearScreen<HTMLDivElement>({
    once: false,
    distance: 2000,
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

  useEffect(() => {
    return () => {
      dispatch(updateAllStoriesPage({ newPage: 0 }));
    };
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <StoryList
          observerRef={observerRef}
          stories={stories}
          isLoading={isLoading}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
        />
      </Main>
    </>
  );
};
export default StoriesPage;
