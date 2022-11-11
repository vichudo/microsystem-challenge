import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";

const Episodes: NextPage<
  InferGetServerSidePropsType<typeof getStaticProps>
> = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      current={"/episodes"}
      data_episodes={data}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("https://rickandmortyapi.com/api/episode").then(
    (res) => res.json()
  );
  //   console.log(data);

  const pages = await data.info?.pages;
  let pagesArray = [];

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  const data_ = await Promise.all(
    pagesArray.map(
      async (i: number) =>
        await fetch(`https://rickandmortyapi.com/api/episode?page=${i}`).then(
          (res) => res.json()
        )
    )
  );

  const final_data = { ...data_.map(({ results }) => [...results]) };
  return {
    props: { data: final_data },
  };
};

export default Episodes;
