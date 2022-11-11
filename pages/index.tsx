import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { useState } from "react";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // console.log(data);
  return (
    <div className="">
      <Head>
        <title>Rick & Morty's Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        current={"/"}
        data_characters={data}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("https://rickandmortyapi.com/api/character").then(
    (res) => res.json()
  );

  const pages = await data.info?.pages;
  let pagesArray = [];

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  const data_ = await Promise.all(
    pagesArray.map(
      async (i: number) =>
        await fetch(`https://rickandmortyapi.com/api/character?page=${i}`).then(
          (res) => res.json()
        )
    )
  );

  const final_data = { ...data_.map(({ results }) => [...results]) };

  // console.log(final_data);

  return {
    props: { data: final_data },
  };
};

export default Home;
