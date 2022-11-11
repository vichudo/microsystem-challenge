import React from "react";
import { Character, Episode } from "../types/main";
import CharacterCard from "./CharacterCard";
import { FC } from "react";

const DisplayEpisodesCards: FC<{ data: Episode[] }> = ({ data }) => {
  return (
    <div>
      {data?.map(({ id }) => (
        <CharacterCard key={id} />
      ))}
    </div>
  );
};

export default DisplayEpisodesCards;
