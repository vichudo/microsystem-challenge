import React from "react";
import { Character, DisplayCharactersType, Episode } from "../types/main";
import CharacterCard from "./CharacterCard";
import { FC } from "react";

const DisplayCharacterCards: FC<DisplayCharactersType> = ({ data, search }) => {
  return (
    <div>
      {data
        ?.filter(({ name }) =>
          name.toLowerCase().includes(search?.toLowerCase() as string)
        )
        .map((i, index) => (
          <CharacterCard key={index} data={i} />
        ))}
    </div>
  );
};

export default DisplayCharacterCards;
