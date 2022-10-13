import { FC } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";
import { StoryList } from "@/modules/Stories/components";

const StoriesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <StoryList />
      </Main>
    </>
  );
};
export default StoriesPage;
