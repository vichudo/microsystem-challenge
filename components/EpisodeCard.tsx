import React, { FC } from "react";
import { Character, Episode } from "../types/main";

const EpisodeCard: FC<{ data: Episode }> = () => {
  return <div className="bg-blue-400 rounded-md h-96 w-48"></div>;
};

export default EpisodeCard;
