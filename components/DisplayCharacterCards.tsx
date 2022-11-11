import React from "react";
import { Character, DisplayCharactersType, Episode } from "../types/main";
import CharacterCard from "./CharacterCard";
import { FC } from "react";

const DisplayCharacterCards: FC<DisplayCharactersType> = ({
  data,
  search,
  page = 1,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {search
        ? Object.values(data)
            .flat()
            .filter(({ name }) =>
              search ? name.toLowerCase().includes(search.toLowerCase()) : name
            )
            .map((i, index) => <CharacterCard key={index} data={i} />)
        : data[page].map((i, index) => <CharacterCard key={index} data={i} />)}
    </div>
  );
};

export default DisplayCharacterCards;
