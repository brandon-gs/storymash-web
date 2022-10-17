import { FC, useEffect } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";
import { StoriesEmpty, StoryList } from "@/modules/Stories/components";
import { useGetAllStoriesQuery } from "@/modules/Stories";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import {
  selectAllStories,
  selectAllStoriesHasNextPage,
  selectAllStoriesPage,
  updateAllStoriesNextPage,
} from "@/modules/Stories/store";
import useNearScreen from "@/core/hooks/useNearScreen";
import debounce from "just-debounce-it";

const StoriesPage: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectAllStoriesPage);
  const stories = useAppSelector(selectAllStories);
  const hasNextPage = useAppSelector(selectAllStoriesHasNextPage);

  const { isNearScreen, observerRef } = useNearScreen<HTMLDivElement>({
    once: false,
    distance: 800,
  });

  // TODO: Encapsule the next logic inside a hook to reuse it with different endpoints
  const { isLoading, isFetching } = useGetAllStoriesQuery(
    {
      page,
      limit: 12,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    let mounted = true;

    const getAllStoriesNextPageDebounce = debounce(() => {
      if (mounted && isNearScreen && hasNextPage && !isLoading && !isFetching) {
        dispatch(updateAllStoriesNextPage());
      }
    }, 200);

    getAllStoriesNextPageDebounce();

    return () => {
      mounted = false;
    };
  }, [dispatch, isLoading, isFetching, isNearScreen, hasNextPage]);

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
        {hasNextPage ? (
          <>
            <div style={{ width: "100%", height: "400px" }} />
            <div ref={observerRef} />
          </>
        ) : (
          <StoriesEmpty />
        )}
      </Main>
    </>
  );
};
export default StoriesPage;
