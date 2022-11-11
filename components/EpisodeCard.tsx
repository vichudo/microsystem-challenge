import React, { FC } from "react";
import { Character, Episode } from "../types/main";

const EpisodeCard: FC<{ data: Episode }> = ({ data }) => {
  // console.log(data);
  return (
    <div className="bg-green-700 rounded-md h-fit w-fit p-2 text-white font-bold">
      {" "}
      {data?.name}
    </div>
  );
};

export default EpisodeCard;
