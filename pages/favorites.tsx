import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import type { Character } from "../types/main";

import { useSelector } from "react-redux";
import { selectItems } from "../slices/favSlice";
import CharacterCard from "../components/CharacterCard";

const Favorites: NextPage = () => {
  const favs = useSelector(selectItems);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        current={"/favorites"}
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {favs?.map((i: Character) => (
          <CharacterCard key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
