import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import type { Character, Episode } from "../types/main";
import { useSelector } from "react-redux";
import { selectItems as selectCharacters } from "../slices/favSlice";
import { selectItems as selectEpisodes } from "../slices/episodesSlice";
import CharacterCard from "../components/CharacterCard";
import EpisodeCard from "../components/EpisodeCard";

const Favorites: NextPage = () => {
  const favCharacters = useSelector(selectCharacters);
  const favEpisodes = useSelector(selectEpisodes);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        current={"/favorites"}
      />
      <h1 className="text-center text-3xl font-bold py-2  md:ml-56 lg:ml-64">
        Characters
      </h1>
      {favCharacters.length > 0 ? (
        <div className="flex flex-wrap gap-3 mb-12 justify-center items-center md:ml-56 lg:ml-64">
          {favCharacters?.map((i: Character) => (
            <CharacterCard key={i.id} data={i} />
          ))}
        </div>
      ) : (
        <p className="text-center  text-black  text-xl py-2 mb-12 md:ml-56 lg:ml-64">
          No characters added :(
        </p>
      )}

      <div>
        <h1 className="text-center text-3xl font-bold py-2 md:ml-56 lg:ml-64">
          Episodes
        </h1>
        {favEpisodes.length > 0 ? (
          <div className="flex flex-wrap gap-3  justify-center items-center md:ml-56 lg:ml-64">
            {favEpisodes?.map((i: Episode) => (
              <EpisodeCard key={i.id} data={i} />
            ))}
          </div>
        ) : (
          <p className="text-center  text-black  text-xl py-2 md:ml-56 lg:ml-64">
            No episodes added :(
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
