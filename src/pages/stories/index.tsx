import { FC } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";

const StoriesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <h1>Historias</h1>
      </Main>
    </>
  );
};
export default StoriesPage;
