import React from "react";
import { Episode, DisplayEpisodesType } from "../types/main";
import EpisodeCard from "./EpisodeCard";
import { FC } from "react";

const DisplayEpisodeCards: FC<DisplayEpisodesType> = ({
  data,
  search,
  page = 1,
}) => {
  console.log(data);
  return (
    <div className="flex flex-wrap gap-4">
      {search
        ? Object.values(data)
            .flat()
            .filter(({ name }) =>
              search ? name.toLowerCase().includes(search.toLowerCase()) : name
            )
            .map((i, index) => <EpisodeCard key={index} data={i} />)
        : data[page].map((i, index) => <EpisodeCard key={index} data={i} />)}
    </div>
  );
};

export default DisplayEpisodeCards;
