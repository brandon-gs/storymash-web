import { FC } from "react";
import Head from "next/head";
import { Navbar, Main } from "@/core/components";

const FavoriteStoriesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Favoritas | Storymash</title>
      </Head>
      <Navbar />
      <Main>
        <h1>Historias Favoritas</h1>
      </Main>
    </>
  );
};
export default FavoriteStoriesPage;
