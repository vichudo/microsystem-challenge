import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";

const Episodes: NextPage<
  InferGetServerSidePropsType<typeof getStaticProps>
> = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      current={"/episodes"}
    />
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Episodes;
