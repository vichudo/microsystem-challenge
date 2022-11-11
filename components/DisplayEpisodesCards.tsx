import React from "react";
import { Character, DisplayEpisodesType, Episode } from "../types/main";
import { FC } from "react";
import EpisodeCard from "./EpisodeCard";

const DisplayEpisodesCards: FC<DisplayEpisodesType> = ({ data, search }) => {
  return (
    <div>
      {data
        ?.filter(({ name }) =>
          name.toLowerCase().includes(search?.toLowerCase() as string)
        )
        .map((i, index) => (
          <EpisodeCard key={index} data={i} />
        ))}
    </div>
  );
};

export default DisplayEpisodesCards;
