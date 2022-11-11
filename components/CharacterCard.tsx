import React, { FC } from "react";
import { Character } from "../types/main";

const CharacterCard: FC<{ data: Character }> = ({ data }) => {
  //   console.log(data?.name);
  return (
    <div className="bg-indigo-500 rounded-md h-fit w-48 p-2 text-white font-bold">
      {" "}
      {data?.name}
    </div>
  );
};

export default CharacterCard;
