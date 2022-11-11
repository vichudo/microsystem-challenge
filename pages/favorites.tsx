import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { GetStaticProps } from "next";

const Favorites: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      current={"/favorites"}
    />
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Favorites;
