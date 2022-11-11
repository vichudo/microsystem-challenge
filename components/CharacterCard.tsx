import React, { FC } from "react";
import { Character } from "../types/main";

const CharacterCard: FC<{ data: Character }> = () => {
  return <div className="bg-blue-400 rounded-md h-96 w-48"></div>;
};

export default CharacterCard;
